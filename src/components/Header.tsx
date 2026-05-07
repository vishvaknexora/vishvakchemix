"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Us" },
    { 
      href: "/products", 
      label: "Products",
      dropdown: [
        { href: "/products#insect-pheromones", label: "Insect Pheromones and Intermediates" },
        { href: "/products#flavour-fragrance", label: "Flavour and Fragrance Ingredients" },
        { href: "/products#pharmaceutical", label: "Pharmaceutical Intermediates" },
        { href: "/products#alkyne", label: "Basic Alkyne Intermediates" },
        { href: "/products#other", label: "Other Specialty Chemicals" },
        { href: "/products", label: "All Products" },
      ]
    },
    { href: "/#custom-manufacturing", label: "Custom Manufacturing" },
    { href: "/#footer", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
      {/* Top Utility Bar */}
      <div className={`bg-primary text-white text-xs py-2 transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0 py-0' : 'h-10 opacity-100'}`}>
        <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center h-full">
          <div className="hidden md:flex items-center space-x-6">
            <Link href="mailto:sales@vishvakchemix.com" className="flex items-center space-x-2 hover:text-accent transition-colors">
              <Mail size={14} />
              <span>Sales@vishvakchemix.com</span>
            </Link>
            <div className="flex items-center space-x-2 text-white/80">
              <MapPin size={14} />
              <span>Shyamal Cross Rd, Satellite, Ahmedabad</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <Link href="/#footer" className="flex items-center space-x-2 hover:text-accent transition-colors">
              <Phone size={14} />
              <span className="font-medium">+91 9152911081</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`w-full transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-md py-4"} border-b border-surface-variant`}>
        <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-primary">VISHVAKCHEMIX</span>
            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Pvt. Ltd.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="px-4 py-2 text-[15px] font-bold text-primary hover:text-accent transition-colors duration-200 flex items-center gap-1"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-72 bg-white shadow-xl border-t-2 border-accent rounded-b-md overflow-hidden"
                      >
                        <div className="flex flex-col py-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="px-6 py-3 text-sm font-semibold text-primary hover:bg-surface hover:text-accent transition-colors border-b border-surface-variant/50 last:border-0"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center bg-surface-low px-4 py-2 rounded-md border border-surface-variant/50 shadow-sm">
              <Phone size={24} className="text-accent mr-3" />
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Call Us Now</span>
                <span className="text-sm font-black text-primary">+91 9152911081</span>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-primary hover:text-accent p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-b border-surface-variant overflow-hidden"
          >
            <div className="px-8 py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col">
                  <Link
                    href={link.href}
                    onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                    className="py-3 text-[15px] font-bold text-primary border-b border-surface-variant/50 flex justify-between items-center"
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={16} />}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-col pl-4 border-b border-surface-variant/50 pb-2 bg-surface-low/50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2.5 text-sm font-semibold text-on-surface-variant hover:text-accent"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="py-4 mt-2">
                <Link
                  href="/#footer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-accent text-white px-6 py-3 text-sm font-bold tracking-wider uppercase rounded hover:bg-accent-hover transition-colors text-center shadow-md"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
