import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function LessonDetail() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const [completed, setCompleted] = useState(false)
  const [reflection, setReflection] = useState('')
  const [savedJournal, setSavedJournal] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)

  const handleSaveReflection = () => {
    if (!reflection.trim()) return
    const journalEntries = JSON.parse(localStorage.getItem('journal_entries') || '[]')
    journalEntries.push({
      id: Date.now().toString(),
      lessonId: lessonId || '3',
      lessonTitle: 'The Nature of Grace',
      text: reflection,
      date: new Date().toLocaleDateString(),
    })
    localStorage.setItem('journal_entries', JSON.stringify(journalEntries))
    setSavedJournal(true)
  }

  const handleMarkComplete = () => {
    setCompleted(true)
    const completedLessons = JSON.parse(localStorage.getItem('completed_lessons') || '[]')
    if (!completedLessons.includes(lessonId || '3')) {
      completedLessons.push(lessonId || '3')
      localStorage.setItem('completed_lessons', JSON.stringify(completedLessons))
    }
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24 pb-24">
      {/* Lesson Header & Progress */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Link
            to="/growth"
            className="text-on-surface-variant hover:text-primary transition-colors font-button text-button flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Growth Journey
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-8">
          <div className="md:col-span-8">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">
              Stage 3 · Lesson {lessonId || '3'}
            </span>
            <h1 className="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg text-on-background mb-4">
              The Nature of Grace
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Lesson {lessonId || '3'} of 8 · Est. 15 mins</p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end">
            <div className="w-full bg-surface-container h-2 rounded-full mb-2 overflow-hidden">
              <div className="bg-primary h-full w-[37.5%]" />
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant text-right">37% Complete</p>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <section className="mb-section-gap">
        <div className="relative w-full aspect-video bg-inverse-surface group overflow-hidden border border-outline-variant/20 rounded-xl">
          <img
            src="/images/lesson_video_still.jpg"
            alt="Lesson video still"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-primary/90 text-on-primary rounded-full flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-lg">
              <span className="material-symbols-outlined text-[40px] ml-2 fill">play_arrow</span>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-headline-md text-headline-md text-on-primary">Understanding Unmerited Favor</h3>
            <p className="font-body-md text-body-md text-on-primary/80">Dr. Sarah Jenkins</p>
          </div>
        </div>

        {/* Audio Toggle / Player */}
        <div className="mt-4 flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/20 rounded">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAudioPlaying(!audioPlaying)}
              className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined fill">
                {audioPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <div>
              <p className="font-button text-button text-on-background">Listen to Audio Only</p>
              <p className="font-label-caps text-label-caps text-on-surface-variant">12:45</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1 opacity-50">
            <div className="w-1 h-3 bg-outline rounded-full" />
            <div className="w-1 h-6 bg-outline rounded-full" />
            <div className="w-1 h-4 bg-outline rounded-full" />
            <div className="w-1 h-8 bg-outline rounded-full" />
            <div className="w-1 h-5 bg-outline rounded-full" />
            <div className="w-1 h-2 bg-outline rounded-full" />
            <div className="w-1 h-6 bg-outline rounded-full" />
            <div className="w-1 h-4 bg-outline rounded-full" />
            <div className="w-1 h-7 bg-outline rounded-full" />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Left Column: Teaching Text */}
        <div className="md:col-span-7 lg:col-span-8">
          <article className="prose prose-stone max-w-none">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-6">The Unmerited Gift</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              Grace is fundamentally different from mercy. While mercy is not getting what we do deserve (punishment), grace is getting what we do not deserve (favor). In the classical world, grace (charis) was often associated with a gift that brought joy, but it was usually given to someone deemed worthy. The revolutionary nature of biblical grace is its application to the unworthy.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              When we look at the narrative of salvation, we see a consistent thread of God reaching down, rather than humanity climbing up. This distinction is crucial for our spiritual foundation. If we believe we must earn God's favor, our faith becomes a transactional burden. When we understand it as a gift, our faith becomes a transformational response of gratitude.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 my-8 py-2 bg-surface-container-low/50 rounded-r">
              <p className="font-headline-md text-headline-md italic text-on-background">
                "Grace means that all of your mistakes now serve a purpose instead of serving a sentence."
              </p>
            </blockquote>
            <h3 className="font-headline-md text-headline-md text-on-background mt-12 mb-4">Practical Application</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Living in grace requires a daily surrender of our ego. We must stop trying to justify ourselves and start resting in the justification provided. This shifts our daily interactions from a place of trying to prove our worth to a place of acting out of our inherent, God-given value.
            </p>
          </article>

          {/* Reflection & Prayer Area */}
          <section className="mt-16 bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-lg">
            <h3 className="font-headline-md text-headline-md text-on-background mb-2">Reflection & Prayer Journal</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Take a moment to write down your thoughts or a prayer based on today's lesson. This is saved to your personal dashboard journal.
            </p>
            <textarea
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Lord, help me to understand the depth of your grace today..."
              className="w-full bg-surface-bright border border-outline-variant/40 rounded p-4 font-body-md text-body-md text-on-background resize-none placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <div className="flex justify-between items-center mt-4">
              {savedJournal ? (
                <span className="text-sm font-button text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Journal entry saved to dashboard!
                </span>
              ) : <div />}
              <button
                onClick={handleSaveReflection}
                className="font-button text-button bg-primary text-on-primary px-6 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </section>

          {/* Lesson Actions */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-outline-variant/20">
            <button
              onClick={handleMarkComplete}
              className={`w-full sm:w-auto font-button text-button px-8 py-3 rounded flex items-center justify-center gap-2 transition-colors ${
                completed
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-on-background text-surface-bright hover:bg-on-background/90'
              }`}
            >
              <span className="material-symbols-outlined fill">check_circle</span>
              {completed ? 'Lesson Completed ✓' : 'Mark as Complete'}
            </button>
            <Link
              to="/growth/lesson/4"
              className="w-full sm:w-auto font-button text-button border border-on-background text-on-background px-8 py-3 rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2 group"
            >
              Next Lesson
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <aside className="md:col-span-5 lg:col-span-4 mt-12 md:mt-0">
          <div className="bg-surface-container p-6 md:p-8 rounded-lg mb-8 border border-outline-variant/20">
            <h4 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              Key Scriptures
            </h4>
            <div className="space-y-6">
              <div>
                <h5 className="font-button text-button text-on-background mb-2">Ephesians 2:8-9</h5>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God— not by works, so that no one can boast."
                </p>
              </div>
              <div className="h-px bg-outline-variant/20 w-full" />
              <div>
                <h5 className="font-button text-button text-on-background mb-2">Romans 11:6</h5>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  "And if by grace, then it cannot be based on works; if it were, grace would no longer be grace."
                </p>
              </div>
            </div>
          </div>

          <div className="border border-outline-variant/20 p-6 md:p-8 rounded-lg bg-surface-container-lowest">
            <h4 className="font-headline-md text-headline-md text-on-background mb-6">Further Study</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/resources" className="flex items-start gap-3 group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                    article
                  </span>
                  <div>
                    <span className="font-button text-button text-on-background group-hover:text-primary transition-colors block">
                      The Historical Context of Grace
                    </span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">PDF Reading · 5 mins</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/sermons" className="flex items-start gap-3 group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                    headphones
                  </span>
                  <div>
                    <span className="font-button text-button text-on-background group-hover:text-primary transition-colors block">
                      Podcast: Living Unmerited
                    </span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Audio · 45 mins</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
