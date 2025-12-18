import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  BiShoppingBag, BiShield, BiHeadphone, BiWrench, BiLaptop
} from "react-icons/bi";
import { HiOutlineSparkles, HiFire, HiLightningBolt } from "react-icons/hi";
import { FiTarget, FiCheckCircle, FiTruck, FiMessageCircle, FiPhone, FiArrowRight } from "react-icons/fi";

const SLOGANS = [
  "Hot Deals on Premium PCs & Laptops!",
  "Lightning-Fast Gaming Rigs & Workstations",
  "Best Prices on Accessories & Upgrades"
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-transparent">
      {/* Hero Section - Full Width */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-midnight via-charcoal/80 to-graphite" />
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-3xl animate-pulse delay-1000"
            style={{ transform: `translate(${-scrollY * 0.1}px, ${-scrollY * 0.1}px)` }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-graphite/50 border border-accent/30 backdrop-blur-sm mb-6">
            <HiOutlineSparkles className="text-cyan" />
            <span className="text-sm font-semibold text-cyan uppercase tracking-wider">
              Shero Digital World
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-text-primary mb-6 leading-tight">
            Power Up Your
            <br />
            <span className="bg-gradient-to-r from-accent via-cyan to-accent bg-clip-text text-transparent animate-pulse">
              Digital Life
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 text-base sm:text-xl md:text-2xl">
            {activeIndex === 0 && <HiFire className="text-accent animate-bounce" />}
            {activeIndex === 1 && <HiLightningBolt className="text-cyan animate-bounce" />}
            {activeIndex === 2 && <FiTarget className="text-accent animate-bounce" />}
            <p className="font-bold text-cyan">
              {SLOGANS[activeIndex]}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/products"
              className="group relative px-8 py-4 bg-gradient-to-r from-accent to-cyan text-white font-bold text-lg rounded-xl shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <BiShoppingBag className="text-2xl" />
                Explore Products
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-accent/50 text-text-primary font-bold text-lg rounded-xl hover:border-cyan hover:text-cyan hover:bg-graphite/50 transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="bg-graphite/50 backdrop-blur-sm border border-accent/20 rounded-xl p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-cyan mb-1">1000+</div>
              <div className="text-xs sm:text-sm text-secondary">Happy Customers</div>
            </div>
            <div className="bg-graphite/50 backdrop-blur-sm border border-accent/20 rounded-xl p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-cyan mb-1">500+</div>
              <div className="text-xs sm:text-sm text-secondary">Products</div>
            </div>
            <div className="bg-graphite/50 backdrop-blur-sm border border-accent/20 rounded-xl p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-cyan mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-secondary">Support</div>
            </div>
            <div className="bg-graphite/50 backdrop-blur-sm border border-accent/20 rounded-xl p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-cyan mb-1">100%</div>
              <div className="text-xs sm:text-sm text-secondary">Genuine</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="relative py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Shop by Category
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto px-4">
              Discover our wide range of PCs, laptops, and premium accessories
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* PCs & Laptops Card */}
            <Link
              to="/products"
              className="group relative bg-graphite border-2 border-graphite rounded-2xl p-6 sm:p-8 hover:border-accent transition-all hover:shadow-2xl hover:shadow-accent/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all" />
              <BiLaptop className="text-5xl sm:text-6xl text-cyan mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">PCs & Laptops</h3>
              <p className="text-sm sm:text-base text-secondary mb-4">
                Latest models, custom builds, and gaming rigs for every need
              </p>
              <div className="flex items-center gap-2 text-cyan font-semibold text-sm sm:text-base">
                Shop Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Accessories Card */}
            <Link
              to="/products"
              className="group relative bg-graphite border-2 border-graphite rounded-2xl p-6 sm:p-8 hover:border-cyan transition-all hover:shadow-2xl hover:shadow-cyan/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 rounded-full blur-2xl group-hover:bg-cyan/20 transition-all" />
              <BiHeadphone className="text-5xl sm:text-6xl text-cyan mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">Accessories</h3>
              <p className="text-sm sm:text-base text-secondary mb-4">
                Keyboards, mice, monitors, and all the essentials
              </p>
              <div className="flex items-center gap-2 text-cyan font-semibold text-sm sm:text-base">
                Shop Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Services Card */}
            <Link
              to="/about"
              className="group relative bg-graphite border-2 border-graphite rounded-2xl p-6 sm:p-8 hover:border-accent transition-all hover:shadow-2xl hover:shadow-accent/20 overflow-hidden sm:col-span-2 md:col-span-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all" />
              <BiWrench className="text-5xl sm:text-6xl text-cyan mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">Services</h3>
              <p className="text-sm sm:text-base text-secondary mb-4">
                Repairs, upgrades, and expert technical support
              </p>
              <div className="flex items-center gap-2 text-cyan font-semibold text-sm sm:text-base">
                Learn More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Why Choose Shero Digital World?
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto px-4">
              We're committed to providing the best products and service
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Genuine Products</h3>
              <p className="text-secondary text-sm">
                Only authentic products with official warranties
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <BiShield className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Full Warranty</h3>
              <p className="text-secondary text-sm">
                Comprehensive warranty coverage on all products
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiTruck className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Fast Delivery</h3>
              <p className="text-secondary text-sm">
                Quick and reliable shipping across the island
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiMessageCircle className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">24/7 Support</h3>
              <p className="text-secondary text-sm">
                Round-the-clock customer service and support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative py-16 bg-gradient-to-r from-accent/20 via-cyan/20 to-accent/20 border-y border-accent/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center">
                <HiFire className="text-white text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  Flash Sale - Limited Time!
                </h3>
                <p className="text-secondary">
                  Get up to 30% OFF on selected PCs, laptops & accessories
                </p>
              </div>
            </div>
            <Link
              to="/products"
              className="px-8 py-3 bg-gradient-to-r from-accent to-cyan text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent/50 transition-all flex items-center gap-2"
            >
              Shop Sale <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Ready to Upgrade?
          </h2>
          <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
            Browse our collection of premium PCs, laptops, and accessories. 
            Find exactly what you need at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-10 py-4 bg-gradient-to-r from-accent to-cyan text-white font-bold text-lg rounded-xl shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-105 flex items-center gap-2"
            >
              <BiShoppingBag className="text-2xl" />
              Browse All Products
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border-2 border-accent/50 text-text-primary font-bold text-lg rounded-xl hover:border-cyan hover:text-cyan hover:bg-graphite/50 transition-all flex items-center gap-2"
            >
              <FiPhone />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
