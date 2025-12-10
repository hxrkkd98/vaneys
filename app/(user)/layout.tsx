import { TopBar } from '@/components/user/TopBar';
import { Navbar } from '@/components/user/Navbar';
import { Footer } from '@/components/user/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}