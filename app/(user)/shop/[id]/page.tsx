import { PRODUCTS } from '@/data/mock-data';
import ProductView from '@/components/user/section/ProductView'; // Import the client component

interface Props {
  params: Promise<{ id: string}>;
}

// This is a Server Component (no "use client"), so it can be async
export default async function ProductDetailsPage({ params }: Props) {
  // 1. Await the params (Allowed here!)
  const { id } = await params;
  
  // 2. Fetch data (Logic runs on server)
  // Converting id to number since your mock data IDs are likely numbers
  const productId = parseInt(id);
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // 3. Pass data to the Client Component
  return <ProductView product={product} />;
}