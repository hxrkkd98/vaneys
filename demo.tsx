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
  Clock,
  Trash2,
  Minus,
  Plus,
  Filter,
  CreditCard,
  Lock,
  CheckCircle,
  LogOut,
  Map
} from 'lucide-react';

/**
 * TYPES & INTERFACES
 */

type ViewState = 'home' | 'history' | 'contact' | 'cart' | 'products' | 'product-detail' | 'checkout' | 'auth' | 'profile';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  tag: string | null;
  description?: string;
  category?: string;
}

interface Slide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  desc: string;
  btn: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  link?: string;
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

interface ProfilePageProps {
  onLogout: () => void;
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
    tag: "Signature",
    category: "Pastries",
    description: "Our signature Heong Peah (Fragrant Pastry) features a flaky outer layer and a sticky, sweet maltose filling with a hint of shallots. Baked fresh daily."
  },
  { 
    id: 2, 
    name: "Original Tambun Biscuit", 
    price: 18.80, 
    originalPrice: 20.00, 
    rating: 4.8, 
    reviews: 156,
    image: "https://placehold.co/600x600/FEF3C7/92400E?text=Tambun+Biscuit",
    tag: "Hot",
    category: "Pastries",
    description: "Also known as Dragon Balls, these bite-sized treats are filled with savory mung bean paste."
  },
  { 
    id: 3, 
    name: "Ming Ang Instant White Coffee", 
    price: 19.80, 
    originalPrice: null, 
    rating: 4.9, 
    reviews: 89,
    image: "https://placehold.co/600x600/78350F/FEF3C7?text=White+Coffee",
    tag: null,
    category: "Beverages",
    description: "Aromatic and smooth, our Instant White Coffee brings the authentic Ipoh coffee shop experience to your home."
  },
  { 
    id: 4, 
    name: "Pineapple Cake (10pcs)", 
    price: 24.00, 
    originalPrice: 28.00, 
    rating: 5, 
    reviews: 210,
    image: "https://placehold.co/600x600/F59E0B/FFFBEB?text=Pineapple+Cake",
    tag: "CNY Special",
    category: "Cakes",
    description: "Buttery pastry filled with premium pineapple jam. A must-have for Chinese New Year to welcome prosperity."
  },
  { 
    id: 5, 
    name: "Spicy Chicken Floss Puff", 
    price: 11.30, 
    originalPrice: null, 
    rating: 4.7, 
    reviews: 112,
    image: "https://placehold.co/600x600/DC2626/FEF2F2?text=Floss+Puff",
    tag: "Promo",
    category: "Pastries",
    description: "A savory delight! Crispy puff pastry filled with spicy chicken floss."
  },
  { 
    id: 6, 
    name: "Honey Lime Juice 600g", 
    price: 18.90, 
    originalPrice: null, 
    rating: 4.8, 
    reviews: 56,
    image: "https://placehold.co/600x600/65A30D/ECFCCB?text=Honey+Lime",
    tag: null,
    category: "Beverages",
    description: "Refreshing and soothing. Made with real limes and honey. Perfect for hot days."
  },
  { 
    id: 7, 
    name: "Ipoh Salted Chicken Spices", 
    price: 8.00, 
    originalPrice: null, 
    rating: 4.9, 
    reviews: 430,
    image: "https://placehold.co/600x600/E5E5E5/404040?text=Spices",
    tag: "Hot Product",
    category: "Sauces",
    description: "Authentic herb and spice mix to make the famous Ipoh Salted Chicken at home."
  },
  { 
    id: 8, 
    name: "Traditional Wife Cake", 
    price: 17.90, 
    originalPrice: null, 
    rating: 4.6, 
    reviews: 98,
    image: "https://placehold.co/600x600/FDE68A/92400E?text=Wife+Cake",
    tag: null,
    category: "Pastries",
    description: "A classic Cantonese pastry with a thin crust and a chewy, sweet winter melon filling."
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

const MOCK_CART: CartItem[] = [
  { ...PRODUCTS[0], quantity: 2 },
  { ...PRODUCTS[3], quantity: 1 },
];

/**
 * SHARED COMPONENTS
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

const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <div 
    onClick={onClick}
    className="bg-white group relative flex flex-col h-full border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
  >
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

const USPBar = () => {
  const items = [
    { icon: Package, title: "Shop Online", desc: "Doorstep delivery" },
    { icon: Truck, title: "Fast Shipping", desc: "Free > RM200" },
    { icon: Calendar, title: "Schedule", desc: "Plan ahead" },
    { icon: ShieldCheck, title: "Secure", desc: "Fresh condition" },
  ];

  return (
    <div className="bg-[#fcfbf9] border-b border-gray-100 relative z-20">
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

const Footer = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
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
              <li key={item}><button onClick={() => onNavigate('products')} className="hover:text-white transition-colors hover:pl-2 duration-300 block">{item}</button></li>
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

/**
 * PAGE COMPONENT: HOME
 */
const HomePage = ({ onProductClick, onNavigate }: { onProductClick: (id: number) => void, onNavigate: (view: ViewState) => void }) => {
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
    <div>
      {/* Hero Slider */}
      <div className="relative w-full h-[500px] md:h-[600px] bg-gray-100 overflow-hidden group">
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
                  <button onClick={() => onNavigate('products')} className="bg-[#8B1E1E] text-white px-8 py-3 md:px-10 md:py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#6b1616] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-[#8B1E1E]/30 flex items-center gap-2 mx-auto">
                    {slide.btn} <ArrowRight size={16} />
                  </button>
               </div>
             </div>
           </div>
         ))}
         <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white text-gray-800 p-3 rounded-full backdrop-blur-sm hidden md:block">
           <ChevronLeft size={24} />
         </button>
         <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white text-gray-800 p-3 rounded-full backdrop-blur-sm hidden md:block">
           <ChevronRight size={24} />
         </button>
      </div>

      <USPBar />

      <section className="py-20 bg-white" id="shop">
        <div className="container mx-auto px-4">
          <SectionHeader title="Latest Promotions" subtitle="Experience the taste of tradition at unbeatable prices." link="#" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
            {PRODUCTS.slice(0, 4).map(product => <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />)}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#8B1E1E] relative bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(https://placehold.co/1920x1080/5c1010/8B1E1E?text=Bakery+Texture)' }}>
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-pulse">Baked Fresh Daily</span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6 leading-tight">Authentic Taste of <br/>Tradition</h2>
            <button onClick={() => onNavigate('products')} className="bg-white text-[#8B1E1E] px-10 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-colors shadow-2xl mt-8">
               View Fresh Bakery
            </button>
         </div>
      </section>

      <section className="py-24 bg-[#fcfbf9]">
        <div className="container mx-auto px-4">
          <SectionHeader title="Customer Favorites" subtitle="Discover our best-selling pastries loved by thousands." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
            {PRODUCTS.map(product => <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />)}
          </div>
          <div className="mt-16 text-center">
             <button onClick={() => onNavigate('products')} className="border border-gray-800 text-gray-800 px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#8B1E1E] hover:border-[#8B1E1E] hover:text-white transition-all duration-300">
                Load More Products
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * PAGE COMPONENT: HISTORY (ABOUT US)
 */
