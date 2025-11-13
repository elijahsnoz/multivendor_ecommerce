import Header from "@/components/store/layout/header/header";
import Footer from "@/components/store/layout/footer/footer";
import ProductCard from "@/components/store/cards/product/product-card";
import { SimpleProduct } from "@/lib/types";
import { getHomeDataDynamic, getHomeFeaturedCategories } from "@/queries/home";
import { getProducts } from "@/queries/product";
import TrustBar from "@/components/store/shared/trust-bar";
import LivePurchaseNotification from "@/components/store/shared/live-purchase-notification";
import SpaceBackground from "@/components/store/shared/space-background";
import SpaceHero from "@/components/store/home/space-hero";
import SpaceCategories from "@/components/store/home/space-categories";
import SpaceFeaturedDeals from "@/components/store/home/space-featured-deals";
import SpaceProductSection from "@/components/store/home/space-product-section";
import CustomerStats from "@/components/store/shared/customer-stats";

export default async function HomePage() {
  const productsData = await getProducts({}, "", 1, 100);
  const { products } = productsData;

  const {
    products_super_deals,
    products_best_deals,
    products_user_card,
    products_featured,
  } = await getHomeDataDynamic([
    { property: "offer", value: "best-deals", type: "simple" },
    { property: "offer", value: "super-deals", type: "full" },
    { property: "offer", value: "user-card", type: "simple" },
    { property: "offer", value: "featured", type: "simple" },
  ]);
  
  const featuredCategories = await getHomeFeaturedCategories();

  // Convert SimpleProduct to ProductType where needed
  const bestDealsProducts = products_best_deals.filter(
    (product): product is SimpleProduct => "variantSlug" in product
  );
  
  // Only use regular products for super deals section since it returns mixed types
  const superDealsProducts = products.slice(24, 36);
  
  const featuredProductsSimple = products_featured.filter(
    (product): product is SimpleProduct => "variantSlug" in product
  );

  return (
    <SpaceBackground>
      <Header />
      <TrustBar />
      <LivePurchaseNotification />
      
      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto px-4 py-6 space-y-8">
        
        {/* Hero Section */}
        <SpaceHero />

        {/* Categories Grid */}
        <SpaceCategories categories={featuredCategories} />

        {/* Featured Hot Deals */}
        <SpaceFeaturedDeals products={bestDealsProducts} />

        {/* Trending Products */}
        <SpaceProductSection
          title="Trending Across the Cosmos"
          products={products}
          icon="trending"
          viewAllLink="/browse?sort=trending"
        />

        {/* Best Sellers */}
        <SpaceProductSection
          title="Galactic Best Sellers"
          products={superDealsProducts}
          icon="deals"
          viewAllLink="/browse?offer=super-deals"
        />

        {/* New Arrivals */}
        <SpaceProductSection
          title="New in the Nebula"
          products={products.slice(12, 24)}
          icon="new"
          viewAllLink="/browse?sort=newest"
        />

        {/* Customer Stats with space theme */}
        <div className="my-16">
          <CustomerStats />
        </div>

        {/* More Products */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Explore More
            </span>
          </h2>
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
              {products.map((product, i) => (
                <div key={i} className="transform hover:scale-105 transition-transform duration-300">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </SpaceBackground>
  );
}
