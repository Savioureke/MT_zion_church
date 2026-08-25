import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  supabase,
  uploadFileToSupabase,
  extractYouTubeId,
  verifyAdminCredentials,
  MediaItem,
  SermonItem,
  PostItem,
  EventItemDB
} from '../lib/supabase'

export default function Admin() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('admin_authenticated') === 'true'
  })
  const [loginEmail, setLoginEmail] = useState('admin@kagmtzion.org')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Navigation State
  const [activeTab, setActiveTab] = useState('Dashboard')

  // Dynamic Data Lists
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [sermonItems, setSermonItems] = useState<SermonItem[]>([])
  const [postItems, setPostItems] = useState<PostItem[]>([])
  const [eventItems, setEventItems] = useState<EventItemDB[]>([])
  const [prayers, setPrayers] = useState<any[]>([])
  const [salvations, setSalvations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Upload / Create Modal State
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [contentType, setContentType] = useState<'video' | 'audio' | 'post' | 'document' | 'event'>('video')
  
  // Form Fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Evangelism')
  const [speaker, setSpeaker] = useState('Rev. Dr. Joseph Mutua')
  const [series, setSeries] = useState('Unstoppable Kingdom')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [author, setAuthor] = useState('Pastoral Team')
  const [location, setLocation] = useState('Mt Zion Cheese Main Sanctuary')
  const [eventDate, setEventDate] = useState('')

  // Selected Uploaded Files
  const [selectedMediaFile, setSelectedMediaFile] = useState<File | null>(null)
  const [selectedThumbFile, setSelectedThumbFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgressMsg, setUploadProgressMsg] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const { data: mediaData } = await supabase.from('media').select('*').order('created_at', { ascending: false })
      if (mediaData) setMediaItems(mediaData)

      const { data: sermonsData } = await supabase.from('sermons').select('*').order('created_at', { ascending: false })
      if (sermonsData) setSermonItems(sermonsData)

      const { data: postsData } = await supabase.from('teaching_articles').select('*').order('created_at', { ascending: false })
      if (postsData) setPostItems(postsData)

      const { data: eventsData } = await supabase.from('events').select('*').order('created_at', { ascending: false })
      if (eventsData) setEventItems(eventsData)

      const p = JSON.parse(localStorage.getItem('prayer_requests') || '[]')
      const s = JSON.parse(localStorage.getItem('salvation_responses') || '[]')
      setPrayers(p)
      setSalvations(s)
    } catch (err) {
      console.error('Error fetching admin data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError('')

    const isValid = await verifyAdminCredentials(loginEmail, loginPassword)
    if (isValid) {
      localStorage.setItem('admin_authenticated', 'true')
      setIsAuthenticated(true)
    } else {
      setLoginError('Invalid email or password. Default login: admin@kagmtzion.org / admin123')
    }
    setIsLoggingIn(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsUploading(true)
    setUploadProgressMsg('Processing publication to Supabase...')

    try {
      let uploadedMediaUrl = ''
      let uploadedThumbUrl = ''

      if (selectedMediaFile) {
        setUploadProgressMsg(`Uploading ${selectedMediaFile.name} from device to Supabase...`)
        uploadedMediaUrl = await uploadFileToSupabase(selectedMediaFile, contentType)
      }

      if (selectedThumbFile) {
        setUploadProgressMsg(`Uploading thumbnail image from device...`)
        uploadedThumbUrl = await uploadFileToSupabase(selectedThumbFile, 'thumbnails')
      }

      if (contentType === 'video') {
        const ytId = extractYouTubeId(youtubeUrl)
        const finalUrl = uploadedMediaUrl || youtubeUrl
        const finalThumb = uploadedThumbUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '/images/watch_live_stage.jpg')

        const newMediaRecord: MediaItem = {
          title,
          description,
          type: 'video',
          provider: uploadedMediaUrl ? 'uploaded' : 'youtube',
          external_url: finalUrl,
          external_id: ytId || undefined,
          thumbnail_url: finalThumb,
          speaker,
          category,
          series,
          section_destinations: ['home', 'sermons', 'watch'],
          published: true,
          featured: true
        }

        const { data, error } = await supabase.from('media').insert(newMediaRecord).select().single()
        if (error) throw error
        if (data) setMediaItems([data, ...mediaItems])

        await supabase.from('sermons').insert({
          media_id: data?.id,
          title,
          description,
          speaker,
          category,
          series,
          video_url: finalUrl,
          thumbnail_url: finalThumb,
          published: true
        })

      } else if (contentType === 'audio') {
        const finalAudioUrl = uploadedMediaUrl || youtubeUrl
        const finalThumb = uploadedThumbUrl || '/images/sermon_bible.jpg'

        const newAudioRecord: MediaItem = {
          title,
          description,
          type: 'audio',
          provider: uploadedMediaUrl ? 'uploaded' : 'direct',
          external_url: finalAudioUrl,
          thumbnail_url: finalThumb,
          speaker,
          category,
          series,
          section_destinations: ['sermons', 'home', 'resources'],
          published: true
        }

        const { data, error } = await supabase.from('media').insert(newAudioRecord).select().single()
        if (error) throw error
        if (data) setMediaItems([data, ...mediaItems])

        await supabase.from('sermons').insert({
          media_id: data?.id,
          title,
          description,
          speaker,
          category,
          series,
          audio_url: finalAudioUrl,
          thumbnail_url: finalThumb,
          published: true
        })

      } else if (contentType === 'document') {
        const finalDocUrl = uploadedMediaUrl || youtubeUrl

        const newDocRecord: MediaItem = {
          title,
          description,
          type: 'pdf',
          provider: 'uploaded',
          external_url: finalDocUrl,
          thumbnail_url: uploadedThumbUrl || '/images/gospel_ancient_book.jpg',
          category,
          section_destinations: ['resources'],
          published: true
        }

        const { data, error } = await supabase.from('media').insert(newDocRecord).select().single()
        if (error) throw error
        if (data) setMediaItems([data, ...mediaItems])

      } else if (contentType === 'post') {
        const newPost: PostItem = {
          title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          excerpt: description.substring(0, 150),
          content: description,
          author,
          category,
          cover_image_url: uploadedThumbUrl || '/images/gospel_ancient_book.jpg',
          published: true
        }

        const { data, error } = await supabase.from('teaching_articles').insert(newPost).select().single()
        if (error) throw error
        if (data) setPostItems([data, ...postItems])

      } else if (contentType === 'event') {
        const newEvent: EventItemDB = {
          title,
          description,
          event_date: eventDate || new Date().toISOString(),
          location,
          image_url: uploadedThumbUrl || '/images/event_worship.jpg',
          category,
          published: true
        }

        const { data, error } = await supabase.from('events').insert(newEvent).select().single()
        if (error) throw error
        if (data) setEventItems([data, ...eventItems])
      }

      setTitle('')
      setDescription('')
      setYoutubeUrl('')
      setSelectedMediaFile(null)
      setSelectedThumbFile(null)
      setShowUploadModal(false)
      fetchData()
    } catch (err: any) {
      alert('Error publishing content: ' + err.message)
    } finally {
      setIsUploading(false)
      setUploadProgressMsg('')
    }
  }

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return
    await supabase.from('media').delete().eq('id', id)
    setMediaItems(mediaItems.filter((m) => m.id !== id))
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    await supabase.from('teaching_articles').delete().eq('id', id)
    setPostItems(postItems.filter((p) => p.id !== id))
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    await supabase.from('events').delete().eq('id', id)
    setEventItems(eventItems.filter((e) => e.id !== id))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
        <div className="bg-surface-container-low border border-outline-variant/30 p-8 md:p-10 rounded-xl max-w-md w-full shadow-xl">
          <div className="flex flex-col items-center text-center mb-8">
            <img src="/Kenya Assemblies of God.jpeg" alt="Mt Zion Cheese Logo" className="w-16 h-16 rounded-full mb-3 shadow" />
            <h1 className="font-headline-lg text-headline-lg text-on-background font-bold">Mt Zion Cheese</h1>
            <p className="font-label-caps text-xs text-primary tracking-widest uppercase mt-1">Admin Portal Sign In</p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3.5 mb-6 text-xs text-on-surface leading-relaxed">
            <p className="font-semibold text-primary mb-1">🔐 Supabase Backend Connected</p>
            <p><strong>Email:</strong> admin@kagmtzion.org</p>
            <p><strong>Password:</strong> admin123</p>
          </div>

          {loginError && (
            <div className="bg-error-container text-on-error-container text-xs p-3 rounded mb-4">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-button text-xs text-on-surface-variant mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-surface border border-outline-variant/40 rounded p-3 text-sm focus:border-primary outline-none"
                placeholder="admin@kagmtzion.org"
              />
            </div>
            <div>
              <label className="block font-button text-xs text-on-surface-variant mb-1">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-surface border border-outline-variant/40 rounded p-3 text-sm focus:border-primary outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-primary text-on-primary font-button py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow"
            >
              {isLoggingIn ? 'Verifying...' : 'Sign In to Admin Portal'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs font-button text-primary hover:underline">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden">
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col h-full flex-shrink-0 z-20 hidden md:flex shadow-sm">
        <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/Kenya Assemblies of God.jpeg" alt="Logo" className="w-9 h-9 rounded-full" />
            <div>
              <Link to="/" className="font-headline-md text-headline-md font-bold text-primary block leading-tight">
                Mt Zion Cheese
              </Link>
              <p className="font-label-caps text-on-surface-variant tracking-widest text-[9px] uppercase">
                Admin Management
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {[
            { id: 'Dashboard', icon: 'dashboard', label: 'Dashboard' },
            { id: 'Videos', icon: 'video_library', label: 'Videos (Watch)' },
            { id: 'Audio', icon: 'headphones', label: 'Audio & Sermons' },
            { id: 'Posts', icon: 'article', label: 'Posts & Teachings (Read)' },
            { id: 'Resources', icon: 'folder', label: 'PDFs & Resources' },
            { id: 'Events', icon: 'event', label: 'Events' },
            { id: 'Prayer', icon: 'folded_hands', label: 'Prayer Requests' },
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div>
                <p className="font-button text-xs text-on-surface font-semibold">Admin Team</p>
                <p className="font-label-caps text-[9px] text-on-surface-variant">Connected to Supabase</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-error hover:bg-error/10 p-1.5 rounded transition-colors"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        <header className="bg-surface-container-lowest border-b border-outline-variant/20 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">{activeTab} Management</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-button text-xs flex items-center gap-2 hover:bg-primary/90 shadow transition-all font-semibold"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Post Media / Content
            </button>
            <Link to="/" className="font-button text-xs bg-surface-container text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-container-high">
              View Website ↗
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/20 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-button text-on-surface-variant">Videos & Media</span>
                <span className="material-symbols-outlined text-primary">video_library</span>
              </div>
              <p className="text-2xl font-bold text-on-surface">{mediaItems.filter(m => m.type === 'video').length}</p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/20 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-button text-on-surface-variant">Sermons & Audio</span>
                <span className="material-symbols-outlined text-primary">headphones</span>
              </div>
              <p className="text-2xl font-bold text-on-surface">{sermonItems.length}</p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/20 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-button text-on-surface-variant">Posts & Teachings</span>
                <span className="material-symbols-outlined text-primary">article</span>
              </div>
              <p className="text-2xl font-bold text-on-surface">{postItems.length}</p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/20 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-button text-on-surface-variant">PDFs & Documents</span>
                <span className="material-symbols-outlined text-primary">folder</span>
              </div>
              <p className="text-2xl font-bold text-on-surface">{mediaItems.filter(m => m.type === 'pdf' || m.type === 'document').length}</p>
            </div>
          </section>

          {(activeTab === 'Dashboard' || activeTab === 'Videos' || activeTab === 'Audio' || activeTab === 'Resources') && (
            <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-base text-on-surface font-bold">Uploaded Media & Resources</h3>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="text-xs text-primary font-button hover:underline flex items-center gap-1 font-bold"
                >
                  + Add New Media / File
                </button>
              </div>

              {mediaItems.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic py-4">No media uploaded yet. Click "Post Media" above to add videos, audio, or PDFs.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediaItems.map((m) => (
                    <div key={m.id} className="border border-outline-variant/30 rounded-lg overflow-hidden flex flex-col bg-surface">
                      <div className="h-40 bg-surface-variant relative">
                        <img src={m.thumbnail_url || '/images/watch_live_stage.jpg'} alt={m.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-primary text-on-primary font-label-caps text-[10px] px-2 py-0.5 rounded uppercase">
                          {m.type} • {m.provider}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-button font-bold text-on-surface text-sm line-clamp-1">{m.title}</h4>
                          <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{m.description || 'No description provided.'}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/20 text-xs">
                          <span className="text-on-surface-variant font-medium">{m.speaker || 'Admin'}</span>
                          <button
                            onClick={() => m.id && handleDeleteMedia(m.id)}
                            className="text-error hover:underline text-xs font-button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {(activeTab === 'Dashboard' || activeTab === 'Posts') && (
            <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-base text-on-surface font-bold">Posts & Gospel Teachings</h3>
                <button
                  onClick={() => { setContentType('post'); setShowUploadModal(true); }}
                  className="text-xs text-primary font-button hover:underline flex items-center gap-1 font-bold"
                >
                  + Write New Article
                </button>
              </div>

              {postItems.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic py-4">No posts published yet.</p>
              ) : (
                <div className="space-y-4">
                  {postItems.map((p) => (
                    <div key={p.id} className="p-4 border border-outline-variant/30 rounded-lg flex items-start justify-between bg-surface gap-4">
                      <div>
                        <span className="text-[10px] font-label-caps bg-primary/10 text-primary px-2 py-0.5 rounded uppercase font-bold">{p.category}</span>
                        <h4 className="font-button font-bold text-on-surface text-sm mt-1">{p.title}</h4>
                        <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{p.excerpt || p.content}</p>
                      </div>
                      <button
                        onClick={() => p.id && handleDeletePost(p.id)}
                        className="text-error text-xs font-button hover:underline shrink-0"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {(activeTab === 'Dashboard' || activeTab === 'Events') && (
            <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-base text-on-surface font-bold">Church Events</h3>
                <button
                  onClick={() => { setContentType('event'); setShowUploadModal(true); }}
                  className="text-xs text-primary font-button hover:underline flex items-center gap-1 font-bold"
                >
                  + Create Event
                </button>
              </div>

              {eventItems.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic py-4">No events scheduled.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eventItems.map((e) => (
                    <div key={e.id} className="p-4 border border-outline-variant/30 rounded-lg flex justify-between items-center bg-surface">
                      <div>
                        <h4 className="font-button font-bold text-on-surface text-sm">{e.title}</h4>
                        <p className="text-xs text-primary font-semibold mt-0.5">{new Date(e.event_date).toLocaleDateString()} • {e.location}</p>
                      </div>
                      <button
                        onClick={() => e.id && handleDeleteEvent(e.id)}
                        className="text-error text-xs font-button hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {(activeTab === 'Dashboard' || activeTab === 'Prayer') && (
            <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
              <h3 className="font-headline-md text-base text-on-surface font-bold mb-4">Submitted Prayer Requests ({prayers.length})</h3>
              {prayers.length === 0 ? (
                <p className="text-xs text-on-surface-variant italic">No prayer requests received yet.</p>
              ) : (
                <div className="space-y-3">
                  {prayers.map((pr, idx) => (
                    <div key={idx} className="p-3 bg-surface border border-outline-variant/30 rounded text-xs">
                      <p className="font-bold text-on-surface">{pr.name} ({pr.email})</p>
                      <p className="text-on-surface-variant mt-1">{pr.request}</p>
                      <p className="text-[10px] text-outline mt-1">{pr.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* --- POST / UPLOAD MODAL --- */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-lg font-bold text-on-surface">Post Content to Main Site</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-5">
              {/* Type selector */}
              <div>
                <label className="block font-button text-xs text-on-surface-variant mb-2">Content Category</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { id: 'video', label: 'Video', icon: 'video_library' },
                    { id: 'audio', label: 'Audio', icon: 'headphones' },
                    { id: 'post', label: 'Article', icon: 'article' },
                    { id: 'document', label: 'PDF/Doc', icon: 'folder' },
                    { id: 'event', label: 'Event', icon: 'event' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setContentType(t.id as any)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border font-button text-[11px] transition-all ${
                        contentType === t.id
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-outline-variant/40 text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-button text-xs text-on-surface-variant mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title of content / message / study..."
                  className="w-full bg-surface border border-outline-variant/40 rounded p-3 text-sm focus:border-primary outline-none"
                />
              </div>

              {/* Video Specific */}
              {contentType === 'video' && (
                <div className="space-y-4 bg-surface p-4 rounded-lg border border-outline-variant/30">
                  <div>
                    <label className="block font-button text-xs text-on-surface-variant mb-1">
                      Option A: YouTube Video URL
                    </label>
                    <input
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-surface-container border border-outline-variant/40 rounded p-2.5 text-xs focus:border-primary outline-none"
                    />
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-outline-variant/30"></div>
                    <span className="flex-shrink mx-2 text-[10px] text-outline font-label-caps">OR UPLOAD VIDEO FILE</span>
                    <div className="flex-grow border-t border-outline-variant/30"></div>
                  </div>

                  <div>
                    <label className="block font-button text-xs text-on-surface-variant mb-1">
                      Option B: Upload Video File from Device (.mp4, .webm)
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setSelectedMediaFile(e.target.files?.[0] || null)}
                      className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary/90"
                    />
                  </div>
                </div>
              )}

              {/* Audio Specific */}
              {contentType === 'audio' && (
                <div className="space-y-4 bg-surface p-4 rounded-lg border border-outline-variant/30">
                  <div>
                    <label className="block font-button text-xs text-on-surface-variant mb-1">
                      Upload Audio File from Device (.mp3, .m4a, .wav)
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setSelectedMediaFile(e.target.files?.[0] || null)}
                      className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary/90"
                    />
                  </div>
                </div>
              )}

              {/* PDF/Document Specific */}
              {contentType === 'document' && (
                <div className="space-y-4 bg-surface p-4 rounded-lg border border-outline-variant/30">
                  <div>
                    <label className="block font-button text-xs text-on-surface-variant mb-1">
                      Upload PDF / Study Guide File from Device (.pdf, .docx, .epub)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.epub,.ppt,.pptx"
                      onChange={(e) => setSelectedMediaFile(e.target.files?.[0] || null)}
                      className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary/90"
                    />
                  </div>
                </div>
              )}

              {/* Cover / Thumbnail Upload */}
              <div>
                <label className="block font-button text-xs text-on-surface-variant mb-1">
                  Upload Cover Image / Thumbnail (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedThumbFile(e.target.files?.[0] || null)}
                  className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-surface-variant file:text-on-surface hover:file:bg-surface-variant/80"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-button text-xs text-on-surface-variant mb-1">Speaker / Author</label>
                  <input
                    type="text"
                    value={contentType === 'post' ? author : speaker}
                    onChange={(e) => contentType === 'post' ? setAuthor(e.target.value) : setSpeaker(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/40 rounded p-2.5 text-xs focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-button text-xs text-on-surface-variant mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/40 rounded p-2.5 text-xs focus:border-primary outline-none"
                  >
                    <option value="Evangelism">Evangelism</option>
                    <option value="Faith">Faith & Growth</option>
                    <option value="Worship">Worship</option>
                    <option value="Grace">Grace</option>
                    <option value="Discipleship">Discipleship</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              {contentType === 'event' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-button text-xs text-on-surface-variant mb-1">Event Date & Time</label>
                    <input
                      type="datetime-local"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-surface border border-outline-variant/40 rounded p-2.5 text-xs focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-button text-xs text-on-surface-variant mb-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-surface border border-outline-variant/40 rounded p-2.5 text-xs focus:border-primary outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-button text-xs text-on-surface-variant mb-1">
                  {contentType === 'post' ? 'Full Post Content *' : 'Description'}
                </label>
                <textarea
                  rows={contentType === 'post' ? 6 : 3}
                  required={contentType === 'post'}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={contentType === 'post' ? 'Write article content...' : 'Brief summary...'}
                  className="w-full bg-surface border border-outline-variant/40 rounded p-3 text-xs focus:border-primary outline-none"
                />
              </div>

              {isUploading && (
                <div className="p-3 bg-primary/10 text-primary text-xs rounded animate-pulse font-medium">
                  ⏳ {uploadProgressMsg}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-button text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-primary text-on-primary font-button text-xs font-semibold rounded-lg shadow hover:bg-primary/90"
                >
                  {isUploading ? 'Publishing...' : 'Publish to Website'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
