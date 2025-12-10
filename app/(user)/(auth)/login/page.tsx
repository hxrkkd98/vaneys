import { Mail, Lock } from 'lucide-react'; 
import Link from 'next/link'; 

export default function HomePage() {
  return (
    <div className="bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
    
        <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 animate-in fade-in duration-500">
            <div className="bg-white p-8 md:p-12 shadow-md border border-gray-100 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-sm text-gray-500">
                        Login to manage your account.
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Email Address</label>
                        <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" required className="w-full border border-gray-200 p-3 pl-12 focus:outline-none focus:border-[#8B1E1E]" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Password</label>
                        <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="password" required className="w-full border border-gray-200 p-3 pl-12 focus:outline-none focus:border-[#8B1E1E]" placeholder="••••••••" />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#8B1E1E] text-white py-3 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors mt-4"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm">
                    <p className="text-gray-500 mb-4">Don't have an account?</p>
                    <Link href="/register" 
                        className="text-[#8B1E1E] font-bold uppercase tracking-widest border-b border-[#8B1E1E] pb-1 hover:text-gray-900 hover:border-gray-900 transition-colors"
                    >
                       Create Account
                    </Link>
                </div>
            </div>
        </div>

    </div>
  );
}