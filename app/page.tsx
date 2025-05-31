'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const borderScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  return (
    <main ref={containerRef} className="relative">
      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="section bg-gradient-to-b from-[var(--color-5)] to-[var(--color-4)]"
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="block">Erin Leigh Monberg</span>
                <span className="block text-2xl mt-2">CNM</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8">Expert Midwife Witness</p>
              <p className="text-lg text-gray-700">[Filler] years of midwifery experience</p>
            </motion.div>
            <div className="relative h-[500px] w-full flex justify-center items-center">
              <motion.div 
                className="relative w-[400px] h-[400px]"
                style={{ scale: borderScale }}
              >
                {/* Outer colored border */}
                <div className="absolute inset-0 border-4 border-[var(--color-4)] rounded-full"></div>
                
                {/* White border container */}
                <div className="absolute inset-0 rounded-full" style={{ padding: '12px' }}>
                  {/* Black border for development */}
                  <div className="w-full h-full rounded-full border-8 border-black overflow-hidden">
                    <motion.div 
                      className="w-full h-full"
                      style={{ scale: imageScale }}
                    >
                      <Image
                        src="/em.jpg"
                        alt="Erin Leigh Monberg"
                        fill
                        className="object-cover object-[center_25%]"
                        priority
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        className="section bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/missingTexture.jpg"
                alt="About Erin"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-lg mb-4">
                I received my bachelors degree in Philosophy from St. John's College in Annapolis, MD and a Master of Science degree in Nursing from Vanderbilt University School of Nursing in 2002. Educating women about their bodies is an awesome opportunity to create change in the world. When women are empowered and healthy, they build strong, happy families and communities.
              </p>
              <p className="text-lg mb-4">
                I find joy in helping women achieve safe and satisfying births. I also enjoy supporting women as they make health care decisions through all seasons of their life. Midwife means "with women" and I feel so privileged to be with women here in the Midcoast.
              </p>
              <p className="text-lg">
                My husband and I are thrilled to have moved home to Maine where we are raising three kids, a dog and as many vegetables as we can.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Fields of Expertise Section */}
      <motion.section 
        className="section bg-[var(--color-5)]/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Fields of Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 mb-4">
                  <Image
                    src="/missingTexture.jpg"
                    alt={`Expertise ${item}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Expertise {item}</h3>
                <p>[Placeholder text for expertise description]</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="section bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Contact</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-center mb-8">
              [Placeholder text for contact information]
            </p>
            <motion.button
              className="bg-[var(--color-4)] text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-[var(--color-4)]/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
