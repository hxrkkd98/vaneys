import { Mail, MapPin, Phone } from "lucide-react";
export default function ContactPage() {

  return (
    <div className="bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
        <div className="bg-white animate-in fade-in duration-500">
            <div className="bg-[#8B1E1E] py-20 text-center text-white">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Get in Touch</h1>
                <p className="max-w-2xl mx-auto text-red-100 leading-relaxed">
                    Have a question about your order or want to know more about our products? We're here to help.
                </p>
            </div>
            </div>

            <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Info Cards */}
                <div className="md:col-span-1 space-y-8">
                    <div className="p-8 bg-[#fcfbf9] border border-gray-100">
                        <MapPin className="w-8 h-8 text-[#8B1E1E] mb-4" />
                        <h3 className="font-serif font-bold text-xl mb-4">Visit Us</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        123, Jalan Ming Ang, <br/>Taman Perindustrian, <br/>81100 Johor Bahru, Malaysia.
                        </p>
                        <a href="#" className="text-[#8B1E1E] text-xs font-bold uppercase border-b border-[#8B1E1E]">Get Directions</a>
                    </div>

                    <div className="p-8 bg-[#fcfbf9] border border-gray-100">
                        <Phone className="w-8 h-8 text-[#8B1E1E] mb-4" />
                        <h3 className="font-serif font-bold text-xl mb-4">Call Us</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">Mon - Fri: 9am - 6pm</p>
                        <p className="text-xl font-bold text-gray-900">+60 12-718 8122</p>
                    </div>

                    <div className="p-8 bg-[#fcfbf9] border border-gray-100">
                        <Mail className="w-8 h-8 text-[#8B1E1E] mb-4" />
                        <h3 className="font-serif font-bold text-xl mb-4">Email Us</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        For corporate orders or general inquiries.
                        </p>
                        <a href="mailto:support@mingang.my" className="text-[#8B1E1E] font-bold">support@mingang.my</a>
                    </div>
                </div>

                {/* Form */}
                <div className="md:col-span-2">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">First Name</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-[#8B1E1E]" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">Last Name</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-[#8B1E1E]" placeholder="Doe" />
                        </div>
                        </div>
                        
                        <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Email Address</label>
                        <input type="email" className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-[#8B1E1E]" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Subject</label>
                        <select className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-[#8B1E1E]">
                            <option>General Inquiry</option>
                            <option>Order Status</option>
                            <option>Corporate Gift</option>
                            <option>Feedback</option>
                        </select>
                        </div>

                        <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Message</label>
                        <textarea rows={6} className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-[#8B1E1E]" placeholder="How can we help you?"></textarea>
                        </div>

                        <button className="bg-[#8B1E1E] text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors w-full md:w-auto">
                        Send Message
                        </button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}