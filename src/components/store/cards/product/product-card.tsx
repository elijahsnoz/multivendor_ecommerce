"use client";
import { ProductType, VariantSimplified } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import ProductCardImageSwiper from "./swiper";
import VariantSwitcher from "./variant-switcher";
import { cn } from "@/lib/utils";
import { Button } from "@/components/store/ui/button";
import { Heart, Sparkles } from "lucide-react";
import ProductPrice from "../../product-page/product-info/product-price";
import { addToWishlist } from "@/queries/user";
import toast from "react-hot-toast";
import AIPoweredBadge from "../../shared/ai-powered-badge";
import StockIndicator from "../../shared/stock-indicator";

export default function ProductCard({ product }: { product: ProductType }) {
  const { name, slug, rating, sales, variantImages, variants, id } = product;
  const [variant, setVariant] = useState<VariantSimplified>(variants[0]);
  const { variantSlug, variantName, images, sizes } = variant;

  // Calculate total stock - using quantity property from Size type
  const totalStock = sizes.reduce((acc, size) => acc + (size.quantity || 0), 0);
  
  // Determine if product should get AI badge (example: high rating and sales)
  const shouldShowAIBadge = rating >= 4.5 && sales > 100;

  const handleaddToWishlist = async () => {
    try {
      const res = await addToWishlist(id, variant.variantId);
      if (res) toast.success("Product successfully added to wishlist.");
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  return (
    <div>
      <div
        className={cn(
          "group w-48 sm:w-[225px] relative transition-all duration-300 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm ease-in-out p-4 rounded-t-3xl border border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/40 hover:border-cyan-400/60 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-slate-800/95 hover:to-slate-900/95",
          {
            "": true,
          }
        )}
      >
        {/* AI Badge */}
        {shouldShowAIBadge && (
          <div className="absolute top-2 left-2 z-20">
            <AIPoweredBadge type="recommended" />
          </div>
        )}
        
        <div className="relative w-full h-full">
          <Link
            href={`/product/${slug}/${variantSlug}`}
            className="w-full relative inline-block overflow-hidden"
          >
            {/* Images Swiper with glow effect */}
            <div className="relative group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-shadow duration-300 rounded-xl overflow-hidden">
              <ProductCardImageSwiper images={images} />
            </div>
            
            {/* Stock Indicator */}
            {totalStock <= 10 && totalStock > 0 && (
              <div className="mt-2">
                <StockIndicator stock={totalStock} threshold={10} />
              </div>
            )}
            
            {/* Title */}
            <div className="text-sm text-cyan-100 h-[18px] overflow-hidden overflow-ellipsis line-clamp-1 mt-2 font-medium group-hover:text-cyan-300 transition-colors">
              {name} · {variantName}
            </div>
            {/* Rating - Sales */}
            {product.rating > 0 && product.sales > 0 && (
              <div className="flex items-center gap-x-1 h-5">
                <ReactStars
                  count={5}
                  size={24}
                  color="#F5F5F5"
                  activeColor="#FFD804"
                  value={rating}
                  isHalf
                  edit={false}
                />
                <div className="text-xs text-slate-400">{sales} sold</div>
              </div>
            )}
            {/* Price */}
            <ProductPrice sizes={sizes} isCard handleChange={() => {}} />
          </Link>
        </div>
        <div className="hidden group-hover:block absolute -left-[1px] bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-t-0 border-cyan-400/50 w-[calc(100%+2px)] px-4 pb-4 rounded-b-3xl shadow-2xl shadow-cyan-500/40 z-30 space-y-2">
          {/* Variant switcher */}
          <VariantSwitcher
            images={variantImages}
            variants={variants}
            setVariant={setVariant}
            selectedVariant={variant}
          />
          {/* Action buttons with glow effect */}
          <div className="flex flex-items gap-x-1">
            <Button className="relative overflow-hidden group/btn">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
              <Link href={`/product/${slug}/${variantSlug}`}>Add to cart</Link>
            </Button>
            <Button
              variant="black"
              size="icon"
              onClick={() => handleaddToWishlist()}
              className="hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 transition-all duration-300"
            >
              <Heart className="w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
