import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-on-background w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="flex flex-col gap-6 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <img src="/Kenya Assemblies of God.jpeg" alt="Mt Zion Cheese KAG Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-headline-md text-headline-md text-surface-bright font-bold">Mt Zion Cheese</span>
          </Link>
          <p className="font-body-md text-body-md text-tertiary-fixed-dim/80 max-w-xs">
            A place to know Christ, grow in faith, and serve others. Join us as we journey together.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-tertiary-fixed-dim/80 hover:text-primary-fixed transition-colors">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a href="#" className="text-tertiary-fixed-dim/80 hover:text-primary-fixed transition-colors">
              <span className="material-symbols-outlined fill">play_circle</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-caps text-label-caps text-surface-bright tracking-widest uppercase mb-2">Connect</h4>
          <Link to="/contact" className="font-body-md text-body-md text-tertiary-fixed-dim/80 hover:text-primary-fixed w-fit opacity-80 hover:opacity-100 transition-all">
            Contact
          </Link>
          <Link to="/events" className="font-body-md text-body-md text-tertiary-fixed-dim/80 hover:text-primary-fixed w-fit opacity-80 hover:opacity-100 transition-all">
            Events
          </Link>
          <a href="#" className="font-body-md text-body-md text-tertiary-fixed-dim/80 hover:text-primary-fixed w-fit opacity-80 hover:opacity-100 transition-all">
            Volunteer
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-caps text-label-caps text-surface-bright tracking-widest uppercase mb-2">Grow</h4>
          <Link to="/sermons" className="font-body-md text-body-md text-tertiary-fixed-dim/80 hover:text-primary-fixed w-fit opacity-80 hover:opacity-100 transition-all">
            Sermons
          </Link>
          <Link to="/resources" className="font-body-md text-body-md text-tertiary-fixed-dim/80 hover:text-primary-fixed w-fit opacity-80 hover:opacity-100 transition-all">
            Resources
          </Link>
          <Link to="/growth" className="font-body-md text-body-md text-tertiary-fixed-dim/80 hover:text-primary-fixed w-fit opacity-80 hover:opacity-100 transition-all">
            Growth Journey
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-caps text-label-caps text-surface-bright tracking-widest uppercase mb-2">Visit Us</h4>
          <p className="font-body-md text-body-md text-tertiary-fixed-dim/80 flex items-start gap-2">
            <span className="material-symbols-outlined text-[20px] mt-0.5">location_on</span>
            1234 Grace Avenue<br />Sanctuary City, ST 12345
          </p>
          <p className="font-body-md text-body-md text-tertiary-fixed-dim/80 flex items-center gap-2 mt-2">
            <span className="material-symbols-outlined text-[20px]">mail</span>
            hello@gracepoint.org
          </p>
          <a href="#" className="font-body-md text-body-md text-tertiary-fixed-dim/80 hover:text-primary-fixed w-fit opacity-80 hover:opacity-100 transition-all mt-4">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="w-full border-t border-outline/10 py-6 px-margin-desktop text-center">
        <p className="font-body-md text-body-md text-tertiary-fixed-dim/50 text-sm">
          © 2024 Mt Zion Cheese KAG. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
