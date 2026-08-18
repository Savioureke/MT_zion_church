const videoCategories = [
  {
    name: 'Recent Sermons',
    desc: 'Catch up on the latest messages from our teaching team.',
    items: [
      { title: 'The Power of Stillness in a Chaotic World', speaker: 'Pastor David Chen', date: 'Oct 15, 2023', duration: '45:20', img: '/images/pastor_speaking.jpg' },
      { title: 'Building Foundations: Faith Under Fire', speaker: 'Dr. Sarah Jenkins', date: 'Oct 08, 2023', duration: '38:15', img: '/images/congregation.jpg' },
      { title: 'Understanding Grace in the Modern Age', speaker: 'Pastor David Chen', date: 'Oct 01, 2023', duration: '42:50', img: '/images/bible_study.jpg' },
    ],
  },
  {
    name: 'Worship Sessions',
    desc: 'Experience moments of heartfelt worship and praise.',
    items: [
      { title: 'Autumn Worship Night', speaker: 'GracePoint Worship', date: 'Oct 20, 2023', duration: '1:12:05', img: '/images/watch_live_stage.jpg' },
      { title: 'Acoustic Set | Sunday Morning', speaker: 'GracePoint Worship', date: 'Oct 14, 2023', duration: '28:30', img: '/images/family_worship.jpg' },
      { title: 'Hymns of the Faith', speaker: 'Traditional Ensemble', date: 'Sep 30, 2023', duration: '40:12', img: '/images/hero_sunset.jpg' },
    ],
  },
  {
    name: 'Teachings & Bible Studies',
    desc: 'Deep dives into scripture and theology.',
    items: [
      { title: 'The Book of Romans: Chapter 1-4', speaker: 'Dr. Sarah Jenkins', date: 'Oct 18, 2023', duration: '52:18', img: '/images/gospel_ancient_book.jpg' },
      { title: 'Understanding the Psalms', speaker: 'Pastor Jane Smith', date: 'Oct 11, 2023', duration: '44:45', img: '/images/sermon_bible.jpg' },
      { title: 'Parables of the Kingdom', speaker: 'Pastor John Doe', date: 'Oct 04, 2023', duration: '39:22', img: '/images/sermon_sanctuary.jpg' },
    ],
  },
]

export default function Watch() {
  return (
    <div className="pb-24">
      {/* Featured Hero */}
      <section className="relative w-full h-[716px] min-h-[500px] bg-inverse-surface flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: "url('/images/watch_live_stage.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/50 to-transparent" />
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-3xl flex flex-col items-center">
          <span className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-widest mb-4 inline-block bg-inverse-surface/50 px-3 py-1 rounded-full border border-primary-fixed/30 backdrop-blur-sm">
            Live Now
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-tertiary mb-6">
            Sunday Worship Experience
          </h1>
          <p className="font-body-lg text-body-lg text-inverse-on-surface mb-8 max-w-xl text-center mx-auto opacity-90">
            Join us as we explore the foundations of faith and community in today's gathering.
          </p>
          <button className="group relative w-20 h-20 flex items-center justify-center rounded-full bg-primary-container text-on-primary-container hover:scale-105 transition-transform duration-300 shadow-lg">
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
              className="w-full bg-surface text-on-surface font-body-md pl-12 pr-4 py-3 rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/70"
              placeholder="Search sermons, series, or topics..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {['All', 'Sermons', 'Worship', 'Teachings', 'Programs'].map((t, i) => (
              <button
                key={t}
                className={`whitespace-nowrap px-4 py-2 rounded-full border font-button text-button transition-colors ${
                  i === 0
                    ? 'border-primary text-primary bg-primary/5 hover:bg-primary/10'
                    : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-container-max mx-auto py-16 px-margin-mobile md:px-margin-desktop flex flex-col gap-section-gap">
        {videoCategories.map((cat) => (
          <section key={cat.name}>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">{cat.name}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">{cat.desc}</p>
              </div>
              <a href="#" className="hidden md:flex items-center gap-1 font-button text-button text-primary hover:text-primary-container transition-colors">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
              {cat.items.map((v) => (
                <div key={v.title} className="snap-start shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
                  <div className="relative w-full aspect-video bg-surface-variant rounded-lg overflow-hidden mb-4">
                    <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-inverse-surface/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-primary-fixed fill">play_circle</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-inverse-surface/80 text-on-tertiary font-label-caps text-label-caps px-2 py-1 rounded text-[10px] backdrop-blur-sm">
                      {v.duration}
                    </div>
                  </div>
                  <h3 className="font-headline-md text-[20px] leading-[28px] text-on-background group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {v.title}
                  </h3>
                  <p className="font-body-md text-[14px] text-on-surface-variant">
                    {v.speaker} • {v.date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
