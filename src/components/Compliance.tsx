"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Factory, HeartPulse } from "lucide-react";

const complianceFeatures = [
  {
    text: "REACH and EPA compliant supply chain architecture.",
    icon: ShieldCheck,
  },
  {
    text: "Custom synthesis and toll manufacturing scaling from kg to metric tons.",
    icon: Factory,
  },
  {
    text: "Dedicated EHS (Environment, Health, and Safety) oversight on all processes.",
    icon: HeartPulse,
  },
];

const stats = [
  {
    value: "40+",
    label: "Countries Served",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=400&fit=crop&q=80",
  },
  {
    value: "ISO",
    label: "9001:2015 Certified",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80",
  },
  {
    value: "99.9%",
    label: "Purity Standards Maintained",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop&q=80",
    wide: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Compliance() {
  return (
    <section id="compliance" className="py-24 px-6 md:px-8 bg-surface border-t border-surface-variant overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-surface-low to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-sm text-xs font-bold tracking-widest uppercase mb-6">
            Global Standards
          </div>
          <h2 className="text-3xl md:text-5xl text-primary font-black mb-6 tracking-tight leading-tight">
            Engineered for <br className="hidden md:block" /> Global Compliance
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-lg">
            Operating from Ahmedabad, Gujarat—India&apos;s premier chemical
            manufacturing hub—Vishvakchemix&apos;s custom manufacturing capabilities
            are underpinned by an uncompromising commitment to international
            regulatory standards.
          </p>

          <ul className="space-y-6">
            {complianceFeatures.map((feature, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mt-1 w-10 h-10 rounded-full bg-white shadow-sm border border-surface-variant flex items-center justify-center shrink-0 group-hover:border-accent group-hover:shadow-md transition-all">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-on-surface-variant font-medium text-[15px] leading-relaxed pt-1.5 group-hover:text-primary transition-colors">
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Stats Grid with Images */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`relative rounded-xl overflow-hidden group cursor-default ${stat.wide ? "col-span-2" : ""}`}
              >
                {/* Background Image */}
                <div className={`relative ${stat.wide ? "h-56" : "h-48"} w-full`}>
                  <Image
                    src={stat.image}
                    alt={stat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-primary/75 group-hover:bg-primary/65 transition-colors duration-300" />

                  {/* Content on top of image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <span className={`font-black text-white block mb-2 tracking-tight ${stat.wide ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"}`}>
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
