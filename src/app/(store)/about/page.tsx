import Header from "@/components/store/layout/header/header";
import Footer from "@/components/store/layout/footer/footer";
import { Shield, Users, Award, Sparkles, Zap, Globe, Heart, TrendingUp } from "lucide-react";
import PaymentLogos from "@/components/store/shared/payment-logos";
import CustomerStats from "@/components/store/shared/customer-stats";

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your security is our priority. All transactions are encrypted and protected.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Shopping",
      description: "Experience the future of shopping with our intelligent product recommendations.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We're committed to providing exceptional service and support 24/7.",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Connecting verified sellers and buyers from around the world.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const milestones = [
    { year: "2020", event: "NexaShop Founded", description: "Started with a vision to revolutionize online shopping" },
    { year: "2021", event: "10K Customers", description: "Reached our first major milestone" },
    { year: "2022", event: "AI Integration", description: "Launched AI-powered shopping assistant" },
    { year: "2023", event: "50K+ Happy Customers", description: "Became a trusted marketplace for thousands" },
    { year: "2024", event: "Going Global", description: "Expanding to international markets" },
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-cyber-dark via-slate-900 to-cyber-dark text-white py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-extrabold">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                About NexaShop
              </span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The future of online shopping is here. We're not just a marketplace – 
            we're your AI-powered shopping companion, connecting you with verified sellers 
            and the best products from around the world.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                To revolutionize online shopping by combining cutting-edge AI technology 
                with a trusted multivendor marketplace, making it easier than ever for 
                customers to find exactly what they need.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                We believe shopping should be intelligent, secure, and delightful. 
                That's why we've built a platform that understands your needs and 
                connects you with quality products from verified sellers worldwide.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-3xl opacity-20 rounded-full" />
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      50K+
                    </div>
                    <p className="text-sm text-slate-600">Happy Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      10K+
                    </div>
                    <p className="text-sm text-slate-600">Products</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      1K+
                    </div>
                    <p className="text-sm text-slate-600">Verified Sellers</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                      4.8★
                    </div>
                    <p className="text-sm text-slate-600">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              What We Stand For
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-slate-50 to-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-2xl`} />
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${value.gradient} mb-4 shadow-lg`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start group">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 border border-slate-200 group-hover:border-cyan-500/30 group-hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{milestone.event}</h3>
                  <p className="text-slate-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Stats */}
      <CustomerStats />

      {/* Trust Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Why Customers Trust Us
            </span>
          </h2>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            We're committed to providing a secure, seamless shopping experience with 
            industry-leading protection for every transaction.
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <PaymentLogos variant="light" />
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="relative bg-gradient-to-r from-cyber-dark via-slate-900 to-cyber-dark text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Have Questions?
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Our 24/7 support team is always here to help you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              Contact Support
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-lg font-semibold hover:border-cyan-500 transition-all duration-300"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
