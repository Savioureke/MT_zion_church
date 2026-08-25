import { useState, useEffect } from 'react'
import { supabase, PostItem } from '../lib/supabase'

const staticTopics = [
  {
    eyebrow: 'Foundations',
    title: 'Understanding the Good News',
    desc: "Begin your journey by exploring the core message of Christianity. What is the 'Good News' and why does it matter today?",
    content: "The Gospel is the good news that God loves mankind and sent His Son Jesus Christ to redeem us. Through faith in Jesus, anyone can experience total forgiveness, new life, and eternal hope.",
  },
  {
    eyebrow: 'Identity',
    title: 'Who is Jesus?',
    desc: 'Examine the historical and theological evidence surrounding the life, death, and resurrection of Jesus of Nazareth.',
    img: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&w=600&q=80',
    content: "Jesus Christ is the Son of God who came to reveal the Father's love, fulfill God's promises, and offer His life as a ransom for all.",
  },
  {
    eyebrow: 'The Human Condition',
    title: 'Why do we need Salvation?',
    desc: 'A deep dive into the concept of sin, separation from God, and the universal longing for redemption.',
    content: "Salvation satisfies our deepest human spiritual hunger and restores our broken relationship with God.",
  },
]

export default function Gospel() {
  const [dbPosts, setDbPosts] = useState<PostItem[]>([])
  const [selectedPost, setSelectedPost] = useState<{ title: string; author?: string; content: string; cover?: string } | null>(null)

  useEffect(() => {
    fetchPostsFromSupabase()
  }, [])

  const fetchPostsFromSupabase = async () => {
    try {
      const { data } = await supabase
        .from('teaching_articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setDbPosts(data)
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
    }
  }

  return (
    <div className="pb-24">
      <section className="w-full pt-section-gap pb-12 px-margin-desktop max-md:px-margin-mobile max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="col-span-1 md:col-span-8 md:col-start-3 text-center flex flex-col gap-6">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background font-bold">
            Read the Gospel & Articles
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Explore teachings, posts, and gospel articles published directly by Mt Zion Cheese pastoral team.
          </p>
        </div>
      </section>

      {/* Dynamic Posts Section */}
      {dbPosts.length > 0 && (
        <section className="w-full pb-12 px-margin-desktop max-md:px-margin-mobile max-w-container-max mx-auto">
          <h2 className="font-headline-lg text-xl font-bold text-on-background mb-6">Latest Articles & Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dbPosts.map((p) => (
              <article
                key={p.id}
                onClick={() => setSelectedPost({ title: p.title, author: p.author, content: p.content, cover: p.cover_image_url })}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 cursor-pointer transition-all shadow-sm flex flex-col"
              >
                <div className="h-44 bg-surface-variant relative overflow-hidden">
                  <img src={p.cover_image_url || '/images/gospel_ancient_book.jpg'} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-primary text-on-primary font-label-caps text-[10px] px-2 py-0.5 rounded uppercase">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-md text-base font-bold text-on-background line-clamp-2 mb-2">{p.title}</h3>
                    <p className="font-body-md text-xs text-on-surface-variant line-clamp-3">{p.excerpt || p.content}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-primary font-button font-bold">
                    <span>Read Article →</span>
                    <span className="text-on-surface-variant text-[11px] font-normal">{p.author || 'Pastoral Team'}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Static Topics Section */}
      <section className="w-full pb-section-gap px-margin-desktop max-md:px-margin-mobile max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-xl font-bold text-on-background mb-6">Gospel Foundations</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {staticTopics.map((t, idx) => (
            <article
              key={t.title}
              onClick={() => setSelectedPost({ title: t.title, content: t.content })}
              className={`col-span-1 ${idx === 0 ? 'md:col-span-8' : 'md:col-span-4'} bg-surface-container-low rounded-lg p-8 border border-outline-variant/20 hover:border-primary/50 cursor-pointer transition-colors duration-300 flex flex-col justify-between group shadow-sm`}
            >
              <div>
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-2 block">
                  {t.eyebrow}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-background mb-4 group-hover:text-primary transition-colors">{t.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{t.desc}</p>
              </div>
              <span className="inline-flex items-center gap-2 font-button text-button text-primary font-bold mt-auto">
                Read Article <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl max-w-2xl w-full p-8 max-h-[85vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-outline-variant/20">
              <div>
                <h2 className="font-headline-lg text-xl font-bold text-on-background">{selectedPost.title}</h2>
                <p className="text-xs text-primary font-button mt-1">{selectedPost.author || 'Mt Zion Cheese Pastoral Team'}</p>
              </div>
              <button onClick={() => setSelectedPost(null)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {selectedPost.cover && (
              <img src={selectedPost.cover} alt={selectedPost.title} className="w-full h-56 object-cover rounded-lg" />
            )}

            <div className="font-body-lg text-on-surface leading-relaxed whitespace-pre-wrap">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-outline-variant/20 text-right">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-primary text-on-primary font-button px-6 py-2 rounded-lg text-xs font-semibold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
