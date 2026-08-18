import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface SavedSermon {
  id: string
  title: string
  speaker: string
  duration: string
}

interface UserPrayer {
  id: string
  request: string
  date: string
}

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [userName, setUserName] = useState('Sarah')
  const [prayers, setPrayers] = useState<UserPrayer[]>([])
  const [newPrayerText, setNewPrayerText] = useState('')
  const [showAddPrayer, setShowAddPrayer] = useState(false)

  const savedSermons: SavedSermon[] = [
    { id: '1', title: 'The Power of Stillness', speaker: 'Pastor David', duration: '45 mins' },
    { id: '2', title: 'Community in Action', speaker: 'Guest Speaker', duration: '32 mins' },
  ]

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('prayer_requests') || '[]')
    setPrayers(loaded)
  }, [])

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPrayerText.trim()) return
    const newReq: UserPrayer = {
      id: Date.now().toString(),
      request: newPrayerText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    const updated = [newReq, ...prayers]
    setPrayers(updated)
    localStorage.setItem('prayer_requests', JSON.stringify(updated))
    setNewPrayerText('')
    setShowAddPrayer(false)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput) {
      const namePart = emailInput.split('@')[0]
      setUserName(namePart.charAt(0).toUpperCase() + namePart.slice(1))
    }
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-margin-mobile py-16">
        <div className="bg-surface-container-low border border-outline-variant/30 p-8 md:p-12 rounded-xl max-w-md w-full shadow-lg">
          <div className="text-center mb-8">
            <span className="material-symbols-outlined text-primary text-5xl mb-2">account_circle</span>
            <h1 className="font-headline-lg text-headline-lg text-on-background">Sign In to GracePoint</h1>
            <p className="font-body-md text-sm text-on-surface-variant mt-2">
              Track your Faith Journey, access saved sermons, and manage downloads.
            </p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="demail" className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                Email Address
              </label>
              <input
                id="demail"
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="sarah@example.com"
                className="bg-surface border border-outline-variant/40 rounded p-3 font-body-md text-on-background outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dpass" className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                Password
              </label>
              <input
                id="dpass"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="bg-surface border border-outline-variant/40 rounded p-3 font-body-md text-on-background outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-on-primary font-button text-button py-3.5 rounded hover:bg-primary/90 transition-colors mt-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24 pb-24">
      {/* Welcome Section */}
      <section className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-2">
            Welcome back, {userName}.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Here is a summary of your spiritual growth journey and recent activities. Continue where you left off or explore new resources.
          </p>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="self-start md:self-auto font-button text-sm border border-outline-variant px-4 py-2 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          Sign Out
        </button>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
        {/* Faith Journey (Spans 8 cols) */}
        <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-6 relative overflow-hidden group">
          <div
            className="absolute inset-0 z-0 opacity-10 mix-blend-multiply bg-cover bg-center"
            style={{ backgroundImage: `url('/images/dashboard_pattern.jpg')` }}
          />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-md text-headline-md text-on-background">Faith Journey Overview</h2>
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase bg-primary-container/20 px-3 py-1 rounded-full">
                  In Progress (65%)
                </span>
              </div>
              {/* Progress Path */}
              <div className="relative py-4 pl-4 mb-8">
                <div className="absolute left-[23px] top-8 bottom-4 w-px bg-outline-variant/50" />

                <div className="flex items-start gap-4 mb-6 relative">
                  <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0 mt-1 z-10 relative" />
                  <div>
                    <h3 className="font-button text-button text-on-background">1. Foundations of Faith</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Completed ✓</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6 relative">
                  <div className="w-4 h-4 rounded-full border-2 border-primary bg-background flex-shrink-0 mt-1 z-10 relative" />
                  <div>
                    <h3 className="font-button text-button text-on-background">2. Understanding Grace</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Module 2 of 4</p>
                    <div className="mt-4 bg-surface-container h-1.5 w-full max-w-md rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[65%]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative">
                  <div className="w-4 h-4 rounded-full border border-outline bg-background flex-shrink-0 mt-1 z-10 relative" />
                  <div>
                    <h3 className="font-button text-button text-on-surface-variant">3. Living the Word</h3>
                    <p className="font-body-md text-body-md text-outline">Upcoming</p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/growth/lesson/3"
              className="self-start bg-primary text-on-primary font-button text-button px-6 py-3 rounded hover:bg-primary/90 transition-transform duration-150 ease-in-out flex items-center gap-2 mt-4"
            >
              Continue Learning
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Side Cards (Spans 4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {/* Saved Sermons */}
          <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/20 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline-md text-headline-md text-on-background">Saved Sermons</h2>
              <span className="material-symbols-outlined text-on-surface-variant">bookmark</span>
            </div>
            <ul className="space-y-4">
              {savedSermons.map((s) => (
                <li key={s.id} className="border-b border-outline-variant/30 pb-3 last:border-0 last:pb-0">
                  <Link to="/sermons" className="group block">
                    <h3 className="font-button text-button text-on-background group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">
                      {s.speaker} • {s.duration}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Prayer Requests */}
          <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/20 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline-md text-headline-md text-on-background">Prayer Requests</h2>
              <span className="material-symbols-outlined text-on-surface-variant">folded_hands</span>
            </div>
            {prayers.length > 0 ? (
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
                {prayers.slice(0, 3).map((p) => (
                  <div key={p.id} className="bg-background border border-outline-variant/20 rounded p-3">
                    <p className="font-body-md text-sm text-on-surface-variant italic">"{p.request}"</p>
                    <p className="font-label-caps text-[10px] text-outline mt-1 text-right">{p.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-background border border-outline-variant/20 rounded p-4 mb-4">
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  "For my family's health and strength in faith..."
                </p>
                <p className="font-label-caps text-label-caps text-outline mt-2 text-right">Submitted recently</p>
              </div>
            )}

            {showAddPrayer ? (
              <form onSubmit={handleAddPrayer} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  value={newPrayerText}
                  onChange={(e) => setNewPrayerText(e.target.value)}
                  placeholder="Type your prayer request..."
                  className="w-full bg-background border border-outline-variant/40 rounded p-2 text-sm text-on-background outline-none focus:border-primary resize-none"
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-primary text-on-primary font-button text-xs px-3 py-1.5 rounded">
                    Save Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddPrayer(false)}
                    className="border border-outline-variant font-button text-xs px-3 py-1.5 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddPrayer(true)}
                className="w-full bg-transparent border border-on-surface-variant text-on-surface-variant font-button text-button px-4 py-2 rounded hover:bg-surface-container-highest transition-colors"
              >
                Add Request
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recent Lessons & Downloads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Recent Lessons Editorial Style */}
        <div className="group relative overflow-hidden bg-background border border-outline-variant/20 rounded-lg p-6">
          <div className="aspect-[4/3] w-full overflow-hidden mb-4 rounded bg-surface-container">
            <img
              src="/images/dashboard_bible_tea.jpg"
              alt="Lesson"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </div>
          <div>
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-2">
              Recent Lesson
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-background mb-2">Finding Purpose in the Everyday</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Explore how routine moments can be transformed into opportunities for spiritual reflection and growth.
            </p>
            <Link
              to="/growth/lesson/3"
              className="font-button text-button text-primary hover:text-on-background transition-colors flex items-center gap-1"
            >
              Read Lesson <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </Link>
          </div>
        </div>

        {/* Downloads List */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-lg flex flex-col justify-center">
          <h2 className="font-headline-md text-headline-md text-on-background mb-6">Recent Downloads</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container transition-colors rounded">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-tertiary">description</span>
                <div>
                  <p className="font-button text-button text-on-background">Study Guide: Book of Romans</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">PDF • 2.4 MB</p>
                </div>
              </div>
              <Link to="/resources" className="text-primary hover:text-on-background transition-colors">
                <span className="material-symbols-outlined">download</span>
              </Link>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container transition-colors rounded">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-tertiary">headphones</span>
                <div>
                  <p className="font-button text-button text-on-background">Morning Devotional Audio</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">MP3 • 15 mins</p>
                </div>
              </div>
              <Link to="/resources" className="text-primary hover:text-on-background transition-colors">
                <span className="material-symbols-outlined">download</span>
              </Link>
            </div>
          </div>
          <Link
            to="/resources"
            className="mt-6 font-button text-button text-on-surface-variant hover:text-primary transition-colors inline-block"
          >
            View all downloads →
          </Link>
        </div>
      </div>
    </div>
  )
}
