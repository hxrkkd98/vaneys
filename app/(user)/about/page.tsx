export default function AboutPage() {

  return (
    <div className="bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
         <div className="bg-white animate-in fade-in duration-500">
            <div className="bg-[#8B1E1E] py-20 text-center border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Our Heritage</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">The Story of Ming Ang</h1>
                    <p className="max-w-2xl mx-auto text-white leading-relaxed">
                        From a humble family kitchen to a beloved confectionery brand.
                    </p>
                </div>
            </div>
            {/* Content */}
            <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="w-full md:w-1/2 relative">
                    <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden shadow-2xl transform md:rotate-2">
                    <img src="https://placehold.co/800x1000/8B1E1E/fcfbf9?text=Old+Shop+Photo" alt="Old Shop" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white p-4 shadow-xl hidden md:block">
                        <img src="https://placehold.co/300x300/FCD34D/78350F?text=Heong+Peah" alt="Signature Pastry" className="w-full h-full object-cover" />
                    </div>
                </div>
                
                <div className="w-full md:w-1/2 space-y-8">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Established in 2010</h3>
                        <p className="text-gray-600 leading-relaxed">
                        Founded in Johor Bahru, Ming Ang Confectionery began with a simple mission: to preserve the authentic taste of traditional Chinese pastries. 
                        What started as a small family operation has grown into a renowned brand, but our core values remain unchanged.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Handcrafted Perfection</h3>
                        <p className="text-gray-600 leading-relaxed">
                        We believe that some things cannot be rushed. That's why we still hand-make our signature Heong Peah and Tambun Biscuits daily. 
                        Using premium ingredients and time-honored techniques, we ensure every bite brings back fond memories of yesteryear.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <div className="bg-[#fcfbf9] p-6 text-center border border-gray-100">
                        <span className="block text-4xl font-serif font-bold text-[#8B1E1E] mb-2">15+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">Years of History</span>
                        </div>
                        <div className="bg-[#fcfbf9] p-6 text-center border border-gray-100">
                        <span className="block text-4xl font-serif font-bold text-[#8B1E1E] mb-2">50k+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">Happy Customers</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        
        </div>
    </div>
  );
}