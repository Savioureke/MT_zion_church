import { Link, useParams, useNavigate } from 'react-router-dom'

const STEP_IMG = '/images/step1_forest_path.jpg'

const STEP_DATA: Record<
  string,
  {
    title: string
    summary: string
    paragraphs: string[]
    scriptures: { text: string; ref: string }[]
    audioTitle: string
    audioLength: string
    prev?: string
    nextLabel: string
    nextTo: string
  }
> = {
  '1': {
    title: 'What is the Gospel?',
    summary:
      'The word "Gospel" simply means "Good News." But before we can truly appreciate the good news, we must first understand the reality of our condition and why we need saving.',
    paragraphs: [
      'At its core, the Gospel is the message of God\'s redemptive plan for humanity through His Son, Jesus Christ. It is not merely a set of rules to follow or a philosophy to adopt; it is a historical reality and a divine rescue mission.',
      'The reality of our situation is that humanity is separated from a holy God by sin. Sin isn\'t just bad behavior; it\'s a fundamental condition of rebellion against our Creator. This separation results in spiritual death. However, the good news begins with God\'s unconditional love.',
      'God did not leave us in our brokenness. He sent Jesus to live the perfect life we couldn\'t live, and to die the death that we deserved.',
    ],
    scriptures: [
      {
        text: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."',
        ref: '— John 3:16 (NIV)',
      },
      {
        text: '"But God demonstrates his own love for us in this: While we were still sinners, Christ died for us."',
        ref: '— Romans 5:8 (NIV)',
      },
    ],
    audioTitle: 'Listen to the Teaching',
    audioLength: '14:23',
    nextLabel: 'Next: Understanding Sin',
    nextTo: '/salvation/step/2',
  },
  '2': {
    title: 'Understanding Sin',
    summary:
      'Sin is more than making mistakes — it is the broken state of humanity that separates us from a perfect and holy God. Recognizing this is the first step toward healing.',
    paragraphs: [
      'The Bible describes sin as a universal condition: "All have sinned and fall short of the glory of God" (Romans 3:23). This means every one of us carries this condition.',
      'Sin corrupts our desires, twists our thinking, and breaks our relationships — with God, with others, and even with ourselves. Left to ourselves, we cannot fix this problem.',
      'But there is good news: where sin increased, grace abounded all the more (Romans 5:20). God\'s answer is not to condemn us but to rescue us through Christ.',
    ],
    scriptures: [
      {
        text: '"For all have sinned and fall short of the glory of God."',
        ref: '— Romans 3:23 (NIV)',
      },
      {
        text: '"For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord."',
        ref: '— Romans 6:23 (NIV)',
      },
    ],
    audioTitle: 'The Reality of Sin',
    audioLength: '12:08',
    prev: '/salvation/step/1',
    nextLabel: 'Next: Who is Jesus?',
    nextTo: '/salvation/step/3',
  },
  '3': {
    title: 'Who is Jesus Christ?',
    summary:
      'Jesus of Nazareth is not just a good teacher or a historical figure — He is the eternal Son of God who took on flesh to rescue humanity.',
    paragraphs: [
      'Jesus claimed to be God in human form. He said, "I and the Father are one" (John 10:30) and "Anyone who has seen me has seen the Father" (John 14:9).',
      'He lived a perfect, sinless life. He healed the sick, raised the dead, and taught with unparalleled authority. Then He willingly laid down His life on the cross as a sacrifice for our sins.',
      'Three days later, He rose from the dead — proving who He claimed to be and making forgiveness and new life possible for all who trust in Him.',
    ],
    scriptures: [
      {
        text: '"In the beginning was the Word, and the Word was with God, and the Word was God."',
        ref: '— John 1:1 (NIV)',
      },
      {
        text: '"Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me.""',
        ref: '— John 14:6 (NIV)',
      },
    ],
    audioTitle: 'The Person of Christ',
    audioLength: '16:42',
    prev: '/salvation/step/2',
    nextLabel: 'Next: Repentance & Faith',
    nextTo: '/salvation/step/4',
  },
  '4': {
    title: 'Repentance & Faith',
    summary:
      'Turning away from sin (repentance) and trusting fully in Christ (faith) are the two sides of the same coin — the gateway to new life.',
    paragraphs: [
      'Repentance means changing your mind and your direction. It is not just feeling sorry for your sins; it is deciding to turn from them and toward God.',
      'Faith means trusting in Jesus and His finished work on the cross, not in your own goodness, religious rituals, or moral efforts. It is trusting that He did for you what you could never do for yourself.',
      'Jesus said, "Repent and believe the good news!" (Mark 1:15). Both are essential. Together, they mark the moment you step from death into life.',
    ],
    scriptures: [
      {
        text: '"Repent, then, and turn to God, so that your sins may be wiped out, that times of refreshing may come from the Lord."',
        ref: '— Acts 3:19 (NIV)',
      },
      {
        text: '"For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast."',
        ref: '— Ephesians 2:8-9 (NIV)',
      },
    ],
    audioTitle: 'Turning and Trusting',
    audioLength: '13:15',
    prev: '/salvation/step/3',
    nextLabel: 'Next: Accepting Christ',
    nextTo: '/salvation/step/5',
  },
  '5': {
    title: 'Giving Your Life to Christ',
    summary:
      'This is the decisive moment. Through prayer, you can personally invite Jesus Christ to be your Savior and Lord.',
    paragraphs: [
      'There are no magic words. What matters is the posture of your heart — acknowledging your need for Christ, trusting Him to save you, and surrendering the lordship of your life to Him.',
      'If you are ready, you can pray something like this aloud or silently in the sincerity of your heart:',
      'Lord Jesus, I admit that I am a sinner and cannot save myself. I believe that You died for my sins and rose again. I now turn from my sins and trust You alone as my Savior and Lord. Come into my life, forgive my sins, and make me new. I give You control from this day forward. Amen.',
      'If you prayed this prayer sincerely, the Bible promises that you have been saved, forgiven, and adopted as a child of God forever! (John 1:12, Romans 10:9-10)',
    ],
    scriptures: [
      {
        text: '"If you declare with your mouth, "Jesus is Lord," and believe in your heart that God raised him from the dead, you will be saved."',
        ref: '— Romans 10:9 (NIV)',
      },
      {
        text: '"Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God."',
        ref: '— John 1:12 (NIV)',
      },
    ],
    audioTitle: 'A Prayer of Surrender',
    audioLength: '9:47',
    prev: '/salvation/step/4',
    nextLabel: 'Next: Your New Life',
    nextTo: '/salvation/step/6',
  },
  '6': {
    title: 'Your New Life in Christ',
    summary:
      'You are born again! Now what? Here are the foundational habits that will help you grow strong in your new life.',
    paragraphs: [
      'Read the Bible. The Bible is God\'s written Word. It is how He speaks to you, teaches you, and transforms you from the inside out. Start with the Gospel of John.',
      'Pray. Prayer is simply talking to God — and listening. Share your heart, your worries, your joys. He already knows, but He invites you to come close.',
      'Gather with other believers. The Bible tells us not to give up meeting together (Hebrews 10:25). Find a Bible-believing church and get plugged in.',
      'Share your faith. Tell someone what God has done in your life. Your story is one of the most powerful gifts you have.',
    ],
    scriptures: [
      {
        text: '"Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!"',
        ref: '— 2 Corinthians 5:17 (NIV)',
      },
      {
        text: '"Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another."',
        ref: '— Hebrews 10:25 (NIV)',
      },
    ],
    audioTitle: 'First Steps of a Disciple',
    audioLength: '15:30',
    prev: '/salvation/step/5',
    nextLabel: 'Next: Begin Growing',
    nextTo: '/salvation/step/7',
  },
  '7': {
    title: 'Begin Growing',
    summary:
      'You have completed the introduction. Your journey is just beginning. Step into our structured Christian growth pathway.',
    paragraphs: [
      'Salvation is not the finish line — it is the starting block. God wants to grow you into the likeness of Christ, and that takes a lifetime of walking with Him.',
      'Our Growth Journey walks you through six progressive stages, from the foundational truths of the faith to advanced topics like Christian character, serving others, and sharing your faith.',
      'Create a free account to track your progress, save your favorite sermons, access all resources, and journal your reflections. If you just made a decision for Christ, please let us know — we would love to celebrate with you and help you get connected.',
    ],
    scriptures: [
      {
        text: '"Grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen."',
        ref: '— 2 Peter 3:18 (NIV)',
      },
      {
        text: '"Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus."',
        ref: '— Philippians 1:6 (NIV)',
      },
    ],
    audioTitle: 'Your Discipleship Pathway',
    audioLength: '11:02',
    prev: '/salvation/step/6',
    nextLabel: 'Start Growth Journey',
    nextTo: '/growth',
  },
}

