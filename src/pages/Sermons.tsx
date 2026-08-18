import { useState } from 'react'

const sermons = [
  {
    title: 'Walking on Water: Trusting the Unseen',
    speaker: 'Pastor John Doe',
    date: 'Oct 24, 2023',
    category: 'Faith',
    duration: '45:20',
    img: '/images/sermon_sanctuary.jpg',
    desc: "An exploration of Peter's leap of faith and how we are called to step out of our comfort zones into the miraculous.",
  },
  {
    title: 'The Architecture of Forgiveness',
    speaker: 'Pastor Jane Smith',
    date: 'Oct 17, 2023',
    category: 'Grace',
    duration: '38:15',
    img: '/images/sermon_bible.jpg',
    desc: 'Understanding grace not as a feeling, but as a foundational structure for building healthy spiritual relationships.',
  },
  {
    title: 'Rooted Together: The Power of Assembly',
    speaker: 'Guest Speaker',
    date: 'Oct 10, 2023',
    category: 'Community',
    duration: '51:02',
    img: '/images/sermon_misty_valley.jpg',
    desc: 'Why gathering matters in a digital age and how physical presence strengthens the spiritual body.',
  },
  {
    title: 'The Power of Stillness in a Chaotic World',
    speaker: 'Pastor David Chen',
    date: 'Oct 03, 2023',
    category: 'Faith',
    duration: '44:30',
    img: '/images/pastor_speaking.jpg',
    desc: 'Exploring the discipline of silence and solitude as essential practices for spiritual health.',
  },
  {
    title: 'Building Foundations: Faith Under Fire',
    speaker: 'Dr. Sarah Jenkins',
    date: 'Sep 26, 2023',
    category: 'Discipleship',
    duration: '40:12',
    img: '/images/congregation.jpg',
    desc: 'How testing and trials serve to strengthen rather than destroy our faith.',
  },
  {
    title: 'Understanding Grace in the Modern Age',
    speaker: 'Pastor David Chen',
    date: 'Sep 19, 2023',
    category: 'Grace',
    duration: '42:50',
    img: '/images/bible_study.jpg',
    desc: 'Reimagining grace for our cultural moment without compromising its biblical foundation.',
  },
]

export default function Sermons() {
  const [search, setSearch] = useState('')
  const filtered = sermons.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-section-gap pb-24">
      <section className="mb-16 md:grid md:grid-cols-12 gap-gutter items-end">
        <div className="col-span-12 md:col-span-8">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">
            Sermon Library
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Explore our archive of teachings designed to guide you on your spiritual journey. Search by topic, speaker,
            or date to find exactly what you need.
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

      <section className="mb-12 border-y border-outline-variant/30 py-4">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mr-2">
            Filters:
          </span>
          {['Speaker', 'Topic', 'Date'].map((f) => (
            <select
              key={f}
              className="bg-transparent border border-outline-variant/50 rounded-full px-4 py-1.5 font-body-md text-on-surface focus:outline-none focus:border-primary appearance-none pr-8 cursor-pointer"
            >
              <option value="">{f}</option>
            </select>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 text-on-surface bg-surface-container-high rounded hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="p-2 text-outline hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">view_list</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filtered.map((s) => (
          <article
            key={s.title}
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-primary/50 transition-colors flex flex-col h-full"
          >
            <div className="h-48 relative overflow-hidden bg-surface-container-low">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="bg-background text-on-background font-label-caps text-label-caps px-2 py-1 rounded">{s.category}</span>
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
                <button className="flex items-center gap-2 text-primary hover:text-on-primary-fixed-variant transition-colors font-button text-button">
                  <span className="material-symbols-outlined fill">play_circle</span>Listen
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors font-button text-button ml-auto">
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-12 flex justify-center items-center gap-4">
        <button className="p-2 border border-outline-variant rounded text-outline hover:text-on-surface hover:border-on-surface transition-colors" disabled>
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <span className="font-body-md text-on-surface">Page 1 of 12</span>
        <button className="p-2 border border-outline-variant rounded text-on-surface hover:border-on-surface transition-colors">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
