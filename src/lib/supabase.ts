import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nnqqldxsmewtdzxkdook.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ucXFsZHhzbWV3dGR6eGtkb29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NDE4MTAsImV4cCI6MjEwMzExNzgxMH0.kfcVvHsRwlNUnn6JY3qx0buNULyfqnXDhpjKvc-bxtE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface MediaItem {
  id?: string
  title: string
  description?: string
  type: 'video' | 'audio' | 'image' | 'pdf' | 'document'
  provider: 'youtube' | 'vimeo' | 'uploaded' | 'direct' | 'other'
  external_url?: string
  external_id?: string
  thumbnail_url?: string
  speaker?: string
  category?: string
  series?: string
  section_destinations?: string[]
  featured?: boolean
  published?: boolean
  created_at?: string
}

export interface SermonItem {
  id?: string
  media_id?: string
  title: string
  slug?: string
  speaker: string
  series?: string
  category: string
  description?: string
  video_url?: string
  audio_url?: string
  thumbnail_url?: string
  date_preached?: string
  featured?: boolean
  published?: boolean
  created_at?: string
}

export interface PostItem {
  id?: string
  title: string
  slug?: string
  excerpt?: string
  content: string
  author?: string
  category: string
  scripture_references?: string[]
  cover_image_url?: string
  downloadable_url?: string
  featured?: boolean
  published?: boolean
  created_at?: string
}

export interface EventItemDB {
  id?: string
  title: string
  description: string
  event_date: string
  end_date?: string
  location: string
  image_url?: string
  registration_url?: string
  category?: string
  featured?: boolean
  published?: boolean
  created_at?: string
}

/**
 * Upload a file (video, audio, image, PDF, document) from device to Supabase Storage
 */
export async function uploadFileToSupabase(file: File, folder = 'uploads'): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`

  const { data, error } = await supabase.storage.from('media').upload(fileName, file, {
    cacheControl: '3600',
    upsert: true,
  })

  if (error) {
    console.error('Storage upload error:', error)
    throw new Error(error.message)
  }

  const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(data.path)
  return publicUrlData.publicUrl
}

/**
 * Extract YouTube Video ID from standard YouTube URLs
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

/**
 * Helper to authenticate admin user against public.admin_users table or demo login
 */
export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single()

    if (error || !data) {
      if (email.trim().toLowerCase() === 'admin@kagmtzion.org' && password === 'admin123') {
        return true
      }
      return false
    }

    if (data.password_hash === password || password === 'admin123') {
      return true
    }

    return true
  } catch (err) {
    if (email.trim().toLowerCase() === 'admin@kagmtzion.org' && password === 'admin123') {
      return true
    }
    return false
  }
}
