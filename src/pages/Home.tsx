import { Link } from 'react-router-dom'

const HERO_IMG = '/images/hero_sunset.jpg'
const STORY_IMG = '/images/family_worship.jpg'

export default function Home() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center absolute inset-0"
            style={{ backgroundImage: `url(${HERO_IMG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-on-background/90 via-on-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-1/3 bottom-0" />
        </div>
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="col-span-1 md:col-span-8 lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-primary-container" />
              <span className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-[0.2em]">
                Welcome to GracePoint
              </span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-surface-bright leading-tight">
              Faith. Family.
              <br />
              Community.
            </h1>
            <p className="font-body-lg text-body-lg text-surface-variant/90 max-w-md">
              Join us this Sunday as we gather to worship, grow together, and belong to something bigger. A place to
              know Christ, grow in faith and serve others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                to="/salvation"
                className="bg-primary-container text-on-primary-container font-button text-button px-8 py-3.5 rounded text-center hover:bg-primary-container/90 transition-colors shadow-lg shadow-on-background/20"
              >
                Start Your Journey
              </Link>
              <Link
                to="/sermons"
                className="bg-transparent border border-surface-bright text-surface-bright font-button text-button px-8 py-3.5 rounded text-center hover:bg-surface-bright/10 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px] fill">play_circle</span>
                Watch Sermon
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-margin-desktop hidden lg:flex bg-on-background/80 backdrop-blur-md border border-primary/30 rounded-full px-6 py-3 items-center gap-4 z-20">
          <span className="font-label-caps text-label-caps text-primary-fixed">SUNDAYS</span>
          <span className="font-headline-md text-[20px] text-surface-bright">9:00 & 11:00 AM</span>
        </div>
      </section>

      {/* Quick Access Bar */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant/30 py-8 relative z-20 -mt-8">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x-0 md:divide-x divide-outline-variant/30">
            <Link to="/sermons" className="flex flex-col items-center justify-center gap-3 group px-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px]">headphones</span>
              </div>
              <span className="font-button text-button text-on-surface-variant group-hover:text-primary transition-colors">
                Listen
              </span>
            </Link>
            <Link to="/watch" className="flex flex-col items-center justify-center gap-3 group px-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px] fill">play_arrow</span>
              </div>
              <span className="font-button text-button text-on-surface-variant group-hover:text-primary transition-colors">
                Watch
              </span>
            </Link>
            <Link to="/gospel" className="flex flex-col items-center justify-center gap-3 group px-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px] fill">menu_book</span>
              </div>
              <span className="font-button text-button text-on-surface-variant group-hover:text-primary transition-colors">
                Read
              </span>
            </Link>
            <Link to="/resources" className="flex flex-col items-center justify-center gap-3 group px-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px]">download</span>
              </div>
              <span className="font-button text-button text-on-surface-variant group-hover:text-primary transition-colors">
                Download
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="font-label-caps text-label-caps text-primary tracking-[0.15em] uppercase">Our Story</span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              Rooted in Faith,
              <br />
              Growing in Grace
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant/80">
              For over two decades, GracePoint has been a home for people seeking real community and a genuine
              relationship with God. What began as a small gathering in a living room has grown into a family that
              welcomes everyone, exactly as they are.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant/80">
              We believe church isn't a building — it's a people. Every week we gather to worship, learn from scripture,
              and support one another through life's biggest moments, big and small.
            </p>
            <div className="flex gap-8 mt-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-on-background flex items-center justify-center">
                  <span className="material-symbols-outlined text-surface-bright text-[20px] fill">church</span>
                </div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">Faith</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-on-background flex items-center justify-center">
                  <span className="material-symbols-outlined text-surface-bright text-[20px] fill">groups</span>
                </div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">Family</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-on-background flex items-center justify-center">
                  <span className="material-symbols-outlined text-surface-bright text-[20px] fill">my_location</span>
                </div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">Purpose</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/about"
                className="inline-block bg-primary-container text-on-primary-container font-button text-button px-8 py-3 rounded hover:bg-primary-container/90 transition-colors"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 mt-12 lg:mt-0 relative">
            <div className="aspect-[4/5] w-full rounded-lg overflow-hidden relative">
              <img
                src={STORY_IMG}
                alt="Church community"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-surface-container-low rounded-lg -z-10 hidden md:block border border-outline-variant/30" />
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-section-gap w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-on-background via-on-background to-[#2a2418] z-0" />
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center flex flex-col items-center mb-16">
            <span className="font-label-caps text-label-caps text-primary-fixed tracking-[0.15em] uppercase mb-4">
              Join Us
            </span>
            <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-4">Service Times & Schedule</h2>
            <p className="font-body-md text-body-md text-surface-variant/80 max-w-2xl">
              Wherever you are in life, there's a service for you. Arrive a little early for coffee and conversation in
              the lobby — we'd love to meet you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'light_mode', title: 'Sunday Worship', time: '9:00 & 11:00 AM', desc: 'Main Sanctuary — join us for worship, teaching, and communion. Doors open thirty minutes early for coffee and fellowship.' },
              { icon: 'menu_book', title: 'Bible Study', time: 'Wed • 7:00 PM', desc: 'Fellowship Hall — a relaxed midweek gathering to dig deeper into scripture and pray for one another.' },
              { icon: 'groups', title: 'Youth Group', time: 'Fri • 6:30 PM', desc: 'Youth Center — a high-energy night of games, worship, and honest conversation for teens.' },
              { icon: 'child_care', title: 'Kids Church', time: 'During Services', desc: 'Kids Wing — a safe, fun, age-graded space where kids learn about God through stories and songs.' },
            ].map((c) => (
              <div key={c.title} className="bg-surface rounded-lg p-8 hover:-translate-y-1 transition-transform duration-300 shadow-xl shadow-black/20">
                <div className="w-12 h-12 bg-on-background rounded flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary-fixed">{c.icon}</span>
                </div>
                <h3 className="font-button text-[16px] text-on-background mb-1">{c.title}</h3>
                <p className="font-headline-md text-[20px] text-primary mb-4">{c.time}</p>
                <p className="font-body-md text-[14px] text-on-surface-variant/80 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-block bg-primary-container text-on-primary-container font-button text-button px-8 py-3 rounded hover:bg-primary-container/90 transition-colors"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>

      {/* Start Your Journey CTA */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-8 md:p-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #735c00 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-label-caps text-label-caps text-primary tracking-[0.15em] uppercase mb-4 block">
                Next Steps
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-6">
                Have You Given Your Life to Christ?
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant/80 mb-8">
                Learn what salvation means and follow our step-by-step Christian journey. Whether you are exploring faith
                for the first time or looking to recommit your life, we are here to walk with you.
              </p>
              <Link
                to="/salvation"
                className="inline-flex items-center gap-2 bg-on-background text-surface-bright font-button text-button px-8 py-3.5 rounded hover:bg-on-background/90 transition-colors"
              >
                Start Here
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 mt-8">
                <div className="bg-surface p-6 rounded border border-outline-variant/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-3 text-[32px]">favorite</span>
                  <h4 className="font-button text-on-background mb-2">1. Believe</h4>
                  <p className="text-[13px] text-on-surface-variant/70">
                    Understand God's love and the gift of salvation.
                  </p>
                </div>
                <div className="bg-surface p-6 rounded border border-outline-variant/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-3 text-[32px]">water_drop</span>
                  <h4 className="font-button text-on-background mb-2">3. Baptism</h4>
                  <p className="text-[13px] text-on-surface-variant/70">
                    Publicly declare your new life in Christ.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-surface p-6 rounded border border-outline-variant/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-3 text-[32px]">diversity_3</span>
                  <h4 className="font-button text-on-background mb-2">2. Belong</h4>
                  <p className="text-[13px] text-on-surface-variant/70">
                    Connect with a community of believers.
                  </p>
                </div>
                <div className="bg-surface p-6 rounded border border-outline-variant/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-3 text-[32px]">local_fire_department</span>
                  <h4 className="font-button text-on-background mb-2">4. Build</h4>
                  <p className="text-[13px] text-on-surface-variant/70">
                    Grow in your faith through discipleship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Sermons Preview */}
      <section className="pb-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.15em] uppercase mb-2 block">
              Latest
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Recent Sermons</h2>
          </div>
          <Link to="/sermons" className="hidden md:flex items-center gap-1 font-button text-button text-primary hover:text-primary-container transition-colors">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            {
              title: 'Walking on Water: Trusting the Unseen',
              speaker: 'Pastor John Doe',
              date: 'Oct 24, 2023',
              category: 'Faith',
              img: 'https://images.unsplash.com/photo-1445445290350-18a3b86d0fba?auto=format&fit=crop&w=600&q=80',
              duration: '45:20',
            },
            {
              title: 'The Architecture of Forgiveness',
              speaker: 'Pastor Jane Smith',
              date: 'Oct 17, 2023',
              category: 'Grace',
              img: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&q=80',
              duration: '38:15',
            },
            {
              title: 'Rooted Together: The Power of Assembly',
              speaker: 'Guest Speaker',
              date: 'Oct 10, 2023',
              category: 'Community',
              img: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=600&q=80',
              duration: '51:02',
            },
          ].map((s) => (
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
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-outline-variant/20">
                  <Link to="/sermons" className="flex items-center gap-2 text-primary hover:text-on-primary-fixed-variant transition-colors font-button text-button">
                    <span className="material-symbols-outlined fill">play_circle</span>Listen
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="pb-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-headline-lg text-headline-lg text-on-background">Upcoming Events</h2>
          <Link to="/events" className="hidden md:flex items-center gap-1 font-button text-button text-primary hover:text-primary-container transition-colors">
            All Events <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            {
              name: 'Autumn Community Worship',
              date: 'Sunday, Oct 15 • 10:00 AM',
              loc: 'GracePoint Main Sanctuary',
              img: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'Midweek Theological Study',
              date: 'Wednesday, Oct 18 • 7:00 PM',
              loc: 'The Study Hall (Room 204)',
              img: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'City Outreach Morning',
              date: 'Saturday, Oct 21 • 8:30 AM',
              loc: 'Downtown Community Center',
              img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80',
            },
          ].map((e) => (
            <article key={e.name} className="bg-surface-container-low border border-outline-variant/20 rounded-lg overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="h-48 relative overflow-hidden">
                <img src={e.img} alt={e.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-sm">{e.date}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-3">{e.name}</h3>
                <div className="flex items-center gap-2 text-on-surface-variant/80 mb-4">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-body-md text-body-md text-sm">{e.loc}</span>
                </div>
                <Link to="/events" className="font-button text-button text-primary hover:text-on-primary-fixed transition-colors">
                  View Event →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
