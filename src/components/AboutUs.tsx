"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, Zap, Leaf, Award } from "lucide-react";

const coreValues = [
  { title: "Integrity", desc: "Upholding transparency, honesty, and fairness in all our business dealings.", icon: ShieldCheck },
  { title: "Safety", desc: "Prioritizing the safety of products and people by adhering to highest standards.", icon: Target },
  { title: "Customer Focus", desc: "Delivering tailored solutions with a commitment to exceptional service.", icon: Users },
  { title: "Sustainability", desc: "Embracing eco-friendly practices to minimize environmental impact.", icon: Leaf },
  { title: "Excellence", desc: "Striving for continuous improvement in quality and relations.", icon: Award },
];

export default function AboutUs() {
  return (
    <section id="about" className="py-24 px-6 md:px-8 bg-white border-b border-surface-variant">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mission & Vision */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-sm text-xs font-bold tracking-widest uppercase mb-4">
              About Us
            </div>
            <h2 className="text-3xl md:text-5xl text-primary font-black mb-8 tracking-tight leading-tight">
              A Global Leader in Chemical Distribution
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              VISHVAK CHEMIX is a trusted global leader in the trade and distribution of high-quality chemicals. With decades of experience in sourcing, manufacturing, and supplying a broad spectrum of chemical products.
            </p>

            <div className="space-y-8">
              <div className="bg-surface-low p-8 rounded-sm border-l-4 border-accent">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <Target className="text-accent" /> Our Mission
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  To provide a wide range of high-quality chemicals and chemical solutions to industries worldwide, ensuring timely delivery, strict regulatory compliance, and unmatched customer satisfaction.
                </p>
              </div>
              <div className="bg-surface-low p-8 rounded-sm border-l-4 border-secondary">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <Zap className="text-secondary" /> Our Vision
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  To be a global leader in chemical trading, known for our ethical business practices, environmental responsibility, and dedication to enhancing the value we bring to customers and stakeholders alike.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Values Grid & Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-12 shadow-2xl border border-surface-variant">
              <Image 
                src="/chemical_plant.png" 
                alt="Vishvakchemix Industrial Plant" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreValues.map((value, idx) => (
              <div key={idx} className="bg-surface-low p-6 rounded-sm border border-surface-variant hover:border-accent hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-accent transition-colors">
                  <value.icon className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{value.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{value.desc}</p>
              </div>
            ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
