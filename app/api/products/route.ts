import { NextResponse } from "next/server";
import { Product } from "@/types/product";

// --- 1. Update Dummy Data Categories ---
const generateProducts = (): Product[] => {
  return Array.from({ length: 50 }).map((_, i) => {
    const id = i + 1;
    const statuses = ["active", "draft", "out_of_stock"] as const;
    
    // UPDATED: Use the specific categories you requested
    const categories = ["Bottle", "Giftset"]; 

    return {
      id: `PROD-${1000 + id}`,
      name: `Product Sample ${id}`,
      category: categories[id % 2], // Randomly assigns Bottle/Giftset etc.
      price: Math.floor(Math.random() * 500) + 20,
      status: statuses[id % 3],
      image: `https://picsum.photos/seed/${id}/200/200`,
    };
  });
};

const DUMMY_DB = generateProducts();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all"; // <--- New: Get category param

  await new Promise((resolve) => setTimeout(resolve, 500));

  // --- Step A: Filter Data ---
  let filteredData = DUMMY_DB;
  
  // 1. Filter by Search
  if (search) {
    filteredData = filteredData.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 2. Filter by Category (New Logic)
  if (category && category !== "all") {
    filteredData = filteredData.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // --- Step B: Paginate ---
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedData,
    total: filteredData.length,
  });
}