"use client";

import Link from "next/link";
import { StaticChemical } from "@/lib/static-data";
import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, Sprout, Stethoscope, Droplet, Layers, Wrench, Hexagon } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  science: FlaskConical,
  compost: Sprout,
  medical_services: Stethoscope,
  water_drop: Droplet,
  bubble_chart: Layers,
  hardware: Wrench,
  default: Hexagon
};

interface CompetenciesProps {
  chemicals: StaticChemical[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
};

export default function Competencies({ chemicals }: CompetenciesProps) {
  return (
    <section id="products" className="py-24 px-6 md:px-8 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-sm text-xs font-bold tracking-widest uppercase mb-4">
            Our Products
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl text-primary font-black mb-6 tracking-tight">
            Explore Our Specialties
          </motion.h2>
          <motion.p variants={itemVariants} className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Our portfolio of specialized chemical compounds designed for critical
            industrial applications. From Ahmedabad to the world, we formulate
            perfection.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {chemicals.map((chemical) => (
            <motion.div key={chemical.id} variants={itemVariants} className="h-full">
              <Link
                href={`/products/${chemical.id}`}
                className="group relative block bg-white border border-surface-variant rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1"
              >
                {/* Decorative Accent Top Border */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500 ease-out z-10" />
                
                <div className="p-8 flex flex-col h-full relative z-0">
                  <div className="w-16 h-16 bg-surface-low rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm">
                    {(() => {
                      const IconComponent = iconMap[chemical.icon] || iconMap.default;
                      return <IconComponent className="w-8 h-8" strokeWidth={1.5} />;
                    })()}
                  </div>
                  <h3 className="text-xl text-primary font-bold mb-4 group-hover:text-accent transition-colors leading-snug">
                    {chemical.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mb-8 flex-grow leading-relaxed">
                    {chemical.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-surface-variant flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest group-hover:text-accent transition-colors">
                      View Details
                    </span>
                    <div className="w-8 h-8 rounded-full bg-surface-low flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
