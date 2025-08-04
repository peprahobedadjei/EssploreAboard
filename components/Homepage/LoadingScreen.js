import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
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

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23450f8c' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10"
      >
        {/* Logo/Spinner Section */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8"
        >
          {/* Outer ring */}
          <motion.div
            variants={spinnerVariants}
            animate="animate"
            className="w-16 h-16 border-2 border-gray-200 rounded-full mx-auto relative"
          >
            <div className="absolute inset-0 border-2 border-transparent border-t-[#450f8c] rounded-full"></div>
          </motion.div>

          {/* Inner ring - counter rotation */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-16 h-16 mx-auto"
          >
            <div className="w-full h-full border-2 border-gray-100 rounded-full relative">
              <div className="absolute inset-0 border-2 border-transparent border-b-[#f96714] rounded-full"></div>
            </div>
          </motion.div>

          {/* Center dot */}
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-full"
          />
        </motion.div>

        {/* Logo/Brand Name */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          {/* If you want to use your logo instead of text, uncomment this: */}
          {/* <img
            src="/assets/logo.png"
            alt="Essplore Abroad"
            className="h-12 w-auto mx-auto mb-4"
          /> */}
          
          {/* Text version */}
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#450f8c] to-[#f96714] bg-clip-text text-transparent mb-2">
            Essplore Abroad
          </h1>
        </motion.div>

        {/* Loading message */}
        <motion.div
          variants={itemVariants}
          className="space-y-3"
        >
          <p className="text-gray-600 text-lg font-medium">
            Your Journey Begins Here...
          </p>
          
          {/* Loading dots */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
                className="w-2 h-2 bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          variants={itemVariants}
          className="mt-8 w-64 mx-auto"
        >
          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-full"
            />
          </div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              animate={{
                y: [-20, -40, -20],
                x: [0, Math.sin(index) * 10, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: index * 0.5
              }}
              className={`absolute w-1 h-1 bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-full`}
              style={{
                left: `${20 + index * 12}%`,
                top: `${30 + (index % 3) * 20}%`
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}