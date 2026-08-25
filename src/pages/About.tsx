import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-24">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="font-label-caps text-label-caps text-primary tracking-[0.15em] uppercase mb-4 block">About Us</span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6">
          Rooted in Faith, Growing Together
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Mt Zion Cheese is more than a church building — it's a family of believers committed to knowing Christ and making
          Him known.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center mb-section-gap">
        <div>
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80"
            alt="Our Church"
            className="rounded-lg w-full aspect-[4/3] object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-headline-lg text-headline-lg text-on-background">Our Mission</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            We exist to glorify God by making disciples who love God, love people, and live on mission.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            At Mt Zion Cheese, we believe the church is not a building but a people. We are a diverse community of believers
            united by our faith in Jesus Christ. Whether you're exploring Christianity for the first time or looking
            for a church home, we welcome you exactly as you are.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { num: '20+', label: 'Years of Ministry' },
              { num: '1,248', label: 'Active Members' },
              { num: '12', label: 'Ministry Teams' },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 bg-surface-container-low rounded-lg">
                <div className="font-headline-lg text-headline-lg text-primary mb-1">{s.num}</div>
                <div className="font-label-caps text-label-caps text-on-surface-variant">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mb-section-gap">
        <h2 className="font-headline-lg text-headline-lg text-on-background text-center mb-12">What We Believe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            { icon: 'menu_book', title: 'The Bible', desc: 'We believe the Bible is the inspired, infallible, and authoritative Word of God.' },
            { icon: 'favorite', title: 'God is Love', desc: 'We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit.' },
            { icon: 'self_improvement', title: 'Salvation by Grace', desc: 'We believe salvation is a free gift of God, received by faith in Jesus Christ alone.' },
          ].map((b) => (
            <div key={b.title} className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20">
              <div className="w-14 h-14 bg-primary-container rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-primary-container text-3xl fill">{b.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-3">{b.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-section-gap">
        <h2 className="font-headline-lg text-headline-lg text-on-background text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {[
            { name: 'Pastor John Doe', role: 'Senior Pastor', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
            { name: 'Pastor Jane Smith', role: 'Teaching Pastor', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
            { name: 'David Chen', role: 'Worship Director', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
            { name: 'Dr. Sarah Jenkins', role: 'Discipleship Lead', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
          ].map((p) => (
            <div key={p.name} className="text-center group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-surface-container">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background">{p.name}</h3>
              <p className="font-body-md text-body-md text-primary">{p.role}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-on-background rounded-xl p-8 md:p-16 text-center relative overflow-hidden">
        <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-4">Join Us This Sunday</h2>
        <p className="font-body-lg text-body-lg text-surface-variant/80 mb-8 max-w-xl mx-auto">
          We'd love to meet you. Come as you are — there's a place for you at Mt Zion Cheese.
        </p>
        <Link to="/contact" className="inline-block bg-primary-container text-on-primary-container font-button text-button px-8 py-3 rounded hover:bg-primary-container/90 transition-colors">
          Plan Your Visit
        </Link>
      </div>
    </div>
  )
}
