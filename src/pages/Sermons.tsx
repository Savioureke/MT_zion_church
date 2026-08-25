import { useState, useEffect } from 'react'
import { supabase, SermonItem } from '../lib/supabase'
import { playAudioTrack } from '../lib/audioManager'

const staticSermons = [
  {
    id: 's1',
    title: 'Walking on Water: Trusting the Unseen',
    speaker: 'Pastor John Doe',
    date: 'Oct 24, 2023',
    category: 'Faith',
    duration: '45:20',
    img: '/images/sermon_sanctuary.jpg',
    desc: "An exploration of Peter's leap of faith and how we are called to step out of our comfort zones into the miraculous.",
  },
  {
    id: 's2',
    title: 'The Architecture of Forgiveness',
    speaker: 'Pastor Jane Smith',
    date: 'Oct 17, 2023',
    category: 'Grace',
    duration: '38:15',
    img: '/images/sermon_bible.jpg',
    desc: 'Understanding grace not as a feeling, but as a foundational structure for building healthy spiritual relationships.',
  },
  {
    id: 's3',
    title: 'Rooted Together: The Power of Assembly',
    speaker: 'Guest Speaker',
    date: 'Oct 10, 2023',
    category: 'Community',
    duration: '51:02',
    img: '/images/sermon_misty_valley.jpg',
    desc: 'Why gathering matters in a digital age and how physical presence strengthens the spiritual body.',
  },
]

export default function Sermons() {
  const [dbSermons, setDbSermons] = useState<SermonItem[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      const { data } = await supabase
        .from('sermons')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setDbSermons(data)
      }
    } catch (err) {
      console.error('Error fetching sermons:', err)
    }
  }

  const dynamicItems = dbSermons.map((s) => ({
    id: s.id || Math.random().toString(),
    title: s.title,
    speaker: s.speaker || 'Pastor',
    date: s.date_preached || (s.created_at ? new Date(s.created_at).toLocaleDateString() : 'Recent'),
    category: s.category || 'Sermon',
    duration: 'Audio/Video',
    img: s.thumbnail_url || '/images/sermon_sanctuary.jpg',
    desc: s.description || 'Listen to this powerful message from Mt Zion Cheese.',
    videoUrl: s.video_url,
    audioUrl: s.audio_url
  }))

  const allSermons = [...dynamicItems, ...staticSermons]

  const filtered = allSermons.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()),
  )

  const handlePlaySermon = (sermon: typeof allSermons[0]) => {
    playAudioTrack({
      title: sermon.title,
      speaker: sermon.speaker,
      audioUrl: (sermon as any).audioUrl,
      img: sermon.img
    })
  }

  return (
    <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-section-gap pb-24">
      <section className="mb-16 md:grid md:grid-cols-12 gap-gutter items-end">
        <div className="col-span-12 md:col-span-8">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4 font-bold">
            Sermon Library
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Explore our archive of teachings and sermons. Click any sermon to play audio.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 mt-8 md:mt-0 flex justify-end">
          <div className="relative w-full max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 rounded text-on-surface font-body-md focus:outline-none focus:border-primary transition-colors"
              placeholder="Search sermons..."
              type="text"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filtered.map((s) => (
          <article
            key={s.id + s.title}
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-primary/50 transition-colors flex flex-col h-full shadow-sm"
          >
            <div className="h-48 relative overflow-hidden bg-surface-container-low">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="bg-primary text-on-primary font-label-caps text-label-caps px-2 py-1 rounded">{s.category}</span>
                <span className="text-white font-body-md text-sm">{s.duration}</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-on-surface-variant mb-3 font-body-md text-sm">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span>{s.date}</span>
                <span className="mx-1">•</span>
                <span>{s.speaker}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-4 line-clamp-2">{s.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 flex-grow">{s.desc}</p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-outline-variant/20">
                <button
                  onClick={() => handlePlaySermon(s)}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-button text-button font-bold"
                >
                  <span className="material-symbols-outlined fill">play_circle</span>Listen Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
