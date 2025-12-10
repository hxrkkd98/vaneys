import { Phone, Mail } from 'lucide-react';

export const TopBar = () => (
  <div className="bg-[#8B1E1E] text-white text-[11px] py-2 hidden md:block tracking-wide">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex gap-6">
        <span className="flex items-center gap-2 hover:text-yellow-200 transition-colors cursor-pointer"><Phone size={11} /> 018-0000000</span>
        <span className="flex items-center gap-2 hover:text-yellow-200 transition-colors cursor-pointer"><Mail size={11} /> support@vaneys.my</span>
      </div>
      <div className="flex gap-6 font-medium">
        {/* <a href="#" className="hover:text-yellow-200 transition-colors">Order Policy</a>
        <a href="#" className="hover:text-yellow-200 transition-colors">FAQ</a> */}
      </div>
    </div>
  </div>
);