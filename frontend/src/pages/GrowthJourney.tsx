import { Link } from 'react-router-dom'

const PATH_IMG = '/images/growth_olive_grove.jpg'

const STAGES = [
  {
    status: 'completed',
    label: 'Completed',
    title: 'Foundation',
    desc: 'The essentials of faith, understanding grace, and the core message of the Gospel.',
    progress: null,
  },
  {
    status: 'completed',
    label: 'Completed',
    title: 'Knowing Christ',
    desc: 'Deepening your personal relationship with Jesus and understanding His character.',
    progress: null,
  },
  {
    status: 'active',
    label: 'Current Focus',
    title: 'Prayer & Bible',
    desc: 'Building consistent habits of communicating with God and studying His Word.',
    progress: { pct: 30, label: '3 of 10 Lessons' },
  },
  {
    status: 'upcoming',
    label: 'Upcoming',
    title: 'Christian Character',
    desc: 'Cultivating the fruits of the Spirit and living a life that reflects Jesus.',
    progress: null,
  },
  {
    status: 'upcoming',
    label: 'Upcoming',
    title: 'Serving Others',
    desc: 'Discovering your spiritual gifts and finding joy in serving the community.',
    progress: null,
  },
  {
    status: 'upcoming',
    label: 'Upcoming',
    title: 'Sharing Your Faith',
    desc: 'Equipping yourself to confidently share the Gospel with grace and truth.',
    progress: null,
  },
]

export default function GrowthJourney() {
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
      <div className="mb-gutter flex flex-col md:flex-row justify-between items-end gap-gutter">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg text-on-background mb-4">My Faith Journey</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Walk in His light. Track your spiritual growth, engage with foundational teachings, and step into the
            purpose God has called you to.
          </p>
        </div>
        <div className="w-full md:w-72 bg-surface-container-low p-6 rounded-lg border border-outline-variant/20">
          <div className="flex justify-between items-end mb-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
              Journey Progress
            </span>
            <span className="font-headline-md text-headline-md text-primary">65%</span>
          </div>
          <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '65%' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mt-section-gap">
        <div className="md:col-span-5 h-[600px] relative rounded-xl overflow-hidden hidden md:block">
          <div
            className="bg-cover bg-center w-full h-full"
            style={{ backgroundImage: `url(${PATH_IMG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 to-transparent flex items-end p-8">
            <blockquote className="font-headline-md text-headline-md text-on-primary mb-4 italic">
              "Your word is a lamp to my feet and a light to my path."
              <footer className="font-body-md text-body-md text-primary-fixed mt-2 not-italic">
                — Psalm 119:105
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col gap-6 relative">
          <div className="absolute left-6 top-6 bottom-6 w-[1px] bg-outline-variant/50 hidden sm:block z-0" />

          {STAGES.map((s, i) => {
            const stageLink =
              s.status === 'active' ? '/growth/lesson/1' : s.status === 'completed' ? '/growth/lesson/1' : '#'
            return (
              <Link
                key={s.title}
                to={stageLink}
                className={`group relative flex gap-6 items-start rounded-lg border p-6 transition-colors z-10 ${
                  s.status === 'active'
                    ? 'bg-surface-container-low border-2 border-primary transform hover:-translate-y-1 shadow-sm'
                    : s.status === 'upcoming'
                      ? 'bg-surface opacity-75 border-outline-variant/20 hover:opacity-100'
                      : 'bg-surface border-outline-variant/20 hover:border-primary/50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    s.status === 'completed'
                      ? 'bg-primary border-4 border-background'
                      : s.status === 'active'
                        ? 'bg-background border-2 border-primary'
                        : 'bg-background border-2 border-outline-variant'
                  }`}
                >
                  {s.status === 'completed' ? (
                    <span className="material-symbols-outlined text-on-primary">check</span>
                  ) : s.status === 'active' ? (
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  ) : (
                    <span className="material-symbols-outlined text-outline-variant">circle</span>
                  )}
                </div>
                <div className="flex-grow">
                  <span
                    className={`font-label-caps text-label-caps tracking-widest uppercase block mb-1 ${
                      s.status === 'active' ? 'text-primary' : s.status === 'upcoming' ? 'text-outline' : 'text-on-surface-variant'
                    }`}
                  >
                    {s.label}
                  </span>
                  <h3
                    className={`font-headline-md text-headline-md ${
                      s.status === 'upcoming' ? 'text-on-surface-variant' : 'text-on-background group-hover:text-primary transition-colors'
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-4">{s.desc}</p>
                  {s.progress && (
                    <div className="w-full flex items-center gap-4">
                      <div className="flex-grow h-1 bg-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${s.progress.pct}%` }} />
                      </div>
                      <span className="font-body-md text-body-md text-on-surface-variant text-sm">
                        {s.progress.label}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
