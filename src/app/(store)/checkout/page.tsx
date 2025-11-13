import CheckoutContainer from "@/components/store/checkout-page/container";
import Header from "@/components/store/layout/header/header";
import { db } from "@/lib/db";
import { Country } from "@/lib/types";
import { getUserShippingAddresses } from "@/queries/user";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SecurityBadges from "@/components/store/shared/security-badges";
import PaymentLogos from "@/components/store/shared/payment-logos";
import { Shield, Lock } from "lucide-react";

export default async function CheckoutPage() {
  const user = await currentUser();
  if (!user) redirect("/cart");

  // Get user cart
  const cart = await db.cart.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      cartItems: true,
      coupon: {
        include: {
          store: true,
        },
      },
    },
  });

  if (!cart) redirect("/cart");

  // Get user shipping address
  const addresses = await getUserShippingAddresses();

  // Get list of countries
  const countries = await db.country.findMany({
    orderBy: { name: "desc" },
  });

  // Get cookies from the store
  const cookieStore = cookies();
  const userCountryCookie = cookieStore.get("userCountry");

  // Set default country if cookie is missing
  let userCountry: Country = {
    name: "United States",
    city: "",
    code: "US",
    region: "",
  };

  // If cookie exists, update the user country
  if (userCountryCookie) {
    userCountry = JSON.parse(userCountryCookie.value) as Country;
  }

  return (
    <>
      <Header />
      
      {/* Secure Checkout Header */}
      <div className="bg-gradient-to-r from-green-950 via-emerald-950 to-green-950 border-b border-green-500/30 py-4">
        <div className="max-w-container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-lg opacity-50 animate-pulse" />
              <Shield className="relative w-6 h-6 text-green-400" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-400" />
                Secure Checkout
              </h2>
              <p className="text-sm text-green-300">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                ✓
              </div>
              <span className="text-sm font-medium text-slate-700">Cart</span>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm animate-pulse">
                2
              </div>
              <span className="text-sm font-bold text-cyan-600">Checkout</span>
            </div>
            <div className="w-16 h-0.5 bg-slate-300" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-500 font-bold text-sm">
                3
              </div>
              <span className="text-sm text-slate-500">Confirmation</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-[calc(100vh-65px)]">
        <div className="max-w-container mx-auto py-5 px-2">
          <CheckoutContainer
            cart={cart}
            countries={countries}
            addresses={addresses}
            userCountry={userCountry}
          />
        </div>
        
        {/* Security & Payment Info */}
        <div className="max-w-container mx-auto px-2 pb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <SecurityBadges />
            <PaymentLogos variant="light" />
          </div>
        </div>
      </div>
    </>
  );
}
