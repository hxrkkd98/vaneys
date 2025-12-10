"use client";
import { User, Package, MapPin, LogOut } from 'lucide-react';
export default function ProfilePage() {
    const onLogout = () => {
        // Implement logout logic here
        console.log('User logged out');
    }
  return (
    <div className="bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
        <div className="bg-gray-50 min-h-screen py-12 animate-in fade-in duration-500">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Account</h1>
                <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                            <User size={40} />
                            </div>
                            <h3 className="font-bold text-gray-900">John Doe</h3>
                            <p className="text-xs text-gray-500">john@example.com</p>
                        </div>
                        <nav className="p-2">
                            <button className="w-full text-left p-3 text-sm font-bold text-[#8B1E1E] bg-red-50 rounded flex items-center gap-3">
                            <User size={16} /> Profile
                            </button>
                            <button className="w-full text-left p-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded flex items-center gap-3">
                            <Package size={16} /> Orders
                            </button>
                            <button className="w-full text-left p-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded flex items-center gap-3">
                            <MapPin size={16} /> Addresses
                            </button>
                            <button 
                                onClick={onLogout}
                                className="w-full text-left p-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded flex items-center gap-3 mt-4"
                            >
                            <LogOut size={16} /> Logout
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Profile Information</h2>
                    <form className="max-w-xl space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">First Name</label>
                            <input type="text" defaultValue="John" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                            </div>
                            <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">Last Name</label>
                            <input type="text" defaultValue="Doe" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">Email Address</label>
                            <input type="email" defaultValue="john@example.com" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">Phone Number</label>
                            <input type="tel" defaultValue="+60 12 345 6789" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                        </div>
                        <button className="bg-[#8B1E1E] text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors">
                            Save Changes
                        </button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}