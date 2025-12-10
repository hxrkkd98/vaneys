import { Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { PRODUCTS } from "@/data/mock-data";
import { CartItem } from "@/types/storefront";
import Link from "next/link";

export default function CartPage() {

    const MOCK_CART: CartItem[] = [
        { ...PRODUCTS[0], quantity: 2 },
        { ...PRODUCTS[3], quantity: 1 },
    ];

    const subtotal = MOCK_CART.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 15;
    const total = subtotal + shipping;

  return (
    <div className="bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
        <div className="bg-gray-50 min-h-screen py-12 animate-in fade-in duration-500">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 bg-white p-6 shadow-sm border border-gray-100">
                        <table className="w-full">
                        <thead className="border-b border-gray-100 text-left">
                            <tr>
                                <th className="pb-4 text-xs font-bold uppercase text-gray-500">Product</th>
                                <th className="pb-4 text-xs font-bold uppercase text-gray-500">Price</th>
                                <th className="pb-4 text-xs font-bold uppercase text-gray-500">Quantity</th>
                                <th className="pb-4 text-xs font-bold uppercase text-gray-500 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {MOCK_CART.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-50 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h3>
                                            <p className="text-xs text-gray-500">{item.tag || 'Standard Pack'}</p>
                                            <button className="text-red-500 text-xs mt-2 flex items-center gap-1 hover:text-red-700">
                                                <Trash2 size={12} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="py-6 text-sm font-medium">RM {item.price.toFixed(2)}</td>
                                    <td className="py-6">
                                    <div className="flex items-center border border-gray-200 w-fit">
                                        <button className="p-2 hover:bg-gray-50 text-gray-500"><Minus size={12} /></button>
                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                        <button className="p-2 hover:bg-gray-50 text-gray-500"><Plus size={12} /></button>
                                    </div>
                                    </td>
                                    <td className="py-6 text-right font-bold text-[#8B1E1E]">
                                    RM {(item.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="w-full lg:w-96 bg-white p-6 shadow-sm border border-gray-100 h-fit">
                        <h3 className="font-serif font-bold text-lg mb-6 pb-4 border-b border-gray-100">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-bold">RM {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-bold">{shipping === 0 ? 'Free' : `RM ${shipping.toFixed(2)}`}</span>
                        </div>
                        {shipping > 0 && (
                            <p className="text-[10px] text-red-500 italic">Add RM {(200 - subtotal).toFixed(2)} more for free shipping</p>
                        )}
                        </div>
                        <div className="border-t border-gray-100 pt-4 mb-8">
                        <div className="flex justify-between items-end">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-[#8B1E1E]">RM {total.toFixed(2)}</span>
                        </div>
                        </div>
                        <Link href="/checkout" className="block w-full text-center bg-[#8B1E1E] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors mb-4">
                            Proceed to Checkout
                        </Link>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <ShieldCheck size={14} /> Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}