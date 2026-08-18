import { useState } from 'react'

const types = ['All', 'Sermons', 'PDFs', 'Devotionals', 'Books']

const resources = [
  { title: 'Walking in Faith: A 30-Day Guide', type: 'PDF Study Guide', size: '2.4 MB', icon: 'description', desc: 'A comprehensive daily study guide to deepen your understanding of faith in everyday life. Includes reflection questions and prayer prompts.' },
  { title: 'The Sermon on the Mount: Part 1', type: 'Sermon Transcript', size: '1.1 MB', icon: 'description', desc: "Full transcript of Pastor David's exposition on Matthew 5, focusing on the Beatitudes and their application for modern believers." },
  { title: 'Morning Mercies', type: 'Devotional E-Book', size: '5.8 MB', icon: 'book', featured: true, desc: 'A collection of 60 morning devotionals designed to start your day centered on God\'s grace and truth.' },
  { title: 'Understanding Church History', type: 'Presentation', size: '12.4 MB', icon: 'slideshow', desc: 'Slide deck used in the Sunday evening seminar covering the early church fathers and key councils.' },
  { title: 'GracePoint Doctrinal Statement', type: 'PDF Document', size: '0.8 MB', icon: 'description', desc: 'A detailed overview of our core beliefs, theological positions, and guiding principles as a local church body.' },
  { title: 'Praying the Psalms', type: 'Audio Book', size: '45.2 MB', icon: 'audio_file', desc: 'Audio recordings of selected Psalms read with commentary to guide personal or corporate prayer times.' },
]

export default function Resources() {
  const [active, setActive] = useState('All')

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24 pb-24">
      <div className="mb-12 md:mb-section-gap text-center max-w-3xl mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 text-on-surface">
          Resource Library
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Equipping you with materials for spiritual growth. Explore our collection of sermons, study guides, and
          devotionals.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-surface-container-low p-6 rounded-lg border border-outline-variant/20">
          <div className="w-full md:w-1/2 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              className="w-full bg-surface border-b border-outline-variant/50 focus:border-primary pl-12 pr-4 py-3 font-body-md text-on-surface outline-none transition-colors bg-transparent border-0 border-b focus:ring-0"
              placeholder="Search resources..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-4 py-2 rounded-full border font-button text-button transition-colors ${
                  active === t
                    ? 'border-primary bg-primary-container/10 text-primary'
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
        {resources.map((r) => (
          <div
            key={r.title}
            className="bg-surface-container-lowest border border-outline-variant/30 p-6 flex flex-col hover:border-primary/50 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps uppercase rounded">
                {r.type}
              </span>
              <span className="text-on-surface-variant text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">{r.icon}</span> {r.size}
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
              {r.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">{r.desc}</p>
            <button
              className={`w-full flex items-center justify-center gap-2 py-3 font-button text-button transition-colors ${
                r.featured
                  ? 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'
                  : 'bg-surface border border-outline-variant hover:bg-surface-container-low text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined">download</span>
              Download File
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center items-center gap-2">
        <button className="p-2 border border-outline-variant rounded hover:bg-surface-container-low transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            className={`w-10 h-10 flex items-center justify-center font-button rounded ${
              p === 1 ? 'bg-primary text-on-primary' : 'border border-outline-variant hover:bg-surface-container-low transition-colors'
            }`}
          >
            {p}
          </button>
        ))}
        <span className="text-on-surface-variant">...</span>
        <button className="p-2 border border-outline-variant rounded hover:bg-surface-container-low transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
