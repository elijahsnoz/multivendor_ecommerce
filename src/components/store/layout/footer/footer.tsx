import { getSubcategories } from "@/queries/subCategory";
import Contact from "./contact";
import Links from "./links";
import Newsletter from "./newsletter";
import PaymentLogos from "../../shared/payment-logos";
import { Shield, Award, HeadphonesIcon } from "lucide-react";

export default async function Footer() {
  const subs = await getSubcategories(7, true);
  return (
    <div className="w-full bg-gradient-to-b from-white to-slate-50">
      <Newsletter />
      <div className="max-w-[1430px] mx-auto">
        <div className="p-5">
          <div className="grid md:grid-cols-2 md:gap-x-5">
            <Contact />
            <Links subs={subs} />
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="px-5 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
              <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-800">100% Secure Payments</p>
                <p className="text-[10px] text-slate-600">Protected by SSL encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-800">Trusted by 50K+ Customers</p>
                <p className="text-[10px] text-slate-600">4.8/5 average rating</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <HeadphonesIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-800">24/7 Customer Support</p>
                <p className="text-[10px] text-slate-600">We're here to help</p>
              </div>
            </div>
          </div>
          
          {/* Payment Logos */}
          <PaymentLogos variant="light" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-cyber-dark via-slate-900 to-cyber-dark border-t border-cyan-500/20 px-2 text-white relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-5" />
        
        <div className="relative max-w-[1430px] mx-auto flex flex-col md:flex-row items-center justify-between py-4 gap-2">
          <span className="text-sm flex items-center gap-2">
            <b className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              © NexaShop 2024
            </b>
            <span className="text-slate-400">- All Rights Reserved</span>
          </span>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">Returns & Refunds</a>
          </div>
        </div>
      </div>
    </div>
  );
}
