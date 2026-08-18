import { useState } from 'react'
import { Link } from 'react-router-dom'

interface EventItem {
  id: string
  title: string
  date: string
  location: string
  desc: string
  img: string
}

const initialEvents: EventItem[] = [
  {
    id: '1',
    title: 'Autumn Community Worship',
    date: 'Sunday, Oct 15 • 10:00 AM',
    location: 'GracePoint Main Sanctuary',
    desc: 'A special morning of unified worship and acoustic melodies celebrating the changing season. All are welcome to join us in the main sanctuary.',
    img: '/images/event_worship.jpg',
  },
  {
    id: '2',
    title: 'Midweek Theological Study',
    date: 'Wednesday, Oct 18 • 7:00 PM',
    location: 'The Study Hall (Room 204)',
    desc: 'Deepen your understanding with our ongoing series exploring the historical contexts of early epistles. Bring your notes and questions.',
    img: '/images/event_bible_study.jpg',
  },
  {
    id: '3',
    title: 'City Outreach Morning',
    date: 'Saturday, Oct 21 • 8:30 AM',
    location: 'Downtown Community Center',
    desc: 'Join hands with local partners to serve meals and distribute essential supplies to our neighbors in need. A morning of active compassion.',
    img: '/images/event_outreach.jpg',
  },
]

export default function Events() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [request, setRequest] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [salvationChoice, setSalvationChoice] = useState<string | null>(null)

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!request.trim()) return
    const newReq = {
      id: Date.now().toString(),
      name: name || 'Anonymous',
      email: email || 'No email provided',
      request,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Active',
    }
    const existing = JSON.parse(localStorage.getItem('prayer_requests') || '[]')
    localStorage.setItem('prayer_requests', JSON.stringify([newReq, ...existing]))
    setSubmitted(true)
    setName('')
    setEmail('')
    setRequest('')
  }

  const handleSalvationResponse = (choice: string) => {
    setSalvationChoice(choice)
    const existing = JSON.parse(localStorage.getItem('salvation_responses') || '[]')
    const newResp = {
      id: Date.now().toString(),
      choice,
      date: new Date().toLocaleString(),
    }
    localStorage.setItem('salvation_responses', JSON.stringify([newResp, ...existing]))
  }

  const downloadICS = (ev: EventItem) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GracePoint Ministry Hub//NONSGML Event//EN
BEGIN:VEVENT
SUMMARY:${ev.title}
DESCRIPTION:${ev.desc}
LOCATION:${ev.location}
END:VEVENT
END:VCALENDAR`
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', `${ev.title.replace(/\s+/g, '_')}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <main className="flex-grow">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-section-gap">
          <div className="mb-16 md:w-8/12">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">
              Upcoming Events & Prayer
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Join our community in worship, fellowship, and service. Discover what's happening at GracePoint this season
              and connect with us in prayer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            {/* Events List (Cols 1-8) */}
            <div className="md:col-span-8 flex flex-col gap-12">
              {initialEvents.map((ev) => (
                <article
                  key={ev.id}
                  className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden flex flex-col sm:flex-row group transition-colors hover:border-outline-variant/40"
                >
                  <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:h-full relative overflow-hidden bg-surface-container-high">
                    <img
                      src={ev.img}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-6 sm:p-8 sm:w-3/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-primary mb-3">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        <span className="font-label-caps text-label-caps uppercase tracking-wider">{ev.date}</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-background mb-3">{ev.title}</h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">{ev.desc}</p>
                      <div className="flex items-center gap-2 text-on-surface-variant/80 mb-6">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        <span className="font-body-md text-body-md text-sm">{ev.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        to="/contact"
                        className="font-button text-button bg-primary text-on-primary px-6 py-2.5 rounded transition-opacity hover:opacity-90"
                      >
                        View Event
                      </Link>
                      <button
                        onClick={() => downloadICS(ev)}
                        className="font-button text-button text-on-background border border-on-background/20 px-6 py-2.5 rounded transition-colors hover:bg-surface-container-high flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">event</span> Add to Calendar
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {/* Salvation Decision Banner */}
              <div className="bg-primary text-on-primary rounded-xl p-8 md:p-10 border border-primary-container/30 mt-6">
                <span className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-widest block mb-2">
                  Spiritual Decision
                </span>
                <h3 className="font-headline-lg text-headline-lg text-surface-bright mb-4">
                  Have You Given Your Life to Christ?
                </h3>
                <p className="font-body-md text-body-md text-on-primary/90 mb-6 max-w-xl">
                  Making a decision to follow Jesus Christ is the single most important step in your life. We are here to guide and support you.
                </p>

                {salvationChoice ? (
                  <div className="bg-surface-lowest/10 backdrop-blur-md p-4 rounded text-surface-bright border border-surface-bright/30">
                    <p className="font-button text-button flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-fixed">check_circle</span>
                      Thank you for sharing! Option selected: "{salvationChoice}". We'll walk with you step by step.
                    </p>
                    <Link to="/salvation" className="inline-block mt-3 font-button text-sm text-primary-fixed hover:underline">
                      Continue to 7-Step Salvation Journey →
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleSalvationResponse("Yes — I've accepted Christ")}
                      className="bg-primary-container text-on-primary-container font-button text-button px-6 py-3 rounded hover:bg-primary-container/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">favorite</span>
                      YES — I'VE ACCEPTED CHRIST
                    </button>
                    <Link
                      to="/salvation"
                      className="bg-transparent border border-surface-bright text-surface-bright font-button text-button px-6 py-3 rounded hover:bg-surface-bright/10 transition-colors text-center"
                    >
                      I WANT TO LEARN MORE
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Prayer Requests Sidebar (Cols 9-12) */}
            <div className="md:col-span-4 mt-12 md:mt-0">
              <div className="bg-surface-container-high rounded-xl p-8 sticky top-32 border border-outline-variant/20">
                <div className="mb-6">
                  <h3 className="font-headline-md text-headline-md text-on-background mb-2">Need Prayer?</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    Submit your request so our pastoral team and prayer community can stand with you in prayer.
                  </p>
                </div>

                {submitted ? (
                  <div className="bg-surface-container-lowest p-6 rounded text-center border border-primary/30 space-y-3">
                    <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
                    <h4 className="font-headline-md text-headline-md text-on-background">Prayer Request Submitted</h4>
                    <p className="font-body-md text-sm text-on-surface-variant">
                      Your prayer request has been received. Our team will be praying for you.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="font-button text-sm text-primary hover:underline block mx-auto pt-2"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePrayerSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                      <label className="font-label-caps text-label-caps text-on-surface-variant mb-1" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-background placeholder:text-on-surface-variant/40 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-label-caps text-label-caps text-on-surface-variant mb-1" htmlFor="email">
                        Email / Phone
                      </label>
                      <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-background placeholder:text-on-surface-variant/40 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-label-caps text-label-caps text-on-surface-variant mb-1" htmlFor="request">
                        Prayer Request
                      </label>
                      <textarea
                        id="request"
                        rows={4}
                        required
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder="Share what is on your heart..."
                        className="bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-0 rounded p-3 font-body-md text-body-md text-on-background placeholder:text-on-surface-variant/40 mt-2 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="font-button text-button bg-primary text-on-primary w-full py-3 rounded transition-opacity hover:opacity-90 mt-2"
                    >
                      Submit Prayer Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