const HistoryPage = () => (
  <div className="bg-white animate-in fade-in duration-500">
    <div className="bg-[#fcfbf9] py-20 text-center border-b border-gray-100">
       <div className="container mx-auto px-4">
          <span className="text-[#8B1E1E] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Our Heritage</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">The Story of Ming Ang</h1>
          <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">
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
    <USPBar />
  </div>
);

/**
 * PAGE COMPONENT: CONTACT
 */
const ContactPage = () => (
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
);

/**
 * PAGE COMPONENT: PRODUCTS LIST
 */
const ProductListPage = ({ onProductClick }: { onProductClick: (id: number) => void }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-in fade-in duration-500">
      <div className="container mx-auto px-4">
         <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full md:w-64 flex-shrink-0">
               <div className="bg-white p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-6 text-[#8B1E1E]">
                     <Filter size={18} />
                     <h3 className="font-bold uppercase tracking-widest text-sm">Filters</h3>
                  </div>
                  
                  <div className="space-y-6">
                     <div>
                        <h4 className="font-bold text-sm mb-3">Categories</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                           <li className="flex items-center gap-2 hover:text-[#8B1E1E] cursor-pointer font-medium text-[#8B1E1E]"><ChevronRight size={14}/> All Products</li>
                           <li className="flex items-center gap-2 hover:text-[#8B1E1E] cursor-pointer"><ChevronRight size={14}/> Pastries</li>
                           <li className="flex items-center gap-2 hover:text-[#8B1E1E] cursor-pointer"><ChevronRight size={14}/> Beverages</li>
                           <li className="flex items-center gap-2 hover:text-[#8B1E1E] cursor-pointer"><ChevronRight size={14}/> Sauces</li>
                           <li className="flex items-center gap-2 hover:text-[#8B1E1E] cursor-pointer"><ChevronRight size={14}/> Gifts</li>
                        </ul>
                     </div>
                     
                     <div className="border-t border-gray-100 pt-6">
                        <h4 className="font-bold text-sm mb-3">Price Range</h4>
                        <div className="flex gap-2 items-center">
                           <input type="text" placeholder="Min" className="w-full border p-2 text-xs" />
                           <span className="text-gray-400">-</span>
                           <input type="text" placeholder="Max" className="w-full border p-2 text-xs" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
               <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-500 text-sm">Showing all {PRODUCTS.length} results</p>
                  <select className="border border-gray-200 p-2 text-sm focus:outline-none">
                     <option>Sort by Popularity</option>
                     <option>Sort by Price: Low to High</option>
                     <option>Sort by Price: High to Low</option>
                     <option>Sort by Latest</option>
                  </select>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {PRODUCTS.map(product => (
                     <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

/**
 * PAGE COMPONENT: PRODUCT DETAIL
 */
const ProductDetailPage = ({ productId, onNavigate }: { productId: number, onNavigate: (view: ViewState) => void }) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white min-h-screen py-12 animate-in fade-in duration-500">
       <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
             <button onClick={() => onNavigate('home')} className="hover:text-[#8B1E1E]">Home</button>
             <ChevronRight size={12} />
             <button onClick={() => onNavigate('products')} className="hover:text-[#8B1E1E]">Products</button>
             <ChevronRight size={12} />
             <span className="text-gray-900 font-bold">{product.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
             {/* Product Images */}
             <div className="w-full md:w-1/2">
                <div className="aspect-square bg-gray-50 border border-gray-100 mb-4">
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                   {[...Array(4)].map((_, i) => (
                      <div key={i} className="aspect-square bg-gray-50 border border-gray-100 cursor-pointer hover:border-[#8B1E1E]">
                         <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                      </div>
                   ))}
                </div>
             </div>

             {/* Product Info */}
             <div className="w-full md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                   <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-200"} />
                      ))}
                   </div>
                   <span className="text-sm text-gray-500 border-l border-gray-200 pl-4">{product.reviews} Customer Reviews</span>
                </div>

                <div className="flex items-center gap-4 mb-8">
                   <span className="text-3xl font-bold text-[#8B1E1E]">RM {product.price.toFixed(2)}</span>
                   {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">RM {product.originalPrice.toFixed(2)}</span>
                   )}
                </div>

                <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
                   {product.description || "Enjoy the authentic taste of tradition with this handcrafted delight. Perfect for sharing with family or as a gift."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                   <div className="flex items-center border border-gray-200 w-fit h-12">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500"><Minus size={16} /></button>
                      <span className="w-12 text-center font-bold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500"><Plus size={16} /></button>
                   </div>
                   <button onClick={() => onNavigate('cart')} className="flex-1 bg-[#8B1E1E] text-white h-12 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors flex items-center justify-center gap-2 px-8">
                      <ShoppingBag size={18} /> Add to Cart
                   </button>
                   <button className="w-12 h-12 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#8B1E1E] hover:border-[#8B1E1E] transition-colors">
                      <Heart size={20} />
                   </button>
                </div>

                <div className="space-y-3 text-sm text-gray-500">
                   <div className="flex gap-2">
                      <span className="font-bold text-gray-900 w-24">SKU:</span>
                      <span>MA-2026-{product.id}</span>
                   </div>
                   <div className="flex gap-2">
                      <span className="font-bold text-gray-900 w-24">Category:</span>
                      <span>{product.category || "Pastries"}</span>
                   </div>
                   <div className="flex gap-2">
                      <span className="font-bold text-gray-900 w-24">Tags:</span>
                      <span>{product.tag || "CNY 2026"}</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

/**
 * PAGE COMPONENT: CART
 */
const CartPage = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => {
  // Simple mock state for display purposes
  const subtotal = MOCK_CART.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-in fade-in duration-500">
       <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Shopping Cart</h1>

          <div className="flex flex-col lg:flex-row gap-8">
             {/* Cart Items */}
             <div className="flex-1 bg-white p-6 shadow-sm border border-gray-100">
                <table className="w-full">
                   <thead className="border-b border-gray-100 text-left">
                      <tr>
                         <th className="pb-4 text-xs font-bold uppercase text-gray-500">Product</th>
                         <th className="pb-4 text-xs font-bold uppercase text-gray-500">Price</th>
                         <th className="pb-4 text-xs font-bold uppercase text-gray-500">Quantity</th>
                         <th className="pb-4 text-xs font-bold uppercase text-gray-500 text-right">Total</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {MOCK_CART.map((item) => (
                         <tr key={item.id}>
                            <td className="py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-20 h-20 bg-gray-50 flex-shrink-0">
                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                     <h3 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h3>
                                     <p className="text-xs text-gray-500">{item.tag || 'Standard Pack'}</p>
                                     <button className="text-red-500 text-xs mt-2 flex items-center gap-1 hover:text-red-700">
                                        <Trash2 size={12} /> Remove
                                     </button>
                                  </div>
                               </div>
                            </td>
                            <td className="py-6 text-sm font-medium">RM {item.price.toFixed(2)}</td>
                            <td className="py-6">
                               <div className="flex items-center border border-gray-200 w-fit">
                                  <button className="p-2 hover:bg-gray-50 text-gray-500"><Minus size={12} /></button>
                                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                  <button className="p-2 hover:bg-gray-50 text-gray-500"><Plus size={12} /></button>
                               </div>
                            </td>
                            <td className="py-6 text-right font-bold text-[#8B1E1E]">
                               RM {(item.price * item.quantity).toFixed(2)}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             {/* Summary */}
             <div className="w-full lg:w-96 bg-white p-6 shadow-sm border border-gray-100 h-fit">
                <h3 className="font-serif font-bold text-lg mb-6 pb-4 border-b border-gray-100">Order Summary</h3>
                <div className="space-y-4 mb-6">
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold">RM {subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-bold">{shipping === 0 ? 'Free' : `RM ${shipping.toFixed(2)}`}</span>
                   </div>
                   {shipping > 0 && (
                      <p className="text-[10px] text-red-500 italic">Add RM {(200 - subtotal).toFixed(2)} more for free shipping</p>
                   )}
                </div>
                <div className="border-t border-gray-100 pt-4 mb-8">
                   <div className="flex justify-between items-end">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#8B1E1E]">RM {total.toFixed(2)}</span>
                   </div>
                </div>
                <button onClick={() => onNavigate('checkout')} className="w-full bg-[#8B1E1E] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors mb-4">
                   Proceed to Checkout
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                   <ShieldCheck size={14} /> Secure Checkout
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

/**
 * PAGE COMPONENT: CHECKOUT
 */
const CheckoutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-in fade-in duration-500">
       <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
             {/* Billing Details */}
             <div className="flex-1">
                <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                   <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><MapPin size={20} className="text-[#8B1E1E]" /> Billing Details</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">First Name *</label>
                         <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Last Name *</label>
                         <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Address *</label>
                         <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" placeholder="Street address" />
                         <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E] mt-2" placeholder="Apartment, suite, unit etc. (optional)" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">State / Province *</label>
                         <select className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]">
                            <option>Johor</option>
                            <option>Selangor</option>
                            <option>Kuala Lumpur</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Postcode / ZIP *</label>
                         <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Phone *</label>
                         <input type="tel" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Email Address *</label>
                         <input type="email" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                      </div>
                   </div>
                </div>

                <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100">
                   <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><CreditCard size={20} className="text-[#8B1E1E]" /> Payment Method</h3>
                   <div className="space-y-4">
                      <div className="border border-[#8B1E1E] bg-red-50 p-4 rounded flex items-center justify-between cursor-pointer">
                         <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full border-4 border-[#8B1E1E]"></div>
                            <span className="font-bold text-gray-900">Credit Card / Debit Card</span>
                         </div>
                         <div className="flex gap-2">
                           <div className="w-8 h-5 bg-gray-200 rounded"></div>
                           <div className="w-8 h-5 bg-gray-200 rounded"></div>
                         </div>
                      </div>
                      <div className="border border-gray-200 p-4 rounded flex items-center gap-3 cursor-pointer hover:border-gray-400">
                         <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                         <span className="text-gray-700">Online Banking (FPX)</span>
                      </div>
                      <div className="border border-gray-200 p-4 rounded flex items-center gap-3 cursor-pointer hover:border-gray-400">
                         <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                         <span className="text-gray-700">E-Wallet (GrabPay, TnG)</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Your Order */}
             <div className="w-full lg:w-96">
                <div className="bg-white p-6 shadow-sm border border-gray-100">
                   <h3 className="font-serif font-bold text-lg mb-6 pb-4 border-b border-gray-100">Your Order</h3>
                   <div className="space-y-4 mb-6">
                      {MOCK_CART.map(item => (
                         <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{item.name} <span className="text-xs text-gray-400">x{item.quantity}</span></span>
                            <span className="font-medium">RM {(item.price * item.quantity).toFixed(2)}</span>
                         </div>
                      ))}
                      <div className="border-t border-gray-100 pt-4 flex justify-between text-sm">
                         <span className="font-bold text-gray-900">Subtotal</span>
                         <span>RM 41.40</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span className="font-bold text-gray-900">Shipping</span>
                         <span>RM 15.00</span>
                      </div>
                      <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                         <span className="font-bold text-lg text-gray-900">Total</span>
                         <span className="font-bold text-xl text-[#8B1E1E]">RM 56.40</span>
                      </div>
                   </div>
                   
                   <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                      Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                   </p>

                   <button className="w-full bg-[#8B1E1E] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors">
                      Place Order
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

/**
 * PAGE COMPONENT: PROFILE
 */
const ProfilePage = ({ onLogout }: ProfilePageProps) => {
  return (
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
  );
};

/**
 * PAGE COMPONENT: AUTH (LOGIN & SIGNUP)
 */
const AuthPage = ({ onLogin }: { onLogin: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        onLogin();
    }, 500);
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 animate-in fade-in duration-500">
       <div className="bg-white p-8 md:p-12 shadow-md border border-gray-100 w-full max-w-md">
          <div className="text-center mb-8">
             <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
             <p className="text-sm text-gray-500">
                {isLogin ? 'Login to manage your account.' : 'Register to track orders and save details.'}
             </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
             {!isLogin && (
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500">Full Name</label>
                   <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" required className="w-full border border-gray-200 p-3 pl-12 focus:outline-none focus:border-[#8B1E1E]" placeholder="John Doe" />
                   </div>
                </div>
             )}
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

             {isLogin && (
                <div className="flex justify-between items-center text-xs">
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-[#8B1E1E]" /> Remember me
                   </label>
                   <a href="#" className="text-[#8B1E1E] hover:underline">Forgot password?</a>
                </div>
             )}

             <button 
                type="submit"
                className="w-full bg-[#8B1E1E] text-white py-3 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors mt-4"
             >
                {isLogin ? 'Login' : 'Register'}
             </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm">
             <p className="text-gray-500 mb-4">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
             <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#8B1E1E] font-bold uppercase tracking-widest border-b border-[#8B1E1E] pb-1 hover:text-gray-900 hover:border-gray-900 transition-colors"
             >
                {isLogin ? 'Create Account' : 'Login Here'}
             </button>
          </div>
       </div>
    </div>
  );
};

/**
 * APP COMPONENT
 */
export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateToProduct = (id: number) => {
    setSelectedProductId(id);
    setView('product-detail');
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
      setIsLoggedIn(true);
      setView('profile');
      window.scrollTo(0, 0);
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setView('auth');
      window.scrollTo(0, 0);
  };

  const handleProfileClick = () => {
      if (isLoggedIn) {
          setView('profile');
      } else {
          setView('auth');
      }
      window.scrollTo(0, 0);
  };

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
          <div className="flex flex-row justify-between items-center relative">
            
            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center">
               <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-[#8B1E1E] transition-colors p-1">
                 {isOpen ? <X /> : <Menu />}
               </button>
            </div>
              
            {/* Logo */}
            <div 
              className="flex flex-col items-center group cursor-pointer absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none md:items-start shrink-0"
              onClick={() => { setView('home'); window.scrollTo(0, 0); }}
            >
                <h1 className="text-2xl md:text-3xl font-serif font-black text-[#8B1E1E] tracking-wider group-hover:opacity-90 transition-opacity">MING ANG</h1>
                <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-gray-500 uppercase font-medium group-hover:text-[#8B1E1E] transition-colors">Confectionery</span>
            </div>
  
            {/* Center Navigation - Desktop */}
            <div className="hidden md:flex flex-1 justify-center items-center px-8">
               <div className="flex space-x-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
                  <button onClick={() => setView('home')} className={`transition-colors ${view === 'home' ? 'text-[#8B1E1E]' : 'hover:text-[#8B1E1E]'}`}>Home</button>
                  <button onClick={() => setView('history')} className={`transition-colors ${view === 'history' ? 'text-[#8B1E1E]' : 'hover:text-[#8B1E1E]'}`}>Our Story</button>
                  <button onClick={() => setView('products')} className={`transition-colors ${view === 'products' ? 'text-[#8B1E1E]' : 'hover:text-[#8B1E1E]'}`}>Products</button>
                  <button onClick={() => setView('contact')} className={`transition-colors ${view === 'contact' ? 'text-[#8B1E1E]' : 'hover:text-[#8B1E1E]'}`}>Contact</button>
               </div>
            </div>
  
            {/* Desktop Actions */}
            <div className="flex items-center gap-4 md:gap-6 shrink-0">
               <button onClick={handleProfileClick} className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-gray-800 hover:text-[#8B1E1E]">
                  <User size={20} strokeWidth={2} />
               </button>
  
               {/* Cart Icon */}
               <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('cart')}>
                  <div className="text-right hidden lg:block">
                    <span className="block text-[10px] uppercase text-gray-400 font-bold tracking-wider">Total</span>
                    <span className="block text-sm font-bold text-[#8B1E1E] group-hover:text-red-700 transition-colors">RM 41.40</span>
                  </div>
                  <div className="relative p-2 md:bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors">
                    <ShoppingBag size={20} className="text-gray-800 group-hover:text-[#8B1E1E] transition-colors" />
                    <span className="absolute -top-1 -right-1 bg-[#8B1E1E] text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white">
                      3
                    </span>
                  </div>
               </div>
            </div>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 shadow-xl absolute w-full left-0 top-full animate-in slide-in-from-top-2 duration-200 h-screen z-40">
             <div className="flex flex-col space-y-6 text-base font-medium text-gray-800 items-center text-center">
               <button onClick={() => { setView('home'); setIsOpen(false); }} className="text-[#8B1E1E] font-bold text-xl">Home</button>
               <button onClick={() => { setView('history'); setIsOpen(false); }} className="hover:text-[#8B1E1E]">Our Story</button>
               <button onClick={() => { setView('products'); setIsOpen(false); }} className="hover:text-[#8B1E1E]">Products</button>
               <button onClick={() => { setView('contact'); setIsOpen(false); }} className="hover:text-[#8B1E1E]">Contact</button>
               <button onClick={() => { setView('cart'); setIsOpen(false); }} className="hover:text-[#8B1E1E]">My Cart (3)</button>
               <button onClick={() => { handleProfileClick(); setIsOpen(false); }} className="hover:text-[#8B1E1E]">
                   {isLoggedIn ? 'My Account' : 'Login / Signup'}
               </button>
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

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
      <TopBar />
      <Navbar />
      
      <main>
        {view === 'home' && <HomePage onProductClick={navigateToProduct} onNavigate={setView} />}
        {view === 'history' && <HistoryPage />}
        {view === 'contact' && <ContactPage />}
        {view === 'products' && <ProductListPage onProductClick={navigateToProduct} />}
        {view === 'product-detail' && selectedProductId && <ProductDetailPage productId={selectedProductId} onNavigate={setView} />}
        {view === 'cart' && <CartPage onNavigate={setView} />}
        {view === 'checkout' && <CheckoutPage />}
        {view === 'auth' && <AuthPage onLogin={handleLogin} />}
        {view === 'profile' && <ProfilePage onLogout={handleLogout} />}
      </main>

      <Footer onNavigate={setView} />
    </div>
  );
}