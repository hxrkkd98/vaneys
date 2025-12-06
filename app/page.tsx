"use client";
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Truck, 
  ShieldCheck, 
  Calendar,
  Package,
  Facebook,
  Instagram,
  Phone,
  Mail,
  User,
  Heart,
  ArrowRight,
  MapPin,
  LucideIcon
} from 'lucide-react';

/**
 * TYPES & INTERFACES
 */

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  tag: string | null;
}

interface Slide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  desc: string;
  btn: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  link?: string;
}

interface ProductCardProps {
  product: Product;
}

/**
 * MOCK DATA
 */
const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Signature Heong Peah (8pcs)", 
    price: 13.80, 
    originalPrice: null, 
    rating: 5, 
    reviews: 342,
    image: "https://placehold.co/600x600/FCD34D/78350F?text=Heong+Peah",
    tag: "Signature"
  },
  { 
    id: 2, 
    name: "Original Tambun Biscuit", 
    price: 18.80, 
    originalPrice: 20.00, 
    rating: 4.8, 
    reviews: 156,
    image: "https://placehold.co/600x600/FEF3C7/92400E?text=Tambun+Biscuit",
    tag: "Hot"
  },
  { 
    id: 3, 
    name: "Ming Ang Instant White Coffee", 
    price: 19.80, 
    originalPrice: null, 
    rating: 4.9, 
    reviews: 89,
    image: "https://placehold.co/600x600/78350F/FEF3C7?text=White+Coffee",
    tag: null
  },
  { 
    id: 4, 
    name: "Pineapple Cake (10pcs)", 
    price: 24.00, 
    originalPrice: 28.00, 
    rating: 5, 
    reviews: 210,
    image: "https://placehold.co/600x600/F59E0B/FFFBEB?text=Pineapple+Cake",
    tag: "CNY Special"
  },
  { 
    id: 5, 
    name: "Spicy Chicken Floss Puff", 
    price: 11.30, 
    originalPrice: null, 
    rating: 4.7, 
    reviews: 112,
    image: "https://placehold.co/600x600/DC2626/FEF2F2?text=Floss+Puff",
    tag: "Promo"
  },
  { 
    id: 6, 
    name: "Honey Lime Juice 600g", 
    price: 18.90, 
    originalPrice: null, 
    rating: 4.8, 
    reviews: 56,
    image: "https://placehold.co/600x600/65A30D/ECFCCB?text=Honey+Lime",
    tag: null
  },
  { 
    id: 7, 
    name: "Ipoh Salted Chicken Spices", 
    price: 8.00, 
    originalPrice: null, 
    rating: 4.9, 
    reviews: 430,
    image: "https://placehold.co/600x600/E5E5E5/404040?text=Spices",
    tag: "Hot Product"
  },
  { 
    id: 8, 
    name: "Traditional Wife Cake", 
    price: 17.90, 
    originalPrice: null, 
    rating: 4.6, 
    reviews: 98,
    image: "https://placehold.co/600x600/FDE68A/92400E?text=Wife+Cake",
    tag: null
  },
];

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://placehold.co/1920x800/7f1d1d/fef2f2?text=Chinese+New+Year+Sale",
    subtitle: "Est. 2010 • Authentic Taste",
    title: "Prosperity Delivered",
    desc: "Celebrate the Lunar New Year with authentic handcrafted pastries delivered to your doorstep.",
    btn: "Shop CNY Collection"
  },
  {
    id: 2,
    image: "https://placehold.co/1920x800/991b1b/fef2f2?text=Freshly+Baked+Daily",
    subtitle: "Fresh From The Oven",
    title: "Signature Heong Peah",
    desc: "Baked fresh daily using traditional recipes passed down through generations.",
    btn: "Order Fresh Now"
  },
  {
    id: 3,
    image: "https://placehold.co/1920x800/b45309/fffbeb?text=Premium+Gift+Sets",
    subtitle: "The Perfect Gift",
    title: "Share The Joy",
    desc: "Send your warm wishes with our elegantly packaged premium gift sets.",
    btn: "View Gift Catalog"
  }
];

/**
 * COMPONENTS
 */

