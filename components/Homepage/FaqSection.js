import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  Clock,
  Users,
  GraduationCap,
  Globe
} from "lucide-react";

export default function FAQSection() {
  const router = useRouter();
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // Contact action handlers
  const handleEmailClick = () => {
    router.push('/contact', undefined, { scroll: true });
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+12166241878';
  };

  const handleWhatsAppClick = () => {
    // Create a message for WhatsApp
    const message = encodeURIComponent("Hello! I have a question about studying abroad. Could you please help me?");
    
    // Show options to user or use primary number
    const primaryNumber = "+12166241878";
    const secondaryNumber = "+233267696745";
    
    // You can either:
    // 1. Use primary number directly
    // window.open(`https://wa.me/${primaryNumber.replace('+', '')}?text=${message}`, '_blank');
    
    // 2. Or show a selection (uncomment below if you want user to choose)
    const selectedNumber = confirm("Choose WhatsApp number:\nOK = US Number (+1 216 624 1878)\nCancel = Ghana Number (+233 26 769 6745)") 
      ? primaryNumber : secondaryNumber;
    window.open(`https://wa.me/${selectedNumber.replace('+', '')}?text=${message}`, '_blank');
  };

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
    hidden: { y: 20, opacity: 0 },
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

  const faqData = [
    {
      category: "General",
      icon: HelpCircle,
      questions: [
        {
          question: "What services does Essplore Abroad offer?",
          answer: "We provide comprehensive study abroad services including university applications, visa processing, accommodation booking, SEVIS fee payment for US applications, and personalized consultation for unique requirements. Our end-to-end support ensures a smooth journey from application to graduation."
        },
        {
          question: "How much do your services cost?",
          answer: "Our pricing varies depending on the specific services you need and your destination country. We offer transparent pricing with no hidden fees. Contact us for a free consultation where we'll provide a detailed quote based on your requirements. We also offer flexible payment plans to make our services accessible."
        },
        {
          question: "Which countries do you assist with?",
          answer: "We assist students with applications to over 50 countries worldwide, including popular destinations like the USA, UK, Canada, Australia, Germany, Netherlands, France, and many more. Our global network of university partnerships ensures we can help you find the right fit regardless of your preferred destination."
        }
      ]
    },
    {
      category: "Applications",
      icon: GraduationCap,
      questions: [
        {
          question: "How long does the university application process take?",
          answer: "The timeline varies by country and university, but typically ranges from 2-6 months. We recommend starting the process at least 6-12 months before your intended start date. Early applications often have better chances of acceptance and scholarship opportunities. We'll create a personalized timeline for your specific situation."
        },
        {
          question: "What documents do I need for my application?",
          answer: "Common requirements include academic transcripts, letters of recommendation, statement of purpose, English proficiency test scores (IELTS/TOEFL), passport, and financial documents. Specific requirements vary by university and program. We'll provide you with a detailed checklist and help you prepare all necessary documents."
        },
        {
          question: "Can you help improve my chances of acceptance?",
          answer: "Absolutely! We provide expert guidance on crafting compelling personal statements, selecting the right programs that match your profile, and ensuring your application highlights your strengths. Our success rate of 98% demonstrates our expertise in positioning students for acceptance."
        }
      ]
    },
    {
      category: "Visas",
      icon: Globe,
      questions: [
        {
          question: "How long does visa processing take?",
          answer: "Visa processing times vary by country: US (2-8 weeks), UK (3-8 weeks), Canada (4-12 weeks), Australia (2-4 weeks). We track processing times closely and keep you updated throughout. We also provide guidance on premium processing options where available to expedite your application."
        },
        {
          question: "What if my visa application is rejected?",
          answer: "While our success rate is very high, if a rejection occurs, we analyze the reasons and help you reapply. We provide detailed guidance on addressing the rejection reasons and improving your application. Many rejections can be overcome with proper preparation and documentation."
        },
        {
          question: "Do you provide visa interview preparation?",
          answer: "Yes! We conduct mock interviews, provide common questions and answers, and offer personalized coaching to build your confidence. Our interview preparation significantly improves your chances of visa approval by ensuring you're well-prepared and confident."
        }
      ]
    },
    {
      category: "Support",
      icon: Users,
      questions: [
        {
          question: "Do you provide support after I arrive in my destination country?",
          answer: "Yes, our support continues even after you arrive. We help with airport pickup arrangements, initial settling-in assistance, opening bank accounts, getting local SIM cards, and connecting you with other students. We're here to ensure your transition is as smooth as possible."
        },
        {
          question: "How can I track the progress of my application?",
          answer: "We provide regular updates via email, phone calls, and our online portal where you can track your application status in real-time. You'll have a dedicated counselor who will be your main point of contact throughout the process, ensuring clear communication at every step."
        },
        {
          question: "What if I need help with something not covered in your standard services?",
          answer: "We offer personalized assistance through our 'Other Services' option. Simply describe your specific needs, and our expert team will create a customized solution. Whether it's special documentation, unique circumstances, or additional support, we're here to help make your study abroad dreams a reality."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our counselors",
      action: "Call Now",
      color: "from-green-500 to-emerald-600",
      onClick: handleCallClick
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed answers via email",
      action: "Send Email",
      color: "from-blue-500 to-indigo-600",
      onClick: handleEmailClick
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Instant support during business hours",
      action: "Start Chat",
      color: "from-purple-500 to-violet-600",
      onClick: handleWhatsAppClick
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200"
          >
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Got Questions? We've Got{" "}
            <span className="bg-gradient-to-r from-[#450f8c] to-[#f96714] bg-clip-text text-transparent">
              Answers
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Find answers to the most common questions about studying abroad and our services
          </motion.p>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6 sm:space-y-8"
        >
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-4 sm:px-6 py-4 border-b border-gray-200/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#450f8c] to-[#f96714] rounded-lg flex items-center justify-center">
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{category.category}</h3>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-200/50">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItems.has(globalIndex);
                  
                  return (
                    <motion.div
                      key={questionIndex}
                      initial={false}
                      className="overflow-hidden"
                    >
                      <motion.button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:bg-gray-50/50"
                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
                            {faq.question}
                          </h4>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#450f8c] to-[#f96714] rounded-full flex items-center justify-center"
                          >
                            {isOpen ? (
                              <Minus className="w-3 h-3 text-white" />
                            ) : (
                              <Plus className="w-3 h-3 text-white" />
                            )}
                          </motion.div>
                        </div>
                      </motion.button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 sm:mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Our expert counselors are here to help you with personalized answers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={option.onClick}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{option.title}</h4>
                <p className="text-gray-600 text-sm sm:text-base mb-4">{option.description}</p>
                <div className="text-[#450f8c] font-semibold text-sm sm:text-base group-hover:text-[#f96714] transition-colors duration-300">
                  {option.action} →
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Why Students Choose Us</h3>
              <p className="opacity-90 text-sm sm:text-base">Trusted by thousands worldwide</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Clock, label: "24/7 Support", value: "Always Available" },
                { icon: Users, label: "Expert Team", value: "50+ Counselors" },
                { icon: GraduationCap, label: "Success Rate", value: "98%" },
                { icon: Globe, label: "Countries", value: "50+" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.2'%3E%3Cpath d='M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15S23.3 0 15 0zm0 27C8.4 27 3 21.6 3 15S8.4 3 15 3s12 5.4 12 12-5.4 12-12 12z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}