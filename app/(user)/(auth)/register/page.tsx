'use client'

import { useActionState } from 'react'; // NOTE: In Next.js 14, use 'useFormState'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';  
import Link from 'next/link';
import { signup } from '@/lib/auth/action';

// Initial state for the form
const initialState = {
  success: false,
  message: '',
}

export default function RegisterPage() {
  const router = useRouter();
  
  // useActionState handles the submission and returns the result
  // [state, formAction, isPending]
  // Note: if you are on older Next.js 14, import { useFormState } from 'react-dom' instead
  const [state, formAction, isPending] = useActionState(signup, initialState);

  // Effect: If success, wait 2s then redirect
  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  return (
    <div className="bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white relative">
         
         {/* --- 1. LOADING OVERLAY (SPLASH) --- */}
         {/* Prevents over-clicking by covering the whole screen when pending */}
         {isPending && (
            <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#8B1E1E] animate-spin mx-auto mb-4" />
                    <p className="text-[#8B1E1E] font-bold uppercase tracking-widest text-sm">Creating Account...</p>
                </div>
            </div>
         )}

         <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 animate-in fade-in duration-500">
            <div className="bg-white p-8 md:p-12 shadow-md border border-gray-100 w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-sm text-gray-500">Register to place orders and track.</p>
                </div>

                {/* --- 2. ALERT MESSAGES --- */}
                {state?.message && (
                    <div className={`p-4 mb-6 rounded-md flex items-center gap-3 text-sm ${
                        state.success 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                        {state.success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        <span>{state.message}</span>
                    </div>
                )}

                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Full Name</label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="fullName" type="text" required className="w-full border border-gray-200 p-3 pl-12 focus:outline-none focus:border-[#8B1E1E]" placeholder="John Doe" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="email" type="email" required className="w-full border border-gray-200 p-3 pl-12 focus:outline-none focus:border-[#8B1E1E]" placeholder="john@example.com" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Phone Number</label>
                        <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="phone" type="tel" required className="w-full border border-gray-200 p-3 pl-12 focus:outline-none focus:border-[#8B1E1E]" placeholder="0123456789" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="password" type="password" required className="w-full border border-gray-200 p-3 pl-12 focus:outline-none focus:border-[#8B1E1E]" placeholder="••••••••" />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isPending || state?.success}
                        className="w-full bg-[#8B1E1E] text-white py-3 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isPending ? (
                            <>Processing...</>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm">
                    <p className="text-gray-500 mb-4">Already have an account?</p>
                    <Link href="/login" className="text-[#8B1E1E] font-bold uppercase tracking-widest border-b border-[#8B1E1E] pb-1 hover:text-gray-900 hover:border-gray-900 transition-colors">
                        Login Here
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}