"use client";

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    title: "Insect Pheromones and Intermediates",
  },
  {
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
    title: "Flavour and Fragrance Ingredients",
  },
  {
    image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=2070&auto=format&fit=crop",
    title: "Specialty Chemicals",
  },
  {
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2070&auto=format&fit=crop",
    title: "Pharmaceutical Intermediates",
  }
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-screen min-h-[700px] flex overflow-hidden bg-black mt-[-114px]">
      <div className="absolute inset-0 w-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
              {/* Background Image with Dark Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Slide Content */}
              <div className="relative z-10 h-full flex flex-col justify-center pt-[114px]">
                <div className="max-w-[1440px] w-full mx-auto px-8 md:px-12 lg:px-24">
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        key={`content-${index}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-3xl"
                      >
                        <motion.h1 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight mb-8 leading-[1.1] text-left drop-shadow-lg"
                        >
                          {slide.title}
                        </motion.h1>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="text-left"
                        >
                          <Link
                            href="/products"
                            className="inline-block bg-accent text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-accent transition-colors rounded-sm shadow-xl"
                          >
                            Discover More
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/30 hover:bg-accent text-white flex items-center justify-center transition-colors z-20 hidden md:flex border border-white/20 rounded-full"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} className="-ml-1" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/30 hover:bg-accent text-white flex items-center justify-center transition-colors z-20 hidden md:flex border border-white/20 rounded-full"
        aria-label="Next Slide"
      >
        <ChevronRight size={28} className="-mr-1" />
      </button>
    </section>
  );
}
