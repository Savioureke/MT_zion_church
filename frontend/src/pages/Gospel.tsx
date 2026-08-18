const topics = [
  {
    eyebrow: 'Foundations',
    title: 'Understanding the Good News',
    desc: "Begin your journey by exploring the core message of Christianity. What is the 'Good News' and why does it matter today?",
    wide: true,
    img: null,
    bg: 'surface-container-low',
  },
  {
    eyebrow: 'Identity',
    title: 'Who is Jesus?',
    desc: 'Examine the historical and theological evidence surrounding the life, death, and resurrection of Jesus of Nazareth.',
    img: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&w=600&q=80',
  },
  {
    eyebrow: 'The Human Condition',
    title: 'Why do we need Salvation?',
    desc: 'A deep dive into the concept of sin, separation from God, and the universal longing for redemption.',
    secondary: true,
  },
  {
    eyebrow: 'Turning Point',
    title: 'What is Repentance?',
    desc: 'Understand true biblical repentance—not just feeling sorry, but a fundamental change of mind and direction.',
    secondary: true,
  },
  {
    eyebrow: 'Response',
    title: 'Faith in Christ',
    desc: "Explore the nature of saving faith—what it means to trust in Christ's finished work on the cross.",
    secondary: true,
  },
]

export default function Gospel() {
  return (
    <div className="pb-24">
      <section className="w-full pt-section-gap pb-12 px-margin-desktop max-md:px-margin-mobile max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="col-span-1 md:col-span-8 md:col-start-3 text-center flex flex-col gap-6">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
            Read the Gospel
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Discover the Gospel and learn about Jesus Christ through structured teachings designed for deep reflection
            and understanding.
          </p>
        </div>
      </section>

      <section className="w-full pb-section-gap px-margin-desktop max-md:px-margin-mobile max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <article className="col-span-1 md:col-span-8 bg-surface-container-low rounded-lg p-8 md:p-12 border border-outline-variant/20 hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-surface-container opacity-50 z-0" />
            <div className="relative z-10">
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">
                {topics[0].eyebrow}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-4 group-hover:text-primary transition-colors">
                {topics[0].title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-8">{topics[0].desc}</p>
            </div>
            <div className="relative z-10 mt-auto">
              <a href="#" className="inline-flex items-center gap-2 font-button text-button text-primary hover:text-on-primary-fixed transition-colors">
                Read Now{' '}
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>
          </article>

          <article className="col-span-1 md:col-span-4 bg-surface-container-low rounded-lg border border-outline-variant/20 hover:border-primary/50 transition-colors duration-300 flex flex-col relative overflow-hidden group">
            <div className="h-48 w-full relative overflow-hidden bg-surface-variant">
              <img src={topics[1].img!} alt="Who is Jesus" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
            </div>
            <div className="p-8 flex flex-col flex-grow justify-between relative z-10">
              <div>
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-2 block">
                  {topics[1].eyebrow}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-background mb-4">{topics[1].title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{topics[1].desc}</p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 font-button text-button text-primary hover:text-on-primary-fixed transition-colors mt-auto">
                Read Now{' '}
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>
          </article>

          {topics.slice(2).map((t) => (
            <article
              key={t.title}
              className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-lg p-8 border border-outline-variant/20 hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                <span className="font-label-caps text-label-caps text-secondary tracking-widest uppercase mb-2 block">
                  {t.eyebrow}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-background mb-4">{t.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{t.desc}</p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 font-button text-button text-on-surface hover:text-primary transition-colors mt-auto">
                Read Now{' '}
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </article>
          ))}

          <article className="col-span-1 md:col-span-12 bg-primary text-on-primary rounded-lg border border-primary-fixed-dim/20 hover:border-primary-fixed transition-colors duration-300 flex flex-col md:flex-row overflow-hidden group">
            <div className="md:w-1/3 relative min-h-[250px] bg-primary-fixed-dim">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
                alt="Living for Christ"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center relative z-10">
              <span className="font-label-caps text-label-caps text-primary-fixed tracking-widest uppercase mb-4 block">
                Application
              </span>
              <h2 className="font-headline-lg text-headline-lg text-surface-container-lowest mb-4">Living for Christ</h2>
              <p className="font-body-md text-body-md text-on-primary/90 max-w-2xl mb-8">
                How does the Gospel transform our daily lives? Discover practical teachings on discipleship, community,
                and purpose.
              </p>
              <a href="#" className="inline-flex items-center w-fit gap-2 font-button text-button bg-surface-container-lowest text-primary px-6 py-3 rounded hover:bg-surface-container transition-colors shadow-sm">
                Read Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
