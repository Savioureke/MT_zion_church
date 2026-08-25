import { useState, useEffect } from 'react'

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [showRestored, setShowRestored] = useState(false)

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true)
      setShowRestored(false)
    }

    const handleOnline = () => {
      setIsOffline(false)
      setShowRestored(true)
      const timer = setTimeout(() => setShowRestored(false), 4000)
      return () => clearTimeout(timer)
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  if (!isOffline && !showRestored) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center p-2">
      {isOffline && (
        <div className="pointer-events-auto bg-amber-600 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce-short">
          <span className="material-symbols-outlined text-sm">wifi_off</span>
          <span>You are offline — Mt Zion Cheese is serving cached content for all sections.</span>
        </div>
      )}

      {showRestored && (
        <div className="pointer-events-auto bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-sm">wifi</span>
          <span>Connection restored — Mt Zion Cheese is online.</span>
        </div>
      )}
    </div>
  )
}
