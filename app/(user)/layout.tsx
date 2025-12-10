import { TopBar } from '@/components/user/TopBar';
import { Navbar } from '@/components/user/Navbar';
import { Footer } from '@/components/user/Footer';
import { createClient } from '@/lib/supabaseServer';
import StoreInitializer from '@/components/user/StoreInitializer';


export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createClient();
  
  // 1. Fetch User on the Server
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <>
      <StoreInitializer user={user} />
      <TopBar />
      <Navbar/>
      <main>{children}</main>
      <Footer />
    </>
  );
}