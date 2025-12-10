import Link from "next/link";
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  link?: string;
}

export const SectionHeader = ({ title, subtitle, link }: SectionHeaderProps) => (
  <div className="flex flex-col items-center text-center mb-12">
     <span className="text-[#8B1E1E] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Vaneys Online</span>
     <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4">{title}</h2>
     <div className="w-16 h-1 bg-[#8B1E1E] mb-4"></div>
     <p className="text-sm text-gray-500 max-w-2xl px-4">{subtitle}</p>
     {link && (
       <Link href={link} className="mt-6 text-[#8B1E1E] border-b border-[#8B1E1E] pb-1 text-xs font-bold uppercase tracking-widest hover:text-gray-900 hover:border-gray-900 transition-colors">
         View More
       </Link>

     )}
  </div>
);