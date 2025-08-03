import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, Users, Globe, Award, BookOpen, Shield, Compass } from "lucide-react";

export default function AboutUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  const values = [
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Every student receives individual attention and customized guidance tailored to their unique goals and circumstances."
    },
    {
      icon: Shield,
      title: "Trusted Expertise",
      description: "With years of experience and deep industry knowledge, we provide reliable guidance you can count on."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Our extensive partnerships with universities worldwide open doors to premium educational opportunities."
    },
    {
      icon: Compass,
      title: "End-to-End Support",
      description: "From initial consultation to graduation, we're with you every step of your international education journey."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23450f8c' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          {/* Section Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Users className="w-4 h-4" />
            About Essplore Abroad
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            Empowering Dreams,{" "}
            <span className="text-[#450f8c]">Building Futures</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            At Essplore Abroad, we believe that education has the power to transform lives. 
            Our mission is to make international education accessible, seamless, and successful 
            for every aspiring student who dreams of studying abroad.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
              <p className="text-gray-600 leading-relaxed">
                Founded with a vision to bridge the gap between ambitious students and world-class 
                education, Essplore Abroad has grown from a small consultancy to a trusted partner 
                for thousands of students worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We understand that studying abroad is more than just academics—it's a life-changing 
                journey that shapes your future, broadens your perspective, and creates lasting connections 
                across cultures.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <motion.div
                whileHover={{ y: -2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[#f96714] mb-2">10+</div>
                <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[#450f8c] mb-2">50+</div>
                <div className="text-sm text-gray-600 font-medium">Partner Universities</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/assets/about-section.jpg"
                alt="Essplore Abroad Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Floating Achievement */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">Excellence in Education</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Our Core Values
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            These principles guide everything we do and define how we serve our students
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group text-center p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#450f8c]/10 to-[#f96714]/10 rounded-2xl flex items-center justify-center group-hover:from-[#450f8c]/20 group-hover:to-[#f96714]/20 transition-all duration-300">
                <value.icon className="w-8 h-8 text-[#450f8c] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-24 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-3xl p-12 border border-gray-100"
        >
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#450f8c] to-[#f96714] rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-xl text-gray-700 leading-relaxed italic">
              "To empower students with the knowledge, support, and opportunities they need to 
              successfully pursue their international education dreams, creating a bridge between 
              ambition and achievement."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}