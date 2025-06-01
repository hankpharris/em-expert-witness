'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero section transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0.8]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const borderScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  // About section transforms
  const aboutScale = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [0.8, 1, 1, 0.8]);
  const aboutOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [0.5, 1, 1, 0.5]);

  // Expertise section transforms
  const expertiseScale = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.95], [0.8, 1, 1, 0.8]);
  const expertiseOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.95], [0.5, 1, 1, 0.5]);

  // Contact section transforms
  const contactScale = useTransform(scrollYProgress, [0.8, 0.85, 1], [0.8, 1, 1]);
  const contactOpacity = useTransform(scrollYProgress, [0.8, 0.85, 1], [0.5, 1, 1]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      formData.append('_subject', `New Contact Form Submission from ${data.name}`);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');
      formData.append('_honey', '');

      const response = await fetch('https://formsubmit.co/el/yozigu', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon.',
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={containerRef} className="relative">
      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
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
              <p className="text-xl md:text-2xl mb-8">Nurse Midwife Expert Witness</p>
              <p className="text-lg text-gray-700">23 years of midwifery experience</p>
              <br></br>
              <p className="text-lg text-gray-700">Providing competent and compassionate</p>
              <p className="text-lg text-gray-700">case review and testimony</p>
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
        style={{ scale: aboutScale, opacity: aboutOpacity }}
        className="section bg-var(--color-5) py-16"
      >
        <div className="container max-w-5xl">
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
        style={{ scale: expertiseScale, opacity: expertiseOpacity }}
        className="section bg-[var(--color-5)]/20"
      >
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Fields of Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Obstetrics",
                description: "Experienced in both inpatient and oupatient care"
              },
              {
                title: "Gynecology",
                description: "Expert knowledge on routine and problem-based treatment"
              },
              {
                title: "Menopausal",
                description: "Thurough knowledge and practice with menopausal and perimenopausal care"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 mb-4">
                  <Image
                    src="/missingTexture.jpg"
                    alt={`${item.title}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        style={{ scale: contactScale, opacity: contactOpacity }}
        className="section bg-white"
      >
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Contact Me</h2>
          <div className="max-w-2xl mx-auto">
            <form 
              action="https://formsubmit.co/1770854260335361e2390ec182a0976b" 
              method="POST"
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-4)] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-4)] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-4)] focus:border-transparent"
                  placeholder="Your message"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[var(--color-4)] text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-[var(--color-4)]/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
