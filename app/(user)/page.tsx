import { HeroSlider } from '@/components/user/store/HeroSlider';
import { USPBar } from '@/components/user/store/USPBar';
import { SectionHeader } from '@/components/user/ui/SectionHeader';
import { ProductCard } from '@/components/user/ui/ProductCard';
import Link from 'next/link'; 

// Helper to fetch from YOUR new API
async function getProducts() {
  // Use localhost for server-side fetching in dev, or your production domain
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  try {
    // We fetch from /api/products (Note: (user) group is ignored in URL)
    const res = await fetch(`${baseUrl}/api/shop/products`, { 
      cache: 'no-store' // Ensure we always get fresh data for the prototype
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return []; // Return empty array on error so page doesn't crash
  }
}

export default async function HomePage() {
  // 1. Call your own API
  const allProducts = await getProducts();

  // 2. Slice Data for Sections
  const hotSellingProducts = allProducts.slice(0, 3); // Max 3
  const signatureProducts = allProducts.slice(0, 6);  // Max 6

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
    
      <main>
        <HeroSlider />
        <USPBar />

        {/* Latest Promotions (HOT SELLING) */}
        <section className="py-20 bg-white" id="shop">
          <div className="container mx-auto px-4">
            <SectionHeader 
               title="HOT SELLING" 
               subtitle="Grab these hot selling products before they are out of stock! Experience the taste of tradition at unbeatable prices." 
               link="/shop" 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {hotSellingProducts.map((product: any) => (
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
                 Satisfy your cravings with our signature Feng Li Su, Creamy Milk Biscuit and many more! 
                 Baked hot from the oven to ensure maximum freshness and quality.
              </p>
              <div className="mx-auto w-fit">
              <Link href="/shop" className="flex items-center justify-center w-fit bg-white text-[#8B1E1E] px-10 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-colors shadow-2xl">
                 View Fresh Bakery
              </Link>
              </div>
           </div>
        </section>

        {/* Signature Products */}
        <section className="py-24 bg-[#fcfbf9]">
          <div className="container mx-auto px-4">
            <SectionHeader 
               title="Customer Favorites" 
               subtitle="Discover our best-selling pastries loved by thousands across Malaysia and Singapore." 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {signatureProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-16 text-center">
               <Link href="/shop" className="border border-gray-800 text-gray-800 px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#8B1E1E] hover:border-[#8B1E1E] hover:text-white transition-all duration-300">
                  Load More Products
               </Link>
            </div>
          </div>
        </section>

      </main>
 
    </div>
  );
}