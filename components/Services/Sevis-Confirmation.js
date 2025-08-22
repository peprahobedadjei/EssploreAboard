import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Home, Calendar, CreditCard, FileText } from "lucide-react";
import { useRouter } from 'next/router';

export default function PaymentConfirmationPage() {
  const router = useRouter();

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

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden flex items-center justify-center py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 10,
                delay: 0.5 
              }}
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-2xl"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50"
          >
            {/* Success Message */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Payment{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Successful!
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Thank you for your SEVIS fee payment. Your transaction has been processed successfully.
            </motion.p>

            {/* Payment Details */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border border-gray-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#450f8c]" />
                  <div>
                    <p className="text-sm text-gray-600">Amount Paid</p>
                    <p className="font-bold text-gray-900">$390.00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#f96714]" />
                  <div>
                    <p className="text-sm text-gray-600">Transaction Date</p>
                    <p className="font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email Confirmation Notice */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-blue-900 mb-2">Confirmation Email</h3>
                  <p className="text-blue-700 leading-relaxed">
                    A confirmation email and transaction details 
                    will be sent to your email address within the next few minutes to let you know we have recieved the payment.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-green-900 mb-2">What's Next?</h3>
                  <p className="text-green-700 leading-relaxed">
                    We will send your recipt once payment is done. Keep your receipt safe as you'll need it for your visa application. 
                    Our team will contact you with the next steps in your study abroad journey.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Go Home Button */}
            <motion.button
              variants={itemVariants}
              onClick={handleGoHome}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-[#450f8c] to-[#f96714] text-white hover:from-[#f96714] hover:to-[#450f8c] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3 mx-auto"
            >
              <Home className="w-5 h-5" />
              Go Home
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                →
              </motion.div>
            </motion.button>

            {/* Support Contact */}
            <motion.p
              variants={itemVariants}
              className="text-sm text-gray-500 mt-6"
            >
              Need help? Contact us at{" "}
              <span className="font-medium text-[#450f8c]">+1 (216) 624-1878</span>
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-20 blur-sm"
          />
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl opacity-20 blur-sm"
          />
        </motion.div>
      </div>
    </section>
  );
}