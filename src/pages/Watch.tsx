import { useState, useEffect } from 'react'
import { supabase, MediaItem, extractYouTubeId } from '../lib/supabase'

const staticVideoCategories = [
  {
    name: 'Recent Sermons',
    desc: 'Catch up on the latest messages from our teaching team.',
    items: [
      { title: 'The Power of Stillness in a Chaotic World', speaker: 'Pastor David Chen', date: 'Oct 15, 2023', duration: '45:20', img: '/images/pastor_speaking.jpg', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
      { title: 'Building Foundations: Faith Under Fire', speaker: 'Dr. Sarah Jenkins', date: 'Oct 08, 2023', duration: '38:15', img: '/images/congregation.jpg', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Understanding Grace in the Modern Age', speaker: 'Pastor David Chen', date: 'Oct 01, 2023', duration: '42:50', img: '/images/bible_study.jpg', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
    ],
  },
  {
    name: 'Worship Sessions',
    desc: 'Experience moments of heartfelt worship and praise.',
    items: [
      { title: 'Autumn Worship Night', speaker: 'Mt Zion Cheese Worship', date: 'Oct 20, 2023', duration: '1:12:05', img: '/images/watch_live_stage.jpg', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
      { title: 'Acoustic Set | Sunday Morning', speaker: 'Mt Zion Cheese Worship', date: 'Oct 14, 2023', duration: '28:30', img: '/images/family_worship.jpg', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ],
  },
]

export default function Watch() {
  const [dbVideos, setDbVideos] = useState<MediaItem[]>([])
  const [search, setSearch] = useState('')
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All')
  const [activeVideo, setActiveVideo] = useState<{ title: string; url?: string; provider?: string } | null>(null)

  useEffect(() => {
    fetchMediaFromSupabase()
  }, [])

  const fetchMediaFromSupabase = async () => {
    try {
      const { data } = await supabase
        .from('media')
        .select('*')
        .eq('type', 'video')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setDbVideos(data)
      }
    } catch (err) {
      console.error('Error loading videos from Supabase:', err)
    }
  }

  // Combine dynamic dbVideos with static items
  const dynamicCategory = dbVideos.length > 0 ? [{
    name: 'Newly Posted Videos',
    desc: 'Latest videos posted from Mt Zion Cheese Admin.',
    items: dbVideos.map((m) => ({
      title: m.title,
      speaker: m.speaker || 'Mt Zion Team',
      date: m.created_at ? new Date(m.created_at).toLocaleDateString() : 'Recent',
      duration: 'HD',
      img: m.thumbnail_url || '/images/watch_live_stage.jpg',
      url: m.external_url,
      provider: m.provider
    }))
  }] : []

  const allCategories = [...dynamicCategory, ...staticVideoCategories]

  return (
    <div className="pb-24">
      {/* Featured Hero */}
      <section className="relative w-full h-[600px] bg-inverse-surface flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: "url('/images/watch_live_stage.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/50 to-transparent" />
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-3xl flex flex-col items-center">
          <span className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-widest mb-4 inline-block bg-inverse-surface/50 px-3 py-1 rounded-full border border-primary-fixed/30 backdrop-blur-sm">
            Worship & Sermons
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-tertiary mb-6">
            Watch & Experience God's Presence
          </h1>
          <p className="font-body-lg text-body-lg text-inverse-on-surface mb-8 max-w-xl text-center mx-auto opacity-90">
            Stream Sunday worship services, video messages, and special events.
          </p>
          <button
            onClick={() => setActiveVideo({ title: 'Taking the Gospel Beyond the Walls', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' })}
            className="group relative w-20 h-20 flex items-center justify-center rounded-full bg-primary-container text-on-primary-container hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <span className="material-symbols-outlined text-4xl ml-1 fill">play_arrow</span>
            <span className="absolute inset-0 rounded-full border border-primary-container animate-ping opacity-75" />
          </button>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-surface-container-low border-b border-outline-variant/30 py-6 sticky top-[73px] z-40 backdrop-blur-md bg-surface-container-low/90">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface text-on-surface font-body-md pl-12 pr-4 py-3 rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/70"
              placeholder="Search sermons, series, or topics..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {['All', 'Newly Posted', 'Sermons', 'Worship', 'Teachings'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveCategoryFilter(t)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border font-button text-button transition-colors ${
                  activeCategoryFilter === t
                    ? 'border-primary text-primary bg-primary/10 font-bold'
                    : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Content Lists */}
      <div className="max-w-container-max mx-auto py-16 px-margin-mobile md:px-margin-desktop flex flex-col gap-12">
        {allCategories.map((cat) => {
          const filteredItems = cat.items.filter(
            (v) =>
              v.title.toLowerCase().includes(search.toLowerCase()) ||
              v.speaker.toLowerCase().includes(search.toLowerCase())
          )

          if (filteredItems.length === 0) return null

          return (
            <section key={cat.name}>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-background mb-1">{cat.name}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">{cat.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((v) => (
                  <div
                    key={v.title}
                    onClick={() => setActiveVideo({ title: v.title, url: v.url, provider: (v as any).provider })}
                    className="group cursor-pointer bg-surface-container-lowest border border-outline-variant/20 rounded-lg overflow-hidden flex flex-col hover:border-primary/50 transition-all shadow-sm"
                  >
                    <div className="relative w-full aspect-video bg-surface-variant overflow-hidden">
                      <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-white fill">play_circle</span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-inverse-surface/80 text-on-tertiary font-label-caps text-label-caps px-2 py-1 rounded text-[10px]">
                        {v.duration}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="font-headline-md text-base leading-snug text-on-background group-hover:text-primary transition-colors line-clamp-2 font-bold mb-2">
                        {v.title}
                      </h3>
                      <p className="font-body-md text-xs text-on-surface-variant">
                        {v.speaker} • {v.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* --- VIDEO POPUP PLAYER MODAL --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-on-background text-surface-bright flex justify-between items-center">
              <h3 className="font-headline-md text-base font-bold line-clamp-1">{activeVideo.title}</h3>
              <button onClick={() => setActiveVideo(null)} className="text-white hover:text-primary-fixed p-1">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="w-full aspect-video bg-black flex items-center justify-center">
              {activeVideo.url && activeVideo.url.includes('youtube.com') ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${extractYouTubeId(activeVideo.url)}?autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeVideo.url ? (
                <video src={activeVideo.url} controls autoPlay className="w-full h-full" />
              ) : (
                <div className="text-white text-center p-8">
                  <span className="material-symbols-outlined text-6xl text-primary mb-2">play_circle</span>
                  <p>Video content loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
