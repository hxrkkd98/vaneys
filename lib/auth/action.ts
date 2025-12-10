'use server'

import { createClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'

// Define the shape of our response
export type ActionResponse = {
  success: boolean
  message: string
}

export async function signup(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string

  // 1. Validate inputs locally before hitting server
  if (!email || !password || !fullName) {
    return { success: false, message: "Please fill in all required fields." }
  }

  // 2. Sign up Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { success: false, message: authError.message }
  }

  // 3. Insert Profile
  if (authData.user) {
    const { error: dbError } = await supabase
      .from('users')
      .insert({
        user_id: authData.user.id,
        email,
        name: fullName,
        phone,
        status: 'active',
      })

    if (dbError) {
       // Optional cleanup: delete auth user if profile fails
       return { success: false, message: dbError.message }
     
    }
  }

  // 4. Return success state (Frontend will detect this and redirect)
  return { success: true, message: "Registration successful! Redirecting..." }
}


export async function login(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Attempt Login
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, message: error.message }
  }

  // 2. (Optional) Check User Status/Role from your public.users table
  const { data: userAuth } = await supabase.auth.getUser()
  if (userAuth.user) {
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('status, role')
      .eq('user_id', userAuth.user.id)
      .single()
    
    if (profile && profile.status !== 'active') {
       // Sign out if account is suspended/inactive
       await supabase.auth.signOut()
       return { success: false, message: "Account is inactive. Please contact support." }
    }
  }

  // 3. Redirect on success
  // Note: redirect throws an error internally, so call it outside try/catch blocks if you use them
  redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut();
  redirect('/login')
}