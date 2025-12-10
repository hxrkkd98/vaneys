import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-[#1a1a1a] text-gray-400 text-sm">
    <div className="container mx-auto px-4 pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-6 text-center md:text-left">
           <div>
             <h4 className="text-white text-2xl font-serif font-bold tracking-wide">VANEYS</h4>
             <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Online Store</span>
           </div>
           <p className="text-xs leading-loose opacity-70">
             Upholding tradition since 2022. We are committed to baking the freshest cookies using premium ingredients for our customers.
           </p>
           <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#8B1E1E] hover:text-white transition-all"><Facebook size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#8B1E1E] hover:text-white transition-all"><Instagram size={14} /></a>
           </div>
        </div>

        {/* Links */}
        <div className="text-center md:text-left">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Shop</h4>
          <ul className="space-y-4 text-xs font-medium tracking-wide">
            <li><a href="#" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Products</a></li>
            {/*  <li><a href="#" className="hover:text-white transition-colors hover:pl-2 duration-300 block">About Us</a></li> */}
            <li><a href="#" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contact</h4>
          <ul className="space-y-6 text-xs flex flex-col items-center md:items-start">
             <li className="flex items-start gap-4">
               <MapPin size={16} className="text-[#8B1E1E] shrink-0 mt-1" />
               <span className="opacity-70 text-left">2a, Jalan Meranti Jaya 2/10, <br/> Taman Meranti Jaya, <br/> 47120 Puchong, Selangor</span>
             </li>
             <li className="flex items-center gap-4">
               <Phone size={16} className="text-[#8B1E1E] shrink-0" />
               <span className="opacity-70">+60 18-000 0000</span>
             </li>
             <li className="flex items-center gap-4">
               <Mail size={16} className="text-[#8B1E1E] shrink-0" />
               <span className="opacity-70">support@vaneys.my</span>
             </li>
          </ul>
        </div>

        {/* Newsletter */}
        {/*   <div className="text-center md:text-left">
           <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Stay Updated</h4>
           <p className="text-xs mb-6 opacity-70">Subscribe to receive exclusive offers and new product announcements.</p>
           <form className="flex flex-col gap-3">
             <input type="email" placeholder="Your email address" className="bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#8B1E1E] transition-colors text-center md:text-left" />
             <button className="bg-[#8B1E1E] text-white py-3 px-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#8B1E1E] transition-colors">
               Subscribe
             </button>
           </form>
        </div> */}
      </div>

      <div className="border-t border-white/10 pt-8 text-[10px] text-center flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 uppercase tracking-wider">
         <p>Vaneys Online Store ©</p>
         {/* <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
         </div> */}
      </div>
    </div>
  </footer>
);