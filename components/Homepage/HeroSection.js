import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, Award, BookOpen, MapPin, GraduationCap } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const stats = [
    { icon: Globe, number: "50+", label: "Countries" },
    { icon: Users, number: "10K+", label: "Students Placed" },
    { icon: Award, number: "98%", label: "Success Rate" },
    { icon: GraduationCap, number: "500+", label: "Universities" }
  ];

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          {/* Header Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#450f8c] to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest mb-8 shadow-lg"
          >
            <Globe className="w-4 h-4" />
            Welcome to Essplore Abroad
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-8"
          >
            Your{" "}
            <span className="bg-gradient-to-r from-[#f96714] to-[#450f8c] bg-clip-text text-transparent">
              all-in-one
            </span>
            <br />
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="bg-gradient-to-r from-[#450f8c] via-blue-600 to-[#f96714] bg-300% bg-clip-text text-transparent"
            >
              study abroad partner
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            From choosing the right course and university to securing visas and accommodation — 
            we guide you through every step of your international education journey with{" "}
            <span className="font-bold text-[#450f8c]">expert precision</span> and{" "}
            <span className="font-bold text-[#f96714]">personalized care</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              onClick={() => scrollToSection("roadmap")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-[#f96714] to-orange-600 text-white hover:from-orange-600 hover:to-[#f96714] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-orange-500/25 min-w-[280px] relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start my Study Abroad Journey
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("programs")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group border-3 border-[#450f8c] text-[#450f8c] hover:bg-[#450f8c] hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-xl hover:shadow-purple-500/25 min-w-[280px] backdrop-blur-sm bg-white/80"
            >
              <span className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                View our Services
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
              >
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: `${index * 0.5}s` }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-gradient-to-br from-[#450f8c] to-purple-600 p-3 rounded-2xl mb-4 shadow-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.h3
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    className="text-3xl font-black text-gray-900 mb-2"
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-600 font-semibold text-sm">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative"
        >
          <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              src="/assets/hero-section.jpg"
              alt="Study Abroad - Students from around the world"
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay - starts transparent at top, becomes more opaque towards bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
            
            {/* Floating Achievement Badges */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-6 left-6 bg-white/95 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-gray-900 text-sm">Top Rated Agency</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="font-bold text-gray-900 text-sm">Global Presence</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-3, 7, -3] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                </div>
                <span className="font-bold text-gray-900 text-sm">Trusted by thousands</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}