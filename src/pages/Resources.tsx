import { useState, useEffect } from 'react'
import { supabase, MediaItem } from '../lib/supabase'

const staticResources = [
  { title: 'Walking in Faith: A 30-Day Guide', type: 'PDF Study Guide', size: '2.4 MB', icon: 'description', desc: 'A comprehensive daily study guide to deepen your understanding of faith in everyday life. Includes reflection questions and prayer prompts.', url: '#' },
  { title: 'The Sermon on the Mount: Part 1', type: 'Sermon Transcript', size: '1.1 MB', icon: 'description', desc: "Full transcript of Pastor David's exposition on Matthew 5, focusing on the Beatitudes and their application for modern believers.", url: '#' },
  { title: 'Morning Mercies', type: 'Devotional E-Book', size: '5.8 MB', icon: 'book', featured: true, desc: 'A collection of 60 morning devotionals designed to start your day centered on God\'s grace and truth.', url: '#' },
  { title: 'Mt Zion Cheese Doctrinal Statement', type: 'PDF Document', size: '0.8 MB', icon: 'description', desc: 'A detailed overview of our core beliefs, theological positions, and guiding principles as a local church body.', url: '#' },
]

export default function Resources() {
  const [dbResources, setDbResources] = useState<MediaItem[]>([])
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      const { data } = await supabase
        .from('media')
        .select('*')
        .in('type', ['pdf', 'document', 'audio'])
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setDbResources(data)
      }
    } catch (err) {
      console.error('Error fetching resources:', err)
    }
  }

  const dynamicItems = dbResources.map((m) => ({
    title: m.title,
    type: m.type === 'pdf' ? 'PDF Study Guide' : m.type === 'document' ? 'Document' : 'Audio Resource',
    size: 'Downloadable',
    icon: m.type === 'audio' ? 'audio_file' : 'description',
    desc: m.description || 'Resource download provided by Mt Zion Cheese administration.',
    url: m.external_url || '#',
    featured: true
  }))

  const allResources = [...dynamicItems, ...staticResources]

  const filtered = allResources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24 pb-24">
      <div className="mb-12 md:mb-section-gap text-center max-w-3xl mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 text-on-surface font-bold">
          Resource Library
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Equipping you with materials for spiritual growth. Download study guides, PDFs, sermon transcripts, and eBooks.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-surface-container-low p-6 rounded-lg border border-outline-variant/20 shadow-sm">
          <div className="w-full md:w-1/2 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border-b border-outline-variant/50 focus:border-primary pl-12 pr-4 py-3 font-body-md text-on-surface outline-none transition-colors rounded"
              placeholder="Search study guides, PDFs, eBooks..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {['All', 'PDFs', 'Devotionals', 'Books', 'Audio'].map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-4 py-2 rounded-full border font-button text-button transition-colors ${
                  active === t
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filtered.map((r, idx) => (
          <div
            key={r.title + idx}
            className="bg-surface-container-lowest border border-outline-variant/30 p-6 flex flex-col hover:border-primary/50 transition-colors group relative overflow-hidden rounded-xl shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-2.5 py-1 bg-primary/10 text-primary font-label-caps text-xs uppercase rounded font-bold">
                {r.type}
              </span>
              <span className="text-on-surface-variant text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-base">{r.icon}</span> {r.size}
              </span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
              {r.title}
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant mb-6 flex-grow">{r.desc}</p>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 font-button text-xs font-semibold bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Download Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