const STEP_LABELS = [
  'What is the Gospel?',
  'Understanding Sin',
  'Who is Jesus?',
  'Repentance & Faith',
  'Accepting Christ',
  'Your New Life',
  'Begin Growing',
]

export default function SalvationStep() {
  const { stepId } = useParams()
  const navigate = useNavigate()
  const id = stepId || '1'
  const stepNum = parseInt(id, 10)
  const data = STEP_DATA[id] || STEP_DATA['1']

  return (
    <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-12 gap-gutter">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 mb-12 md:mb-0">
        <div className="sticky top-32">
          <p className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-4">Salvation Journey</p>
          <div className="relative pl-4 border-l border-outline-variant/30 space-y-6">
            {STEP_LABELS.map((label, i) => {
              const idx = i + 1
              const isCurrent = idx === stepNum
              const isPast = idx < stepNum
              return (
                <div
                  key={idx}
                  className={`relative ${!isCurrent && !isPast ? 'opacity-50' : ''}`}
                >
                  <div
                    className={`absolute -left-[21px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                      isCurrent
                        ? 'border-2 border-primary bg-background'
                        : isPast
                          ? 'border-2 border-primary bg-primary'
                          : 'border border-outline bg-background'
                    }`}
                  />
                  <Link
                    to={`/salvation/step/${idx}`}
                    className={`font-button text-button ${isCurrent ? 'text-primary' : 'text-on-surface-variant'}`}
                  >
                    Step {idx}
                  </Link>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">{label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </aside>

      <article className="col-span-12 md:col-span-9 lg:col-span-8 lg:col-start-4">
        <header className="mb-12">
          <div className="flex items-center space-x-2 text-outline mb-6">
            <span className="font-label-caps text-label-caps uppercase">Step {id} of 7</span>
            <span className="w-12 h-px bg-outline-variant/50" />
          </div>
          <h1 className="font-display-lg text-display-lg max-md:font-display-lg-mobile max-md:text-display-lg-mobile text-on-background mb-6">
            {data.title}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {data.summary}
          </p>
        </header>

        <div className="mb-16 relative group">
          <img
            src={STEP_IMG}
            alt={data.title}
            className="w-full h-[400px] object-cover rounded-sm shadow-sm transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/40 to-transparent pointer-events-none rounded-sm" />
        </div>

        <div className="text-on-background font-body-md text-body-md space-y-8 leading-relaxed mb-16 text-justify">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {data.scriptures.map((s, i) => (
            <blockquote
              key={i}
              className="my-10 pl-6 border-l-2 border-primary bg-surface-container-low/50 p-6 rounded-r-sm italic"
            >
              <p className="font-headline-md text-headline-md text-on-background mb-4">{s.text}</p>
              <footer className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                {s.ref}
              </footer>
            </blockquote>
          ))}

          <div className="my-12 bg-surface-container-lowest border border-outline-variant/20 rounded-sm p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-lg text-headline-lg text-on-background">{data.audioTitle}</h3>
              <span className="material-symbols-outlined text-primary text-3xl">headphones</span>
            </div>
            <div className="bg-inverse-surface rounded px-6 py-4 flex items-center space-x-4">
              <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-container transition-colors flex-shrink-0">
                <span className="material-symbols-outlined text-on-primary fill">play_arrow</span>
              </button>
              <div className="flex-grow">
                <div className="flex justify-between text-on-primary text-xs font-label-caps mb-2">
                  <span>0:00</span>
                  <span>{data.audioLength}</span>
                </div>
                <div className="h-6 flex items-center space-x-1 w-full opacity-70">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`bg-tertiary-fixed-dim rounded-full w-1 ${
                        ['h-2', 'h-4', 'h-6', 'h-3', 'h-5', 'h-2', 'h-4', 'h-6', 'h-3'][i]
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-outline-variant/30 flex items-center justify-between">
          {data.prev ? (
            <Link
              to={data.prev}
              className="font-button text-button text-on-surface-variant hover:text-primary transition-colors flex items-center"
            >
              <span className="material-symbols-outlined mr-2">arrow_back</span>
              Previous Step
            </Link>
          ) : (
            <span className="font-button text-button text-on-surface-variant/50 flex items-center cursor-not-allowed">
              <span className="material-symbols-outlined mr-2">arrow_back</span>
              Previous Step
            </span>
          )}
          {data.nextTo.startsWith('/growth') || data.nextTo.startsWith('/dashboard') ? (
            <Link
              to={data.nextTo}
              className="group flex items-center bg-primary text-on-primary px-8 py-4 rounded font-button text-button hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm hover:shadow-md"
            >
              {data.nextLabel}
              <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          ) : (
            <button
              onClick={() => navigate(data.nextTo)}
              className="group flex items-center bg-primary text-on-primary px-8 py-4 rounded font-button text-button hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm hover:shadow-md"
            >
              {data.nextLabel}
              <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          )}
        </div>
      </article>
    </main>
  )
}
