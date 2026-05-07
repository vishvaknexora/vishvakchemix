"use client";

import { motion } from "framer-motion";
import { Beaker, FlaskConical, Scale, ShieldCheck, Zap, Factory, ArrowRight } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    title: "Route Synthesis",
    desc: "Developing the most efficient chemical pathways for your target molecule.",
    icon: Beaker,
    color: "bg-blue-500"
  },
  {
    title: "Pilot Scaling",
    desc: "Transitioning from laboratory kg-scale to pilot batches for validation.",
    icon: FlaskConical,
    color: "bg-accent"
  },
  {
    title: "Commercial Volume",
    desc: "Full-scale production in metric tons with consistent purity standards.",
    icon: Factory,
    color: "bg-primary"
  }
];

const capabilities = [
  "Multi-step Organic Synthesis",
  "High-Pressure Hydrogenation",
  "Fractional Distillation",
  "Confidential IP Protection",
  "Toll Manufacturing"
];

export default function CustomManufacturing() {
  return (
    <section id="custom-manufacturing" className="py-32 px-6 md:px-8 bg-white relative overflow-hidden scroll-mt-24">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15rem] font-black text-surface-low opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter -rotate-90 origin-left">
        Synthesis
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-accent text-xs font-black uppercase tracking-[0.4em]">Specialized Services</span>
            </div>

            <h2 className="text-4xl md:text-6xl text-primary font-black mb-8 tracking-tighter leading-tight">
              From Lab Concept to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Industrial Scale.</span>
            </h2>

            <p className="text-on-surface-variant text-lg leading-relaxed mb-12 font-medium max-w-xl">
              Vishvak Chemix provides end-to-end custom synthesis solutions. Whether you need specialized intermediates for pharmaceuticals or unique performance chemicals, we scale your innovation with precision.
            </p>

            {/* Process Steps */}
            <div className="space-y-8 mb-12">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 group"
                >
                  <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">{step.title}</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl hover:bg-accent transition-colors group"
            >
              Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* RIGHT: Visual Showcase */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group"
            >
              <Image 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=800&fit=crop&q=80" 
                alt="Custom Manufacturing Facility" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
              
              {/* Floating Capabilities Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 z-20 max-w-[240px]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Key Capabilities</span>
                </div>
                <ul className="space-y-3">
                  {capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-on-surface-variant">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Bottom Info */}
              <div className="absolute bottom-10 left-10 text-white z-20">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-accent w-5 h-5 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Efficiency Guaranteed</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight">Rapid Prototyping <br />to Production</h3>
              </div>
            </motion.div>

            {/* Background Accent Circle */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
