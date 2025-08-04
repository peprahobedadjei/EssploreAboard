import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Check if we're on homepage
  const isHomepage = router.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      if (!isHomepage) return;

      const sections = ['home', 'about', 'services', 'faq'];
      const scrollPosition = window.scrollY + 120; // Increased offset for better detection

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  // Handle navigation from external pages with hash
  useEffect(() => {
    if (isHomepage && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 500); // Longer delay for page load
    }
  }, [isHomepage]);

  const scrollToSection = (sectionId) => {
    // Close mobile menu first
    setMobileMenuOpen(false);
    
    if (isHomepage) {
      // Add a small delay to ensure menu closes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80; // Account for navbar height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Navigate to homepage with hash
      router.push(`/#${sectionId}`);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100/50' 
          : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/assets/essplore_logo.png"
                  alt="Essplore Abroad"
                  className={`transition-all duration-300 ${
                    scrolled ? 'h-8 w-auto lg:h-10' : 'h-10 w-auto lg:h-12'
                  }`}
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#450f8c]/20 to-[#f96714]/20 blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-50 group ${
                  activeSection === item.id && isHomepage
                    ? 'text-[#450f8c]' 
                    : 'text-gray-700 hover:text-[#450f8c]'
                }`}
              >
                {item.label}
                
                {/* Active indicator */}
                {activeSection === item.id && isHomepage && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#450f8c]/5 to-[#f96714]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.button>
            ))}
          </div>
          
          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-[#450f8c] to-[#f96714] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#f96714] to-[#450f8c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-[#450f8c] hover:bg-gray-50 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 group ${
                      activeSection === item.id && isHomepage
                        ? 'text-[#450f8c] bg-gradient-to-r from-[#450f8c]/10 to-[#f96714]/10' 
                        : 'text-gray-700 hover:text-[#450f8c] hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && isHomepage && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 px-4"
                >
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-gradient-to-r from-[#450f8c] to-[#f96714] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Get Started
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}