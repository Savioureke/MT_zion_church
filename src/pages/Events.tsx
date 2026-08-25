import { useState, useEffect } from 'react'
import { supabase, EventItemDB } from '../lib/supabase'

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
    location: 'Mt Zion Cheese Main Sanctuary',
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
  const [dbEvents, setDbEvents] = useState<EventItemDB[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [request, setRequest] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('published', true)
        .order('event_date', { ascending: true })

      if (data && data.length > 0) {
        setDbEvents(data)
      }
    } catch (err) {
      console.error('Error fetching events:', err)
    }
  }

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
    
    // Save to Supabase if possible
    supabase.from('prayer_requests').insert({ name: newReq.name, email: newReq.email, request: newReq.request }).then(() => {})

    setSubmitted(true)
    setName('')
    setEmail('')
    setRequest('')
  }

  const dynamicItems = dbEvents.map((e) => ({
    id: e.id || Math.random().toString(),
    title: e.title,
    date: new Date(e.event_date).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' }),
    location: e.location || 'Mt Zion Cheese',
    desc: e.description,
    img: e.image_url || '/images/event_worship.jpg'
  }))

  const allEvents = [...dynamicItems, ...initialEvents]

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <main className="flex-grow">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-section-gap">
          <div className="mb-16 md:w-8/12">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4 font-bold">
              Upcoming Events & Prayer
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Join our community in worship, fellowship, and service. Discover what's happening at Mt Zion Cheese this season
              and connect with us in prayer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            {/* Events List */}
            <div className="md:col-span-8 space-y-8">
              <h2 className="font-headline-lg text-xl font-bold text-on-background">Event Schedule</h2>
              <div className="space-y-6">
                {allEvents.map((ev) => (
                  <div key={ev.id + ev.title} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 h-48 sm:h-auto relative bg-surface-variant">
                      <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="sm:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <span className="font-label-caps text-xs text-primary font-bold uppercase">{ev.date}</span>
                        <h3 className="font-headline-md text-lg font-bold text-on-background mt-1 mb-2">{ev.title}</h3>
                        <p className="font-body-md text-xs text-on-surface-variant mb-4">{ev.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-on-surface font-semibold pt-3 border-t border-outline-variant/20">
                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                        <span>{ev.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prayer Request Form */}
            <div className="md:col-span-4 bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-headline-md text-lg font-bold text-on-background mb-2">Submit Prayer Request</h3>
              <p className="text-xs text-on-surface-variant mb-6">Our pastoral and intercessory prayer team prays over every request received.</p>

              {submitted ? (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center text-xs text-primary space-y-2">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                  <p className="font-bold">Prayer Request Received!</p>
                  <p>Our ministry team will pray for your request.</p>
                  <button onClick={() => setSubmitted(false)} className="underline text-[11px] font-button mt-2">Submit Another Request</button>
                </div>
              ) : (
                <form onSubmit={handlePrayerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-button text-on-surface-variant mb-1">Your Name (Optional)</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-surface border border-outline-variant/40 rounded p-2.5 text-xs focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-button text-on-surface-variant mb-1">Your Email (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-surface border border-outline-variant/40 rounded p-2.5 text-xs focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-button text-on-surface-variant mb-1">Prayer Request *</label>
                    <textarea
                      rows={4}
                      required
                      value={request}
                      onChange={(e) => setRequest(e.target.value)}
                      placeholder="How can we stand in prayer with you today?"
                      className="w-full bg-surface border border-outline-variant/40 rounded p-2.5 text-xs focus:border-primary outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary font-button py-2.5 rounded-lg text-xs font-semibold shadow hover:bg-primary/90 transition-colors"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
