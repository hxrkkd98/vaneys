import { MapPin, CreditCard } from 'lucide-react';
import { PRODUCTS } from "@/data/mock-data";
import { CartItem } from "@/types/storefront";
export default function CheckoutPage() {

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
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Billing Details */}
                    <div className="flex-1">
                        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><MapPin size={20} className="text-[#8B1E1E]" /> Billing Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">First Name *</label>
                                <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Last Name *</label>
                                <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Address *</label>
                                <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" placeholder="Street address" />
                                <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E] mt-2" placeholder="Apartment, suite, unit etc. (optional)" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">State / Province *</label>
                                <select className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]">
                                    <option>Johor</option>
                                    <option>Selangor</option>
                                    <option>Kuala Lumpur</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Postcode / ZIP *</label>
                                <input type="text" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Phone *</label>
                                <input type="tel" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Email Address *</label>
                                <input type="email" className="w-full border border-gray-200 p-3 focus:outline-none focus:border-[#8B1E1E]" />
                            </div>
                        </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><CreditCard size={20} className="text-[#8B1E1E]" /> Payment Method</h3>
                        <div className="space-y-4">
                            <div className="border border-[#8B1E1E] bg-red-50 p-4 rounded flex items-center justify-between cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border-4 border-[#8B1E1E]"></div>
                                    <span className="font-bold text-gray-900">Credit Card / Debit Card</span>
                                </div>
                                <div className="flex gap-2">
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="border border-gray-200 p-4 rounded flex items-center gap-3 cursor-pointer hover:border-gray-400">
                                <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                                <span className="text-gray-700">Online Banking (FPX)</span>
                            </div>
                            <div className="border border-gray-200 p-4 rounded flex items-center gap-3 cursor-pointer hover:border-gray-400">
                                <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                                <span className="text-gray-700">E-Wallet (GrabPay, TnG)</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Your Order */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white p-6 shadow-sm border border-gray-100">
                        <h3 className="font-serif font-bold text-lg mb-6 pb-4 border-b border-gray-100">Your Order</h3>
                        <div className="space-y-4 mb-6">
                            {MOCK_CART.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{item.name} <span className="text-xs text-gray-400">x{item.quantity}</span></span>
                                    <span className="font-medium">RM {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t border-gray-100 pt-4 flex justify-between text-sm">
                                <span className="font-bold text-gray-900">Subtotal</span>
                                <span>RM 41.40</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-bold text-gray-900">Shipping</span>
                                <span>RM 15.00</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                                <span className="font-bold text-lg text-gray-900">Total</span>
                                <span className="font-bold text-xl text-[#8B1E1E]">RM 56.40</span>
                            </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                        </p>

                        <button className="w-full bg-[#8B1E1E] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors">
                            Place Order
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </div>
  );
}