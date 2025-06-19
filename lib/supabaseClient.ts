import { createClient } from '@supabase/supabase-js'

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a dummy client if credentials are missing (for development only)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Database functionality will be limited.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 