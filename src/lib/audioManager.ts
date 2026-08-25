export interface TrackInfo {
  title: string
  speaker?: string
  audioUrl?: string
  img?: string
}

type AudioListener = (track: TrackInfo | null) => void

let currentTrack: TrackInfo | null = null
const listeners: Set<AudioListener> = new Set()

export function playAudioTrack(track: TrackInfo) {
  currentTrack = track
  listeners.forEach((listener) => listener(currentTrack))
}

export function stopAudioTrack() {
  currentTrack = null
  listeners.forEach((listener) => listener(null))
}

export function getCurrentTrack(): TrackInfo | null {
  return currentTrack
}

export function subscribeAudioTrack(listener: AudioListener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
