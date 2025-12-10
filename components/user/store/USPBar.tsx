import { Package, Truck, Clock, ShieldCheck, LucideIcon } from 'lucide-react';

interface USPItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const USPBar = () => {
  const items: USPItem[] = [
    { icon: Package, title: "Order Online", desc: "Browse Our Products" },
    { icon: Truck, title: "Shipping", desc: "Deliver or Pickup Self" },
    { icon: Clock, title: "On Time", desc: "Ready Before CNY" },
    { icon: ShieldCheck, title: "Secure", desc: "Baked with Good Ingredient" },
  ];

  return (
    <div className="bg-[#fcfbf9] border-b border-gray-100 relative z-20 -mt-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4">
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