import { Link } from "react-router-dom";
import { 
  BiShoppingBag, BiLaptop, BiHeadphone, BiWrench
} from "react-icons/bi";
import { 
  FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal border-t border-graphite">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HiOutlineSparkles className="text-cyan text-2xl" />
              <h3 className="text-xl font-bold text-text-primary">Shero Digital World</h3>
            </div>
            <p className="text-secondary text-sm leading-relaxed">
              Your trusted partner for premium PCs, laptops, and accessories. 
              Quality products at unbeatable prices.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-graphite border border-accent/30 flex items-center justify-center text-text-primary hover:bg-accent/20 hover:text-cyan hover:border-cyan transition-all"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-graphite border border-accent/30 flex items-center justify-center text-text-primary hover:bg-accent/20 hover:text-cyan hover:border-cyan transition-all"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-graphite border border-accent/30 flex items-center justify-center text-text-primary hover:bg-accent/20 hover:text-cyan hover:border-cyan transition-all"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/orders" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-text-primary mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/products" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <BiLaptop className="text-cyan" />
                  PCs & Laptops
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <BiHeadphone className="text-cyan" />
                  Accessories
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <BiWrench className="text-cyan" />
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-secondary hover:text-cyan transition-colors flex items-center gap-2"
                >
                  <BiShoppingBag className="text-cyan" />
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-text-primary mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiPhone className="text-cyan mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary text-sm">Phone</p>
                  <a href="tel:+94768096647" className="text-text-primary hover:text-cyan transition-colors">
                    +94 76 809 6647
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="text-cyan mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary text-sm">Email</p>
                  <a href="mailto:info@sherodigitalworld.com" className="text-text-primary hover:text-cyan transition-colors">
                    info@sherodigitalworld.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-cyan mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary text-sm">Address</p>
                  <p className="text-text-primary">
                    Sri Lanka
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-graphite">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary text-sm">
              © {new Date().getFullYear()} Shero Digital World. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/about" className="text-secondary hover:text-cyan transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-secondary hover:text-cyan transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-secondary hover:text-cyan transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

