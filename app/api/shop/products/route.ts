import { NextResponse } from 'next/server';
import { createClient } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supabase = await createClient();
  // Extract params
  const categoryParam = searchParams.get('category');
  const minPrice = searchParams.get('min');
  const maxPrice = searchParams.get('max');
  const sort = searchParams.get('sort');

  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('product_status', 'active');

    // --- Apply Filters ---
    if (categoryParam && categoryParam !== 'All') {
      // Logic: If comma exists, look for multiple exact matches (e.g. bottle OR gift set)
      if (categoryParam.includes(',')) {
        const categories = categoryParam.split(',').map(c => c.trim());
        query = query.in('product_category', categories);
      } else {
        // Single category: Partial match (e.g. "Pastry" matches "CNY Pastries")
        query = query.ilike('product_category', `%${categoryParam}%`);
      }
    }
    
    if (minPrice) query = query.gte('product_price', minPrice);
    if (maxPrice) query = query.lte('product_price', maxPrice);

    // --- Apply Sorting ---
    switch (sort) {
      case 'price_asc':
        query = query.order('product_price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('product_price', { ascending: false });
        break;
      case 'latest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    const { data: products, error } = await query;

    if (error) throw error;

    // Map DB columns to Frontend standard
    const formattedProducts = products.map((p) => ({
      id: p.id,
      name: p.product_name,
      price: p.product_price,
      // Handle null images
      image: p.product_image || '/placeholder.jpg', 
      category: p.product_category,
      description: p.product_description,
    }));

    return NextResponse.json(formattedProducts);
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}