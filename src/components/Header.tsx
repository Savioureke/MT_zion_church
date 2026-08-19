import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/sermons', label: 'Sermons' },
  { to: '/watch', label: 'Watch' },
  { to: '/gospel', label: 'Read' },
  { to: '/resources', label: 'Resources' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const triggerInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice
      if (outcome === 'accepted') {
        setInstallPrompt(null)
      }
    }
  }

  return (
    <header
      className={`bg-background border-b border-outline-variant/20 w-full z-50 sticky top-0 transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary text-[28px] fill">church</span>
          <span className="font-headline-md text-headline-md font-bold text-primary">GracePoint Hub</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-button text-button transition-colors duration-200 ${
                  isActive
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/growth" className="font-button text-button text-primary hover:text-primary/80 transition-colors">
            Growth Journey
          </Link>
          <Link
            to="/salvation"
            className="bg-primary text-on-primary font-button text-button px-6 py-2.5 rounded hover:bg-primary/90 transition-colors"
          >
            Give Your Life to Christ
          </Link>
          <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-4 ml-2">
            <Link to="/events" className="text-on-surface-variant hover:text-primary transition-colors" title="Prayer & Events">
              <span className="material-symbols-outlined">volunteer_activism</span>
            </Link>
            <Link to="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors" title="My Account">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
            {installPrompt && (
              <button
                onClick={triggerInstall}
                className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-button font-medium px-3 py-1.5 rounded-full hover:bg-primary/20 transition-all"
                title="Install GracePoint App"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Install App</span>
              </button>
            )}
          </div>
        </div>

        <button
          className="lg:hidden text-on-surface-variant hover:text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-outline-variant/20 px-margin-mobile py-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-button text-button py-2 ${
                    isActive ? 'text-primary' : 'text-on-surface-variant'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 space-y-3 border-t border-outline-variant/20">
              <Link to="/growth" className="block font-button text-button text-primary py-2">
                Growth Journey
              </Link>
              <Link
                to="/salvation"
                className="block bg-primary text-on-primary font-button text-button px-6 py-3 rounded text-center"
              >
                Give Your Life to Christ
              </Link>
              {installPrompt && (
                <button
                  onClick={triggerInstall}
                  className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-button text-button px-6 py-3 rounded text-center"
                >
                  <span className="material-symbols-outlined">download</span>
                  Install GracePoint App
                </button>
              )}
              <Link to="/dashboard" className="block font-button text-button text-on-surface-variant py-2">
                My Account
              </Link>
              <Link to="/events" className="block font-button text-button text-on-surface-variant py-2">
                Prayer & Events
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
