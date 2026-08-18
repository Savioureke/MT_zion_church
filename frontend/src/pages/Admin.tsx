import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ContentItem {
  id: string
  title: string
  type: 'Video' | 'PDF' | 'Audio'
  status: 'Published' | 'Draft'
  date: string
}

interface PrayerReq {
  id: string
  name: string
  email: string
  request: string
  date: string
  status: string
}

interface SalvationResp {
  id: string
  choice: string
  date: string
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [contentList, setContentList] = useState<ContentItem[]>([
    { id: '1', title: 'The Power of Grace', type: 'Video', status: 'Published', date: 'Oct 24, 2024' },
    { id: '2', title: 'Study Guide: Romans 8', type: 'PDF', status: 'Published', date: 'Oct 22, 2024' },
    { id: '3', title: 'Sunday Service Audio', type: 'Audio', status: 'Draft', date: 'Oct 20, 2024' },
    { id: '4', title: 'Walking on Water Sermon', type: 'Audio', status: 'Published', date: 'Oct 15, 2024' },
  ])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newType, setNewType] = useState<'Video' | 'PDF' | 'Audio'>('Video')

  const [prayers, setPrayers] = useState<PrayerReq[]>([])
  const [salvations, setSalvations] = useState<SalvationResp[]>([])

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem('prayer_requests') || '[]')
    const s = JSON.parse(localStorage.getItem('salvation_responses') || '[]')
    setPrayers(p)
    setSalvations(s)
  }, [])

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: newTitle,
      type: newType,
      status: 'Published',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    setContentList([newItem, ...contentList])
    setNewTitle('')
    setShowUploadModal(false)
  }

  const toggleStatus = (id: string) => {
    setContentList(
      contentList.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Published' ? 'Draft' : 'Published' }
          : item
      )
    )
  }

  const deleteContent = (id: string) => {
    setContentList(contentList.filter((item) => item.id !== id))
  }

  return (
    <div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden">
      {/* Sidebar Navigation (Admin) */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col h-full flex-shrink-0 z-20 hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
          <div>
            <Link to="/" className="font-headline-md text-headline-md font-bold text-primary block">
              GracePoint Hub
            </Link>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-1 tracking-widest text-[10px]">
              ADMINISTRATION
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {[
            { id: 'Dashboard', icon: 'dashboard', label: 'Dashboard' },
            { id: 'Sermons', icon: 'menu_book', label: 'Sermons' },
            { id: 'Videos', icon: 'video_library', label: 'Videos' },
            { id: 'Resources', icon: 'folder', label: 'Resources' },
            { id: 'Salvation', icon: 'church', label: 'Salvation Responses' },
            { id: 'Lessons', icon: 'school', label: 'Lessons' },
            { id: 'Events', icon: 'event', label: 'Events' },
            { id: 'Prayer', icon: 'folded_hands', label: 'Prayer Requests' },
            { id: 'Users', icon: 'group', label: 'Users' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-button text-button transition-colors ${
                activeTab === item.id
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div>
                <p className="font-button text-button text-on-surface">Admin User</p>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Super Admin</p>
              </div>
            </div>
            <Link to="/" className="text-on-surface-variant hover:text-primary" title="Back to Main Website">
              <span className="material-symbols-outlined text-xl">open_in_new</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        {/* Top Header */}
        <header className="bg-surface-container-lowest border-b border-outline-variant/20 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface">{activeTab} Overview</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search resources, users..."
                className="pl-9 pr-4 py-2 bg-surface-container border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-sm font-body-md w-64 rounded-t transition-colors"
              />
            </div>
            <Link to="/" className="font-button text-sm bg-primary/10 text-primary px-3 py-1.5 rounded hover:bg-primary/20">
              Exit Admin
            </Link>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-container-max mx-auto space-y-8">
            {/* Quick Stats Bento Grid */}
            <section>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 tracking-widest">
                MINISTRY HEALTH METRICS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">group</span>
                    </div>
                    <span className="text-xs font-button text-[#2E7D32] bg-[#E8F5E9] px-2 py-1 rounded">
                      +12% this week
                    </span>
                  </div>
                  <div>
                    <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface mb-1">1,248</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Active Members</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined">folded_hands</span>
                    </div>
                    <span className="text-xs font-button text-[#2E7D32] bg-[#E8F5E9] px-2 py-1 rounded">
                      {prayers.length || 8} active
                    </span>
                  </div>
                  <div>
                    <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface mb-1">
                      {prayers.length || 42}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Prayer Requests</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                      <span className="material-symbols-outlined">favorite</span>
                    </div>
                    <span className="text-xs font-button text-primary bg-primary-container/20 px-2 py-1 rounded">
                      Needs Follow-up
                    </span>
                  </div>
                  <div>
                    <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface mb-1">
                      {salvations.length || 15}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Salvation Responses</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined">play_circle</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface mb-1">8.5k</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Sermon Plays</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Content Table & Attention Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Content Table (Spans 2 cols) */}
              <section className="lg:col-span-2">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
                    CONTENT MANAGEMENT
                  </h3>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-primary text-on-primary px-4 py-2 rounded font-button text-button flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Upload New Content
                  </button>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="py-3.5 px-4 font-label-caps text-label-caps text-on-surface-variant font-medium">Title</th>
                        <th className="py-3.5 px-4 font-label-caps text-label-caps text-on-surface-variant font-medium">Type</th>
                        <th className="py-3.5 px-4 font-label-caps text-label-caps text-on-surface-variant font-medium">Status</th>
                        <th className="py-3.5 px-4 font-label-caps text-label-caps text-on-surface-variant font-medium">Date</th>
                        <th className="py-3.5 px-4 font-label-caps text-label-caps text-on-surface-variant font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentList.map((item) => (
                        <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                          <td className="py-3.5 px-4 font-body-md text-body-md text-on-surface font-semibold">{item.title}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 text-xs font-button text-on-surface-variant bg-surface-variant px-2.5 py-1 rounded">
                              <span className="material-symbols-outlined text-[14px]">
                                {item.type === 'Video' ? 'video_file' : item.type === 'PDF' ? 'picture_as_pdf' : 'audio_file'}
                              </span>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => toggleStatus(item.id)}
                              className={`text-xs font-button flex items-center gap-1.5 px-2.5 py-1 rounded ${
                                item.status === 'Published'
                                  ? 'text-[#2E7D32] bg-[#E8F5E9]'
                                  : 'text-[#F57C00] bg-[#FFF3E0]'
                              }`}
                            >
                              <span className={`w-2 h-2 rounded-full ${item.status === 'Published' ? 'bg-[#2E7D32]' : 'bg-[#F57C00]'}`} />
                              {item.status}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 font-body-md text-sm text-on-surface-variant">{item.date}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => deleteContent(item.id)}
                              className="text-error hover:text-error/80 transition-colors p-1"
                              title="Delete Content"
                            >
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Attention Needed Sidebar */}
              <section>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 tracking-widest">
                  ATTENTION NEEDED
                </h3>
                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 space-y-4 shadow-sm">
                  {salvations.length > 0 ? (
                    <div className="flex gap-4 items-start pb-4 border-b border-outline-variant/10">
                      <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </div>
                      <div>
                        <p className="font-button text-button text-on-surface">{salvations.length} Salvation Decision Responses</p>
                        <p className="font-body-md text-sm text-on-surface-variant mt-1">
                          Latest: "{salvations[0]?.choice}" on {salvations[0]?.date}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4 items-start pb-4 border-b border-outline-variant/10">
                      <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </div>
                      <div>
                        <p className="font-button text-button text-on-surface">3 Salvation Follow-ups Required</p>
                        <p className="font-body-md text-sm text-on-surface-variant mt-1">Requires pastoral contact after Sunday service.</p>
                      </div>
                    </div>
                  )}

                  {prayers.length > 0 ? (
                    <div className="flex gap-4 items-start pb-4 border-b border-outline-variant/10">
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant mt-1 flex-shrink-0">
                        <span className="material-symbols-outlined text-[18px]">folded_hands</span>
                      </div>
                      <div>
                        <p className="font-button text-button text-on-surface">New Prayer Request from {prayers[0].name}</p>
                        <p className="font-body-md text-sm text-on-surface-variant mt-1">"{prayers[0].request}"</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4 items-start pb-4 border-b border-outline-variant/10">
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant mt-1 flex-shrink-0">
                        <span className="material-symbols-outlined text-[18px]">folded_hands</span>
                      </div>
                      <div>
                        <p className="font-button text-button text-on-surface">Urgent Prayer Request</p>
                        <p className="font-body-md text-sm text-on-surface-variant mt-1">Submitted regarding upcoming family surgery.</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant mt-1 flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">event</span>
                    </div>
                    <div>
                      <p className="font-button text-button text-on-surface">Event Approval Pending</p>
                      <p className="font-body-md text-sm text-on-surface-variant mt-1">Youth Ministry Retreat requires final sign-off.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Content Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h3 className="font-headline-md text-headline-md text-on-background">Upload New Content</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 block">Content Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Walking in Grace Sermon"
                  className="w-full bg-surface border border-outline-variant/40 rounded p-3 text-sm text-on-background outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 block">Media Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-surface border border-outline-variant/40 rounded p-3 text-sm text-on-background outline-none focus:border-primary"
                >
                  <option value="Video">Video</option>
                  <option value="Audio">Audio</option>
                  <option value="PDF">PDF / Document</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="font-button text-sm border border-outline-variant px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="font-button text-sm bg-primary text-on-primary px-6 py-2 rounded hover:bg-primary/90">
                  Publish Content
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
