import React from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { Globe, MapPin, Users, GraduationCap } from "lucide-react";
import Head from "next/head";

export default function FlagsSection() {
      const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
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
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Top study destinations with their details
  const countries = [
    {
      name: "United States",
      flag: "🇺🇸",
      shortName: "USA",
      universities: "4000+",
      students: "1M+",
      popular: true
    },
    {
      name: "United Kingdom", 
      flag: "🇬🇧",
      shortName: "UK",
      universities: "160+",
      students: "500K+"
    },
    {
      name: "Canada",
      flag: "🇨🇦", 
      shortName: "CAN",
      universities: "100+",
      students: "800K+"
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      shortName: "AUS", 
      universities: "43+",
      students: "700K+"
    },
    {
      name: "Germany",
      flag: "🇩🇪",
      shortName: "GER",
      universities: "400+",
      students: "400K+"
    },
    {
      name: "Ireland",
      flag: "🇮🇪",
      shortName: "IRE",
      universities: "20+",
      students: "35K+"
    },
    {
      name: "Italy",
      flag: "🇮🇹",
      shortName: "ITA",
      universities: "90+",
      students: "100K+"
    },
    {
      name: "Netherlands",
      flag: "🇳🇱",
      shortName: "NLD",
      universities: "75+",
      students: "120K+"
    },
    {
      name: "Switzerland",
      flag: "🇨🇭",
      shortName: "CHE",
      universities: "12+",
      students: "55K+"
    },
    {
      name: "France",
      flag: "🇫🇷",
      shortName: "FRA",
      universities: "250+",
      students: "370K+"
    },
    {
      name: "Sweden",
      flag: "🇸🇪",
      shortName: "SWE",
      universities: "50+",
      students: "40K+"
    },
    {
      name: "New Zealand",
      flag: "🇳🇿",
      shortName: "NZL",
      universities: "8+",
      students: "50K+"
    }
  ];

  // Create two sets for infinite scroll
  const duplicatedCountries = [...countries, ...countries];

  return (
    <section className=" sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
            <Head>
          <title>EssploreAboard - Study Abroad Excellence</title>
      </Head>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200"
          >
            <Globe className="w-4 h-4" />
            Study Destinations
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-[#450f8c] to-[#f96714] bg-clip-text text-transparent">
              Top Global
            </span>{" "}
            Universities
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Choose from our carefully curated list of study destinations, 
            each offering world-class education and unique cultural experiences
          </motion.p>
        </motion.div>

        {/* Infinite Scrolling Flags */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex space-x-6 will-change-transform"
              style={{ width: "200%" }}
            >
              {duplicatedCountries.map((country, index) => (
                <motion.div
                  key={`${country.name}-${index}`}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="flex-shrink-0 relative group cursor-pointer"
                >
                  <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/50 hover:shadow-xl transition-all duration-300 min-w-[200px]">
                    {/* Popular badge */}
                    {country.popular && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#450f8c] to-[#f96714] text-white text-xs font-bold px-2 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    
                    {/* Flag */}
                    <div className="text-5xl mb-4 text-center">
                      {country.flag}
                    </div>
                    
                    {/* Country Info */}
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#450f8c] transition-colors duration-300">
                        {country.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">{country.shortName}</p>
                      
                      {/* Stats */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: Globe, number: "20+", label: "Countries", color: "from-blue-500 to-indigo-600" },
            { icon: GraduationCap, number: "50+", label: "Universities", color: "from-purple-500 to-violet-600" },
            { icon: Users, number: "30+", label: "Students Placed", color: "from-green-500 to-emerald-600" },
            { icon: MapPin, number: "98%", label: "Success Rate", color: "from-orange-500 to-red-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <motion.h3
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-600 font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/50 shadow-xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Choose Your Destination?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our expert counselors will help you find the perfect country and university 
            that matches your academic goals, budget, and career aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
               onClick={() => router.push('/book')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#450f8c] to-[#f96714] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
               Get Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}