import { Link } from 'react-router-dom'

const HERO_IMG = '/images/salvation_sunrise.jpg'

const STEPS = [
  {
    num: '01',
    title: 'Understanding the Gospel',
    desc: 'Understanding the call and opening your heart to the possibility of a relationship with God. It starts with a simple "yes".',
    span: 'md:col-span-8',
    featured: true,
  },
  {
    num: '02',
    title: 'Understanding Sin',
    desc: 'Building the foundation of faith and understanding the core tenets of Christianity and our need for a Savior.',
    span: 'md:col-span-4',
  },
  {
    num: '03',
    title: 'Who is Jesus Christ?',
    desc: 'Discovering the person, work, and character of Jesus — His life, teachings, death, and resurrection.',
    span: 'md:col-span-6',
  },
  {
    num: '04',
    title: 'Repentance & Faith',
    desc: 'Turning away from old paths and embracing the grace offered for a new beginning through trust in Christ.',
    span: 'md:col-span-6',
  },
  {
    num: '05',
    title: 'Giving Your Life to Christ',
    desc: 'The moment of surrender — inviting Jesus to be Lord and Savior of your life through a guided prayer.',
    span: 'md:col-span-4',
  },
  {
    num: '06',
    title: 'Your New Life in Christ',
    desc: 'What happens next: prayer, Bible reading, church fellowship, and the foundations of Christian living.',
    span: 'md:col-span-4',
  },
  {
    num: '07',
    title: 'Begin Growing',
    desc: 'Welcome to your new journey. Step into structured discipleship and continue growing in your faith.',
    span: 'md:col-span-4',
  },
]

export default function Salvation() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative pt-section-gap pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-80"
            src={HERO_IMG}
            alt="Path to sunrise"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 space-y-8">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
              Start Your Journey <br /> <span className="text-primary italic">with Christ</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Are you ready to begin your journey with Jesus Christ? We'll walk with you step by step. This is a place
              of grace, open to all who seek.
            </p>
            <div className="pt-4">
              <Link
                to="/salvation/step/1"
                className="bg-primary-container text-on-primary-container font-button text-button px-8 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-colors duration-300 inline-flex items-center gap-2"
              >
                Start Journey
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Bento Grid */}
      <section className="py-section-gap bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">The 7-Step Journey</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              A guided path designed to support your spiritual growth at every stage. We are here with resources,
              community, and prayer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {STEPS.map((step) => (
              <Link
                key={step.num}
                to={`/salvation/step/${step.num}`}
                className={`${step.span} ${
                  step.featured ? 'bg-surface' : 'bg-background'
                } border border-outline-variant/30 p-8 rounded-2xl relative overflow-hidden group flex flex-col justify-between min-h-[220px] hover:border-primary/50 transition-colors`}
              >
                {step.featured && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700" />
                )}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-2">
                      Step {step.num}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-background mb-4">{step.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{step.desc}</p>
                  </div>
                  <div className="mt-8">
                    <span className="text-primary font-button text-button inline-flex items-center gap-2 hover:gap-3 transition-all">
                      Explore <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
