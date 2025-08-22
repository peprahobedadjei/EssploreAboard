import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { 
  GraduationCap, 
  FileText, 
  Home, 
  DollarSign, 
  HelpCircle, 
  ArrowRight,
  MapPin,
  Calendar,
  Shield,
  Clock,
  CheckCircle,
  Users
} from "lucide-react";

export default function ServicesSection() {
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
        stiffness: 80,
        damping: 12
      }
    }
  };

  const services = [
        {
      id: "sevis-payment",
      title: "SEVIS Fee Payment",
      description: "Simplified SEVIS fee payment processing for US student visa applications",
      icon: DollarSign,
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
      features: ["Payment Processing", "Receipt Management", "Status Updates", "US Compliance"],
      link: "/services/sevis-payment",
      flag: "US Only"
    },
    {
      id: "school-application",
      title: "School Application",
      description: "Complete university application support from course selection to admission confirmation",
      icon: GraduationCap,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      features: ["University Selection", "Application Essays", "Document Preparation", "Submission Support"],
      link: "/services/school-application",
      popular: true
    },
    {
      id: "visa-application",
      title: " School Visa Application Service",
      description: "Expert visa guidance and application support for all major study destinations",
      icon: FileText,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      features: ["Document Review", "Interview Prep", "Application Filing", "Status Tracking"],
      link: "/services/visa-application"
    },
    {
      id: "accommodation",
      title: "Accommodation Booking",
      description: "Secure comfortable and affordable housing near your chosen university",
      icon: Home,
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-50",
      features: ["Campus Housing", "Private Rentals", "Homestay Options", "Virtual Tours"],
      link: "/services/accommodation"
    },

    {
  id: "comprehensive-visa-services",
  title: "Tourist, Business, Work & Family Reunion Visa Services",
  description: "Complete visa assistance for all travel needs - leisure, business, employment, and family reunification",
  icon: FileText,
  color: "from-blue-500 to-purple-600",
  bgColor: "from-blue-50 to-purple-50",
  features: ["All Visa Types", "Document Preparation", "Embassy Support", "Expert Consultation"],
  link: "/services/comprehensive-visa-services"
}
,
    {
      id: "other-services",
      title: "Other Services",
      description: "Personalized assistance for unique situations and special requirements",
      icon: HelpCircle,
      color: "from-gray-500 to-slate-600",
      bgColor: "from-gray-50 to-slate-50",
      features: ["Custom Solutions", "Expert Consultation", "Problem Resolution", "Ongoing Support"],
      link: "/services/other-services",
      subtitle: "Tell us your needs"
    }
  ];

  const handleServiceClick = (link) => {
    // For Next.js pages router navigation
    if (typeof window !== 'undefined') {
      window.location.href = link;
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
            <Head>
          <title>EssploreAboard - Study Abroad Excellence</title>
      </Head>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
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
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200"
          >
            <Shield className="w-4 h-4" />
            Our Services
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            Complete Study Abroad{" "}
            <span className="bg-gradient-to-r from-[#450f8c] to-[#f96714] bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From university applications to visa processing, we provide end-to-end services 
            to make your study abroad journey seamless and successful.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br ${service.bgColor} border border-white/50 hover:border-white/80 transition-all duration-500 hover:shadow-2xl ${
                service.popular ? 'ring-2 ring-[#450f8c]/20' : ''
              }`}
              onClick={() => handleServiceClick(service.link)}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#450f8c] to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Flag Badge */}
              {service.flag && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {service.flag}
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#450f8c] transition-colors duration-300">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="text-sm text-gray-500 font-medium mb-2">{service.subtitle}</p>
                  )}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/50">
                  <span className="text-sm font-medium text-gray-500">Learn More</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`w-10 h-10 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/50 shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How We Work</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures you get the best service at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Consultation", desc: "Free initial assessment of your goals" },
              { icon: FileText, title: "Planning", desc: "Customized roadmap for your journey" },
              { icon: Clock, title: "Execution", desc: "Professional handling of all processes" },
              { icon: CheckCircle, title: "Success", desc: "Celebration of your achievements" }
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#450f8c]/10 to-[#f96714]/10 rounded-2xl flex items-center justify-center group-hover:from-[#450f8c]/20 group-hover:to-[#f96714]/20 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-[#450f8c]" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-[#450f8c]/30 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Get personalized guidance from our expert counselors and take the first step 
                towards your international education goals.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#450f8c] hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => handleServiceClick('/contact')}
              >
                Schedule Free Consultation
              </motion.button>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}