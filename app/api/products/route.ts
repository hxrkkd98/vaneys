import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // Ensure this path matches your setup

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // 1. Extract params
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";

  // Calculate pagination range for Supabase (0-based index)
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    // 2. Start building the query
    // We select '*' to get all columns, and count: 'exact' to get the total number of rows for pagination
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    // 3. Apply Filters
    if (search) {
      // 'ilike' is case-insensitive search
      query = query.ilike('product_name', `%${search}%`);
    }

    if (category && category !== 'all') {
      // Exact match for category
      // Note: Make sure your select values in the frontend match the DB values (e.g., "Bottle" vs "bottle")
      query = query.eq('product_category', category);
    }

    // 4. Apply Pagination
    // Order by newest first (descending ID or created_at)
    query = query
      .order('id', { ascending: false })
      .range(from, to);

    // 5. Execute Query
    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 6. Map Database Columns to Frontend Interface
    // Database: product_name, product_price, etc.
    // Frontend (Product Type): name, price, etc.
    const formattedProducts = data?.map((item) => ({
      id: item.id,
      name: item.product_name,
      category: item.product_category,
      price: item.product_price,
      status: item.product_status || 'active', // Fallback if null
      image: item.product_image,
    }));

    return NextResponse.json({
      data: formattedProducts,
      total: count || 0,
    });

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}