import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-24">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="font-label-caps text-label-caps text-primary tracking-[0.15em] uppercase mb-4 block">Get In Touch</span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6">
          We'd Love to Hear From You
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Have questions, need prayer, or want to visit us this Sunday? Send us a message and our team will get back to you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start mb-section-gap">
        {/* Contact Form (Cols 1-7) */}
        <div className="lg:col-span-7 bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 md:p-12">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-6">Send a Message</h2>
          {sent ? (
            <div className="bg-surface p-8 rounded text-center border border-primary/30 space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">mark_email_read</span>
              <h3 className="font-headline-md text-headline-md text-on-background">Message Sent!</h3>
              <p className="font-body-md text-on-surface-variant">
                Thank you for reaching out to Mt Zion Cheese KAG. We have received your message and will respond shortly.
              </p>
              <button
                onClick={() => {
                  setSent(false)
                  setName('')
                  setEmail('')
                  setSubject('')
                  setMessage('')
                }}
                className="font-button text-button bg-primary text-on-primary px-6 py-2.5 rounded hover:bg-primary/90 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="cname" className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                    Your Name
                  </label>
                  <input
                    id="cname"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-surface border border-outline-variant/40 rounded p-3 font-body-md text-on-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="cemail" className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                    Email Address
                  </label>
                  <input
                    id="cemail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="bg-surface border border-outline-variant/40 rounded p-3 font-body-md text-on-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="csub" className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                  Subject
                </label>
                <input
                  id="csub"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Sunday Service / Prayer Request / General Enquiry"
                  className="bg-surface border border-outline-variant/40 rounded p-3 font-body-md text-on-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cmsg" className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                  Your Message
                </label>
                <textarea
                  id="cmsg"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we serve or pray for you today?"
                  className="bg-surface border border-outline-variant/40 rounded p-3 font-body-md text-on-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-on-primary font-button text-button py-3.5 px-8 rounded hover:bg-primary/90 transition-colors self-start"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Info & Map (Cols 8-12) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-surface p-8 rounded-xl border border-outline-variant/20 space-y-6">
            <h2 className="font-headline-md text-headline-md text-on-background">Church Information</h2>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h3 className="font-button text-button text-on-background">Sanctuary Address</h3>
                <p className="font-body-md text-on-surface-variant">1234 Grace Avenue<br />Sanctuary City, ST 12345</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <h3 className="font-button text-button text-on-background">Service Times</h3>
                <p className="font-body-md text-on-surface-variant">Sundays: 9:00 AM & 11:00 AM<br />Wednesdays: 7:00 PM Bible Study</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <h3 className="font-button text-button text-on-background">Email & Phone</h3>
                <p className="font-body-md text-on-surface-variant">hello@gracepoint.org<br />+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md text-on-background mb-4">Location Preview</h3>
            <div className="h-48 bg-surface-container-high rounded-lg overflow-hidden relative flex items-center justify-center border border-outline-variant/30">
              <img src="/images/hero_sunset.jpg" alt="Map" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-on-background/30 flex flex-col items-center justify-center text-white">
                <span className="material-symbols-outlined text-4xl text-primary-fixed">church</span>
                <span className="font-button text-sm mt-1">Mt Zion Cheese</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
