import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe
} from 'lucide-react';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const linkVariants = {
    hover: {
      x: 3,
      transition: { duration: 0.2 }
    }
  };

  const quickLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#faq", label: "FAQ" }
  ];

  const services = [
    { href: "/services/school-application", label: "School Application" },
    { href: "/services/visa-application", label: "Visa Application" },
    { href: "/services/accommodation", label: "Accommodation" },
    { href: "/services/sevis-payment", label: "SEVIS Payment" }
  ];

  const contactInfo = [
    { icon: Mail, text: "info@essploreaboard.com", href: "mailto:info@essploreaboard.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "123 Education Street, Learning City, LC 12345", href: "#" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23450f8c' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="mb-6">
              {/* Logo - you can replace with image */}
              <img
                src="/assets/essplore_logo.png"
                alt="Essplore Abroad"
                className="h-10 w-auto mb-4"
              />
              {/* Or keep text version */}
              {/* <h3 className="text-2xl font-bold bg-gradient-to-r from-[#450f8c] to-[#f96714] bg-clip-text text-transparent mb-4">
                Essplore Abroad
              </h3> */}
              <p className="text-gray-600 leading-relaxed text-sm">
                Your trusted partner for international education and study abroad success. 
                Empowering students to achieve their global education dreams.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-gray-50 hover:bg-gradient-to-r hover:from-[#450f8c] hover:to-[#f96714] rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.span
                      variants={linkVariants}
                      whileHover="hover"
                      className="text-gray-600 hover:text-[#450f8c] transition-colors duration-300 cursor-pointer text-sm flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href}>
                    <motion.span
                      variants={linkVariants}
                      whileHover="hover"
                      className="text-gray-600 hover:text-[#450f8c] transition-colors duration-300 cursor-pointer text-sm flex items-center group"
                    >
                      {service.label}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <motion.a
                    href={contact.href}
                    whileHover={{ x: 2 }}
                    className="flex items-start space-x-3 text-gray-600 hover:text-[#450f8c] transition-colors duration-300 group"
                  >
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-[#450f8c] transition-colors duration-300">
                      <contact.icon className="w-full h-full" />
                    </div>
                    <span className="text-sm leading-relaxed">{contact.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
            >
              <Link href="/#contact">
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#450f8c] to-[#f96714] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer">
                  Start Your Journey
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-100 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>&copy; 2025 Essplore Abroad. All rights reserved.</span>
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-[#450f8c] transition-colors duration-300">
                  Privacy Policy
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/terms" className="hover:text-[#450f8c] transition-colors duration-300">
                  Terms of Service
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Globe className="w-4 h-4" />
              <span>Serving students worldwide</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}