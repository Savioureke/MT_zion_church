import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already running standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Check if user dismissed previously in this session
      const dismissed = sessionStorage.getItem('pwa_prompt_dismissed')
      if (!dismissed) {
        setShowPrompt(true)
      }
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
      console.log('Mt Zion Cheese PWA installed successfully')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const choiceResult = await deferredPrompt.userChoice

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA install prompt')
    } else {
      console.log('User dismissed the PWA install prompt')
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    sessionStorage.setItem('pwa_prompt_dismissed', 'true')
  }

  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-50 animate-slide-up">
      <div className="bg-surface-container-highest border border-primary/20 rounded-xl p-4 shadow-2xl backdrop-blur-md flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-inner flex-shrink-0 overflow-hidden">
              <img src="/Kenya Assemblies of God.jpeg" alt="Mt Zion Cheese Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">Install Mt Zion Cheese</h4>
              <p className="text-xs text-on-surface-variant leading-snug mt-0.5">
                Install as an app for fast offline access to sermons, devotionals & growth guides.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-1"
            aria-label="Dismiss"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1 border-t border-outline-variant/20">
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 text-xs font-button text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Not Now
          </button>
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 text-xs font-button bg-primary text-on-primary font-semibold rounded-lg shadow hover:bg-primary/90 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Install App
          </button>
        </div>
      </div>
    </div>
  )
}
