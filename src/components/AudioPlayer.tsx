import { useState, useEffect, useRef } from 'react'
import { subscribeAudioTrack, stopAudioTrack, TrackInfo } from '../lib/audioManager'

export default function AudioPlayer() {
  const [track, setTrack] = useState<TrackInfo | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeAudioTrack((newTrack) => {
      setTrack(newTrack)
      if (newTrack) {
        setIsPlaying(true)
        setCurrentTime(0)
      } else {
        setIsPlaying(false)
      }
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, track])

  if (!track) return null // Hide completely if no audio recording is playing!

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration || 0)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-on-background text-surface-bright h-20 shadow-2xl z-50 flex flex-col justify-center px-4 md:px-margin-desktop border-t border-outline/30 animate-slide-up">
      {track.audioUrl && (
        <audio
          ref={audioRef}
          src={track.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <div className="max-w-container-max w-full mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Track info */}
        <div className="flex items-center gap-3 flex-shrink-0 w-1/4 min-w-[180px]">
          <div className="w-10 h-10 bg-primary rounded overflow-hidden flex-shrink-0">
            <img
              src={track.img || '/Kenya Assemblies of God.jpeg'}
              alt={track.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="overflow-hidden">
            <p className="font-button text-xs font-bold text-surface-bright truncate">{track.title}</p>
            <p className="font-body-md text-[11px] text-surface-variant/70 truncate">{track.speaker || 'Mt Zion Cheese'}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex-grow flex flex-col items-center justify-center max-w-xl">
          <div className="flex items-center gap-4 mb-1">
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime -= 10
              }}
              className="text-surface-variant hover:text-surface-bright transition-colors"
            >
              <span className="material-symbols-outlined text-lg">replay_10</span>
            </button>
            <button
              onClick={togglePlay}
              className="text-primary-fixed hover:scale-110 transition-transform"
            >
              <span className="material-symbols-outlined fill text-3xl">
                {isPlaying ? 'pause_circle' : 'play_circle'}
              </span>
            </button>
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime += 10
              }}
              className="text-surface-variant hover:text-surface-bright transition-colors"
            >
              <span className="material-symbols-outlined text-lg">forward_10</span>
            </button>
          </div>

          <div className="w-full flex items-center gap-3 text-[11px] font-body-md text-surface-variant/80">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow h-1 accent-primary bg-outline/30 rounded cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex items-center gap-3 flex-shrink-0 justify-end">
          <button
            onClick={() => stopAudioTrack()}
            className="text-surface-variant hover:text-surface-bright p-1"
            title="Close Audio Player"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>
    </div>
  )
}