const TopBar = () => (
  <div className="bg-[#8B1E1E] text-white text-[11px] py-2 hidden md:block tracking-wide">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex gap-6">
        <span className="flex items-center gap-2 hover:text-yellow-200 transition-colors cursor-pointer"><Phone size={11} /> 012-7188122</span>
        <span className="flex items-center gap-2 hover:text-yellow-200 transition-colors cursor-pointer"><Mail size={11} /> support@mingang.my</span>
      </div>
      <div className="flex gap-6 font-medium">
        <a href="#" className="hover:text-yellow-200 transition-colors">Order Policy</a>
        <a href="#" className="hover:text-yellow-200 transition-colors">FAQ</a>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-4">
        {/* relative is crucial here for the absolute positioning to work */}
        <div className="flex flex-row justify-between items-center relative">
          
          {/* Mobile Menu Trigger (Left) */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-[#8B1E1E] transition-colors p-1">
               {isOpen ? <X /> : <Menu />}
             </button>
          </div>
            
          {/* Logo (Left on Desktop) */}
          <div className="flex flex-col items-center group cursor-pointer md:items-start shrink-0">
              <h1 className="text-2xl md:text-3xl font-serif font-black text-[#8B1E1E] tracking-wider group-hover:opacity-90 transition-opacity">MING ANG</h1>
              <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-gray-500 uppercase font-medium group-hover:text-[#8B1E1E] transition-colors">Confectionery</span>
          </div>

          {/* Center Navigation - FIXED: ABSOLUTE POSITIONING */}
          {/* This takes the element out of the flow to ensure it's mathematically centered regardless of logo width */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <div className="flex space-x-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
                <a href="#" className="text-[#8B1E1E] hover:text-[#8B1E1E] transition-colors">Home</a>
                <a href="#shop" className="hover:text-[#8B1E1E] transition-colors">Products</a>
                <a href="#" className="hover:text-[#8B1E1E] transition-colors">Contact</a>
             </div>
          </div>

          {/* Desktop Actions (Right) */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
             
             {/* Cart Icon */}
             <div className="flex items-center gap-3 cursor-pointer group">
                <div className="relative p-2 rounded-full group-hover:bg-red-50 transition-colors">
                  <ShoppingBag size={20} className="text-gray-800 group-hover:text-[#8B1E1E] transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-[#8B1E1E] text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white">
                    0
                  </span>
                </div>
             </div>

             {/* Profile Icon */}
             <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-gray-800 hover:text-[#8B1E1E]">
                <User size={20} strokeWidth={2} />
             </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 shadow-xl absolute w-full left-0 top-full animate-in slide-in-from-top-2 duration-200 h-screen">
           <div className="flex flex-col space-y-6 text-base font-medium text-gray-800 items-center text-center">
             <a href="#" className="text-[#8B1E1E] font-bold text-xl">Home</a>
             <a href="#" className="hover:text-[#8B1E1E]">Products</a>
             <a href="#" className="hover:text-[#8B1E1E]">Contact</a>
             <a href="#" className="hover:text-[#8B1E1E]">My Account</a>
             <div className="pt-8 border-t border-gray-100 w-full">
                <p className="text-xs text-gray-400 mb-2">Need Help?</p>
                <p className="text-[#8B1E1E] font-bold">012-718 8122</p>
             </div>
           </div>
        </div>
      )}
    </nav>
  );
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-gray-100 overflow-hidden group">
       {/* Slides */}
       {SLIDES.map((slide, index) => (
         <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
         >
           <div 
             className="absolute inset-0 w-full h-full bg-cover bg-center"
             style={{ backgroundImage: `url(${slide.image})` }}
           ></div>
           <div className="absolute inset-0 bg-black/20"></div>
           
           <div className="absolute inset-0 flex items-center justify-center text-center px-4">
             <div className={`bg-white/95 backdrop-blur-sm p-8 md:p-14 max-w-3xl shadow-2xl border-2 border-[#8B1E1E]/10 transform transition-all duration-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-[#8B1E1E]"></div>
                  <span className="text-[#8B1E1E] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                    {slide.subtitle}
                  </span>
                  <div className="h-[1px] w-8 bg-[#8B1E1E]"></div>
                </div>
                <h2 className="text-3xl md:text-6xl font-serif font-medium text-gray-900 mb-6 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-gray-600 mb-8 font-light text-base md:text-lg leading-relaxed max-w-lg mx-auto hidden md:block">
                  {slide.desc}
                </p>
                <button className="bg-[#8B1E1E] text-white px-8 py-3 md:px-10 md:py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#6b1616] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-[#8B1E1E]/30 flex items-center gap-2 mx-auto">
                  {slide.btn} <ArrowRight size={16} />
                </button>
             </div>
           </div>
         </div>
       ))}

       {/* Navigation Buttons */}
       <button 
         onClick={prevSlide}
         className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white text-gray-800 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hidden md:block"
       >
         <ChevronLeft size={24} />
       </button>
       <button 
         onClick={nextSlide}
         className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white text-gray-800 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hidden md:block"
       >
         <ChevronRight size={24} />
       </button>

       {/* Dots */}
       <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/50 ${currentSlide === idx ? 'bg-[#8B1E1E] w-8' : 'bg-white hover:bg-gray-200'}`}
            />
          ))}
       </div>
    </div>
  );
};

interface USPItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const USPBar = () => {
  const items: USPItem[] = [
    { icon: Package, title: "Shop Online", desc: "Doorstep delivery" },
    { icon: Truck, title: "Fast Shipping", desc: "Free > RM200" },
    { icon: Calendar, title: "Schedule", desc: "Plan ahead" },
    { icon: ShieldCheck, title: "Secure", desc: "Fresh condition" },
  ];

  return (
    <div className="bg-[#fcfbf9] border-b border-gray-100 relative z-20 -mt-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 border-b md:border-b-0 border-gray-100">
          {items.map((item, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 py-6 md:py-8 group hover:bg-white transition-colors cursor-default ${idx > 1 ? 'border-t md:border-t-0 border-gray-100' : ''}`}>
               <div className="p-2 md:p-3 bg-red-50 text-[#8B1E1E] rounded-full group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
               </div>
               <div className="text-center md:text-left">
                  <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-1 uppercase tracking-wide group-hover:text-[#8B1E1E] transition-colors">{item.title}</h3>
                  <p className="text-[10px] md:text-xs text-gray-500 hidden md:block">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, link }: SectionHeaderProps) => (
  <div className="flex flex-col items-center text-center mb-12">
     <span className="text-[#8B1E1E] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Ming Ang Specialties</span>
     <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4">{title}</h2>
     <div className="w-16 h-1 bg-[#8B1E1E] mb-4"></div>
     <p className="text-sm text-gray-500 max-w-2xl px-4">{subtitle}</p>
     {link && (
       <a href={link} className="mt-6 text-[#8B1E1E] border-b border-[#8B1E1E] pb-1 text-xs font-bold uppercase tracking-widest hover:text-gray-900 hover:border-gray-900 transition-colors">
         View All Collection
       </a>
     )}
  </div>
);

const ProductCard = ({ product }: ProductCardProps) => (
  <div className="bg-white group relative flex flex-col h-full">
    {/* Image Area */}
    <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4">
      {product.tag && (
         <span className="absolute top-0 left-0 bg-[#8B1E1E] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider z-10">
           {product.tag}
         </span>
      )}
      <button className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-600 md:opacity-0 md:group-hover:opacity-100 transition-opacity transform md:translate-x-2 md:group-hover:translate-x-0">
        <Heart size={20} />
      </button>
      
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      {/* Quick Add Button (Desktop) */}
      <button className="hidden md:flex absolute bottom-0 left-0 w-full bg-white/95 text-[#8B1E1E] py-3 text-xs font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-red-100 hover:bg-[#8B1E1E] hover:text-white items-center justify-center gap-2">
        <ShoppingBag size={14} /> Add to Cart
      </button>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 text-center px-2">
       <div className="mb-2 text-yellow-400 flex justify-center text-[10px] gap-0.5">
          {[...Array(5)].map((_, i) => (
             <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-200"} />
          ))}
          <span className="text-gray-300 ml-1">({product.reviews})</span>
       </div>
       <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8B1E1E] transition-colors cursor-pointer leading-relaxed">
         {product.name}
       </h3>
       
       <div className="mt-auto pb-4">
         <div className="flex justify-center items-baseline gap-2">
            <span className="text-lg font-bold text-[#8B1E1E]">RM {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">RM {product.originalPrice.toFixed(2)}</span>
            )}
         </div>
         {/* Mobile Add Button */}
         <button className="md:hidden w-full mt-2 border border-[#8B1E1E] text-[#8B1E1E] py-2 text-[10px] font-bold uppercase">
            Add
         </button>
       </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-[#1a1a1a] text-gray-400 text-sm">
    <div className="container mx-auto px-4 pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-6 text-center md:text-left">
           <div>
             <h4 className="text-white text-2xl font-serif font-bold tracking-wide">MING ANG</h4>
             <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Confectionery</span>
           </div>
           <p className="text-xs leading-loose opacity-70">
             Upholding tradition since 2010. We are committed to baking the freshest pastries using premium ingredients for our customers.
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
            {['Latest Promotions', 'Mooncakes', 'Freshly Baked', 'Beverages', 'Sauces & Spices'].map(item => (
              <li key={item}><a href="#" className="hover:text-white transition-colors hover:pl-2 duration-300 block">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contact</h4>
          <ul className="space-y-6 text-xs flex flex-col items-center md:items-start">
             <li className="flex items-start gap-4">
               <MapPin size={16} className="text-[#8B1E1E] shrink-0 mt-1" />
               <span className="opacity-70 text-left">123, Jalan Ming Ang, <br/>Taman Perindustrian, <br/>81100 Johor Bahru.</span>
             </li>
             <li className="flex items-center gap-4">
               <Phone size={16} className="text-[#8B1E1E] shrink-0" />
               <span className="opacity-70">+60 12-718 8122</span>
             </li>
             <li className="flex items-center gap-4">
               <Mail size={16} className="text-[#8B1E1E] shrink-0" />
               <span className="opacity-70">support@mingang.my</span>
             </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="text-center md:text-left">
           <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Stay Updated</h4>
           <p className="text-xs mb-6 opacity-70">Subscribe to receive exclusive offers and new product announcements.</p>
           <form className="flex flex-col gap-3">
             <input type="email" placeholder="Your email address" className="bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#8B1E1E] transition-colors text-center md:text-left" />
             <button className="bg-[#8B1E1E] text-white py-3 px-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#8B1E1E] transition-colors">
               Subscribe
             </button>
           </form>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 text-[10px] text-center flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 uppercase tracking-wider">
         <p>Ming Ang Confectionery Sdn Bhd © 2026</p>
         <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
         </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
      <TopBar />
      <Navbar />
      
      <main>
        <HeroSlider />
        <USPBar />

        {/* Latest Promotions */}
        <section className="py-20 bg-white" id="shop">
          <div className="container mx-auto px-4">
            <SectionHeader 
               title="Latest Promotions" 
               subtitle="Grab these limited time offers before they are gone! Experience the taste of tradition at unbeatable prices." 
               link="#" 
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
              {PRODUCTS.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Parallax Banner */}
        <section className="py-32 bg-[#8B1E1E] relative bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(https://placehold.co/1920x1080/5c1010/8B1E1E?text=Bakery+Texture)' }}>
           <div className="absolute inset-0 bg-black/40"></div>
           <div className="container mx-auto px-4 relative z-10 text-center">
              <span className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-pulse">Baked Fresh Daily</span>
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6 leading-tight">Authentic Taste of <br/>Tradition</h2>
              <p className="text-gray-200 max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed">
                 Satisfy your cravings with our signature Heong Peah, Creamy Milk Biscuit and many more! 
                 Baked hot from the oven to ensure maximum freshness and quality.
              </p>
              <button className="bg-white text-[#8B1E1E] px-10 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-colors shadow-2xl">
                 View Fresh Bakery
              </button>
           </div>
        </section>

        {/* Signature Products */}
        <section className="py-24 bg-[#fcfbf9]">
          <div className="container mx-auto px-4">
            <SectionHeader 
               title="Customer Favorites" 
               subtitle="Discover our best-selling pastries loved by thousands across Malaysia and Singapore." 
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-16 text-center">
               <button className="border border-gray-800 text-gray-800 px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#8B1E1E] hover:border-[#8B1E1E] hover:text-white transition-all duration-300">
                  Load More Products
               </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}