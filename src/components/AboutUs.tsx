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
    <section id="about" className="py-24 lg:py-32 px-6 md:px-8 bg-surface-lowest relative overflow-hidden scroll-mt-24 lg:scroll-mt-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute top-1/4 -left-20 w-96 h-96 border-[40px] border-primary rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 border-[30px] border-accent rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: Context & Purpose (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-accent text-xs font-black uppercase tracking-[0.4em]">Corporate Profile</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary font-black mb-8 tracking-tighter leading-[1.1] lg:leading-[0.95]">
                Redefining the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Chemical Horizon.</span>
              </h2>
              
              <p className="text-on-surface-variant text-lg leading-relaxed mb-12 font-medium">
                VISHVAK CHEMIX is a trusted global leader in high-purity chemical distribution. With decades of manufacturing expertise, we bridge the gap between complex science and industrial application.
              </p>

              {/* Mission & Vision - Stylized Overlapping Cards */}
              <div className="relative mt-12 lg:mt-20">
                {/* Mission Card with Industrial Background Reveal */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 lg:p-10 rounded-2xl shadow-card relative z-20 border border-surface-variant mb-6 group overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                    <Image src="/laboratory.png" alt="Lab" fill className="object-cover scale-150 group-hover:scale-100 transition-transform duration-1000" />
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors" />
                  <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <Target className="text-accent w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-primary mb-3 uppercase tracking-wider italic">Our Mission</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        To deliver high-purity chemical solutions worldwide with uncompromising precision, regulatory excellence, and customer-first integrity.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Vision Card with Cinematic Industrial Background */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-primary p-8 lg:p-10 rounded-2xl shadow-2xl relative z-10 lg:-mt-12 lg:ml-12 border border-white/10 group overflow-hidden min-h-[220px]"
                >
                  {/* Background Image */}
                  <Image 
                    src="/chemical_plant.png" 
                    alt="Plant" 
                    fill 
                    className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-110 transition-transform duration-[2000ms]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/60 to-transparent" />
                  
                  <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10 text-white">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Zap className="text-accent w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wider italic">Our Vision</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        To be the global benchmark for ethical chemical distribution, pioneering sustainable practices and creating shared value for our partners worldwide.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Values Grid (7 cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Background Glow for the Grid */}
              <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

              {coreValues.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  {/* Decorative Border Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-accent via-secondary to-primary opacity-0 group-hover:opacity-30 rounded-[2rem] blur transition-opacity duration-500" />
                  
                  <div className="relative bg-white/90 backdrop-blur-md p-8 lg:p-10 rounded-[2rem] border border-surface-variant h-full flex flex-col items-start shadow-sm transition-all duration-300 group-hover:shadow-2xl">
                    {/* Index Number */}
                    <span className="text-6xl lg:text-[8rem] font-black text-surface-low/10 absolute top-0 right-4 leading-none select-none group-hover:text-accent/5 transition-colors">
                      {idx + 1}
                    </span>

                    <div className="w-16 h-16 bg-surface-low rounded-2xl flex items-center justify-center mb-8 border border-surface-variant group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                      <value.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                    </div>

                    <div className="relative z-10">
                      <h4 className="text-xl lg:text-2xl font-black text-primary mb-4 tracking-tighter uppercase group-hover:text-accent transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-on-surface-variant text-base leading-relaxed font-medium">
                        {value.desc}
                      </p>
                    </div>

                    {/* Progress indicator decoration */}
                    <div className="mt-10 w-full h-1 bg-surface-low rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(idx + 1) * 20}%` }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

