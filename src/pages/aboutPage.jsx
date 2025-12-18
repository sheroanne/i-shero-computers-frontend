import { Link } from "react-router-dom";
import { 
  BiShield, BiHeadphone, BiWrench, BiLaptop, BiCheckCircle
} from "react-icons/bi";
import { 
  FiTarget, FiTruck, FiMessageCircle, FiAward, FiUsers, FiTrendingUp
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

export default function AboutPage() {
  return (
    <div className="w-full bg-transparent">
      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-midnight via-charcoal/80 to-graphite overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-3xl"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-graphite/50 border border-accent/30 backdrop-blur-sm mb-6">
            <HiOutlineSparkles className="text-cyan" />
            <span className="text-sm font-semibold text-cyan uppercase tracking-wider">
              About Us
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-text-primary mb-6 leading-tight px-4">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-accent via-cyan to-accent bg-clip-text text-transparent">
              Shero Digital World
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto px-4">
            Your trusted partner for premium PCs, laptops, and accessories. 
            We're committed to bringing you the latest technology at unbeatable prices.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-secondary text-lg leading-relaxed">
                <p>
                  Shero Digital World was founded with a simple mission: to make cutting-edge 
                  technology accessible to everyone. We understand that finding the right PC, 
                  laptop, or accessory can be overwhelming, which is why we're here to help.
                </p>
                <p>
                  With years of experience in the tech industry, our team is dedicated to 
                  providing genuine products, expert advice, and exceptional customer service. 
                  We believe that everyone deserves access to quality technology that enhances 
                  their digital life.
                </p>
                <p>
                  Whether you're a gamer looking for the perfect rig, a professional in need 
                  of a reliable workstation, or someone seeking the latest accessories, we've 
                  got you covered.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-graphite border-2 border-accent/30 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan mb-2">1000+</div>
                    <div className="text-sm text-secondary">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan mb-2">500+</div>
                    <div className="text-sm text-secondary">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan mb-2">5+</div>
                    <div className="text-sm text-secondary">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan mb-2">24/7</div>
                    <div className="text-sm text-secondary">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="relative py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Our Values
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto px-4">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiTarget className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Quality First</h3>
              <p className="text-secondary text-sm">
                We only offer genuine, high-quality products from trusted manufacturers. 
                Every item is carefully selected to meet our strict quality standards.
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <BiShield className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Trust & Transparency</h3>
              <p className="text-secondary text-sm">
                We believe in honest pricing, clear communication, and building lasting 
                relationships with our customers based on trust.
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Customer Focus</h3>
              <p className="text-secondary text-sm">
                Your satisfaction is our priority. We're always here to help, whether you 
                need product advice, technical support, or after-sales service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Why Choose Us?
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto px-4">
              What sets Shero Digital World apart from the rest
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <BiCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Genuine Products</h3>
              <p className="text-secondary text-sm">
                Only authentic products with official warranties and certifications
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <BiShield className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Full Warranty</h3>
              <p className="text-secondary text-sm">
                Comprehensive warranty coverage on all products for your peace of mind
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiTruck className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Fast Delivery</h3>
              <p className="text-secondary text-sm">
                Quick and reliable shipping across Sri Lanka with secure packaging
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiMessageCircle className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">24/7 Support</h3>
              <p className="text-secondary text-sm">
                Round-the-clock customer service and technical support whenever you need it
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiAward className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Expert Advice</h3>
              <p className="text-secondary text-sm">
                Get personalized recommendations from our knowledgeable team
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <FiTrendingUp className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Best Prices</h3>
              <p className="text-secondary text-sm">
                Competitive pricing with regular deals and special offers
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <BiWrench className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Repair Services</h3>
              <p className="text-secondary text-sm">
                Professional repair and upgrade services for all your tech needs
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 hover:border-cyan transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center mb-4">
                <BiHeadphone className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Wide Selection</h3>
              <p className="text-secondary text-sm">
                Extensive range of PCs, laptops, and accessories from top brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
            Explore our collection of premium products or get in touch with our team 
            for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-10 py-4 bg-gradient-to-r from-accent to-cyan text-white font-bold text-lg rounded-xl shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-105 flex items-center gap-2"
            >
              <BiLaptop className="text-2xl" />
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border-2 border-accent/50 text-text-primary font-bold text-lg rounded-xl hover:border-cyan hover:text-cyan hover:bg-graphite/50 transition-all flex items-center gap-2"
            >
              <FiMessageCircle />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

