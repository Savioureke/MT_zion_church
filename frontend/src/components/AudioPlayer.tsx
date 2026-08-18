export default function AudioPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-inverse-surface text-inverse-on-surface h-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 flex flex-col justify-center px-4 md:px-margin-desktop border-t border-outline/20">
      <div className="max-w-container-max w-full mx-auto flex items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-4 flex-shrink-0 w-1/4 min-w-[200px]">
          <div className="hidden md:block w-12 h-12 bg-surface-container-high rounded overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-container to-primary">
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container fill">music_note</span>
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="font-button text-button text-inverse-on-surface truncate">Walking on Water: Trusting the Unseen</p>
            <p className="font-body-md text-sm text-surface-dim truncate">Pastor John Doe</p>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center max-w-2xl">
          <div className="flex items-center gap-6 mb-1">
            <button className="text-surface-dim hover:text-inverse-on-surface transition-colors">
              <span className="material-symbols-outlined">replay_10</span>
            </button>
            <button className="text-primary-fixed hover:text-primary-fixed-dim transition-colors scale-125">
              <span className="material-symbols-outlined fill text-3xl">play_circle</span>
            </button>
            <button className="text-surface-dim hover:text-inverse-on-surface transition-colors">
              <span className="material-symbols-outlined">forward_10</span>
            </button>
          </div>
          <div className="w-full flex items-center gap-3 text-xs font-body-md text-surface-dim">
            <span>12:04</span>
            <div className="flex-grow h-1 bg-tertiary-container/30 rounded-full overflow-hidden cursor-pointer relative group">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-primary-fixed rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-2 h-2 bg-inverse-on-surface rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span>45:20</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0 w-1/4 justify-end">
          <button className="text-surface-dim hover:text-inverse-on-surface transition-colors font-button text-xs px-2 py-1 border border-surface-dim/50 rounded">1x</button>
          <div className="flex items-center gap-2 group">
            <button className="text-surface-dim hover:text-inverse-on-surface transition-colors">
              <span className="material-symbols-outlined text-xl">volume_up</span>
            </button>
            <div className="w-16 h-1 bg-tertiary-container/30 rounded-full overflow-hidden hidden md:block">
              <div className="h-full w-3/4 bg-surface-dim"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
