import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  FiPhone, FiMail, FiMapPin, FiSend, FiMessageCircle, FiClock
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { BiLaptop } from "react-icons/bi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/contacts",
        formData
      );
      
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit contact form. Please try again.");
      }
    }
  };

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
              Get In Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-6 leading-tight">
            Contact
            <br />
            <span className="bg-gradient-to-r from-accent via-cyan to-accent bg-clip-text text-transparent">
              Shero Digital World
            </span>
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Have a question? Need help choosing the right product? We're here to help! 
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="relative py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Contact Information
              </h2>
              <p className="text-secondary text-lg mb-8">
                We're always happy to hear from you. Whether you have a question about 
                our products, need technical support, or want to discuss a custom order, 
                don't hesitate to reach out.
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-graphite/50 border border-accent/20 rounded-xl hover:border-cyan transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">Phone</h3>
                    <p className="text-secondary mb-2">Call us anytime</p>
                    <a 
                      href="tel:+94768096647" 
                      className="text-cyan hover:text-accent transition-colors text-lg font-semibold"
                    >
                      +94 76 809 6647
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-graphite/50 border border-accent/20 rounded-xl hover:border-cyan transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">Email</h3>
                    <p className="text-secondary mb-2">Send us an email</p>
                    <a 
                      href="mailto:info@sherodigitalworld.com" 
                      className="text-cyan hover:text-accent transition-colors text-lg font-semibold break-all"
                    >
                      info@sherodigitalworld.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-6 bg-graphite/50 border border-accent/20 rounded-xl hover:border-cyan transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">Address</h3>
                    <p className="text-secondary mb-2">Visit our location</p>
                    <p className="text-text-primary text-lg font-semibold">
                      Sri Lanka
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-6 bg-graphite/50 border border-accent/20 rounded-xl hover:border-cyan transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent to-cyan rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiClock className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">Business Hours</h3>
                    <p className="text-secondary mb-2">We're available</p>
                    <p className="text-text-primary text-lg font-semibold">
                      24/7 Support Available
                    </p>
                    <p className="text-secondary text-sm mt-1">
                      Monday - Sunday: Always here to help
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Send Us a Message
              </h2>
              <p className="text-secondary text-lg mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-text-primary font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-graphite border border-accent/30 rounded-xl text-text-primary placeholder-secondary focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-text-primary font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-graphite border border-accent/30 rounded-xl text-text-primary placeholder-secondary focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-text-primary font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-graphite border border-accent/30 rounded-xl text-text-primary placeholder-secondary focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-text-primary font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-graphite border border-accent/30 rounded-xl text-text-primary placeholder-secondary focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-text-primary font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-graphite border border-accent/30 rounded-xl text-text-primary placeholder-secondary focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-accent to-cyan text-white font-bold text-lg rounded-xl shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FiSend className="text-xl" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="relative py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 text-center">
              <FiMessageCircle className="text-cyan text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">Quick Response</h3>
              <p className="text-secondary text-sm">
                We typically respond to all inquiries within 24 hours
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 text-center">
              <BiLaptop className="text-cyan text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">Expert Advice</h3>
              <p className="text-secondary text-sm">
                Get personalized recommendations from our tech experts
              </p>
            </div>

            <div className="bg-graphite/50 border border-accent/20 rounded-xl p-6 text-center">
              <FiPhone className="text-cyan text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">24/7 Support</h3>
              <p className="text-secondary text-sm">
                Round-the-clock customer service for all your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
            Check out our product catalog or visit our About page to learn more about 
            what we offer.
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
              to="/about"
              className="px-10 py-4 border-2 border-accent/50 text-text-primary font-bold text-lg rounded-xl hover:border-cyan hover:text-cyan hover:bg-graphite/50 transition-all flex items-center gap-2"
            >
              <HiOutlineSparkles />
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

