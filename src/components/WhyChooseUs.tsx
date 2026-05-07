"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Extensive Product Range",
    desc: "A broad spectrum of chemicals catering to manufacturing, agriculture, healthcare, and more from one trusted partner.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Quality Assurance",
    desc: "Rigorous quality control checks ensure compliance with international standards and high-quality production practices.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Regulatory Compliance",
    desc: "Adherence to local and international regulations, complete with necessary certifications, MSDS, and labeling.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Sustainability",
    desc: "Commitment to minimizing environmental impact through sustainable chemicals and eco-friendly packaging.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Global Logistics Network",
    desc: "Advanced logistics ensure efficient delivery worldwide, managing customs clearance and last-mile delivery.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Custom Solutions",
    desc: "Flexible custom chemical formulations, blending, and packaging options to meet unique client requirements.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhyChooseUs() {
  return (
    <section className="relative py-32 px-6 md:px-8 overflow-hidden bg-primary">
      {/* Background Image with Dark Overlay */}
      <Image
        src="/laboratory.png"
        alt="Advanced Chemical Laboratory"
        fill
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/95" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-block bg-accent text-white px-4 py-1.5 rounded-sm text-xs font-bold tracking-widest uppercase mb-4 shadow-md">
            Why Choose Us
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-white font-black mb-6 tracking-tight">
            The Preferred Global Partner
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            We are dedicated to providing effective solutions with a focus on reliability, compliance, and innovation.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={reason.image}
                  alt={reason.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {reason.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
