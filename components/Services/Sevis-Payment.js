import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CreditCard, FileText, Calendar, Mail, User, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function SevisPaymentScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    paymentDate: '',
    visaDocumentType: '',
    sevisFile: null
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      sevisFile: file
    });
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.paymentDate !== '' &&
      formData.visaDocumentType !== '' &&
      formData.sevisFile !== null
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setStatus('incomplete');
      return;
    }

    setIsLoading(true);
    setStatus('');

    // Prepare payment data to save
    const paymentData = {
      ...formData,
      sevisFile: formData.sevisFile ? {
        name: formData.sevisFile.name,
        size: formData.sevisFile.size,
        type: formData.sevisFile.type
      } : null,
      timestamp: new Date().toISOString(),
      totalAmount: 390,
      paymentStatus: 'pending'
    };

    try {
      // Save data to localStorage (Note: In artifacts, this is stored in component state)
      // In a real application, this would work:
      // localStorage.setItem('sevisPaymentData', JSON.stringify(paymentData));
      
      // Simulate saving to localStorage
      console.log('Saving payment data:', paymentData);
      
      // Redirect to Stripe payment page after a short delay
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to Stripe payment URL in the same tab
        window.location.href = 'https://buy.stripe.com/test_6oU4gAg7W73b4lZ3bR5EY00';
      }, 1000);
      
    } catch (error) {
      console.error('Error saving payment data:', error);
      setStatus('error');
      setIsLoading(false);
    }
  };

  const visaDocumentOptions = [
    { value: '', label: 'Select visa document type' },
    { value: 'i20-f1', label: 'Form I-20 (F1 Visa)' },
    { value: 'ds2019-j1', label: 'Form DS-2019 (J1 Visa)' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-50 min-h-screen">
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
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200"
          >
            <CreditCard className="w-4 h-4" />
            SEVIS Payment
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            SEVIS Fee{" "}
            <span className="bg-gradient-to-r from-[#450f8c] to-[#f96714] bg-clip-text text-transparent">
              Payment
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Complete your SEVIS fee payment securely and get your receipt instantly
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50"
          >
            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700 font-medium">Payment processed successfully! Check your email for receipt.</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 font-medium">Payment failed. Please try again.</p>
              </motion.div>
            )}

            {status === 'incomplete' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-yellow-700 font-medium">Please fill in all required fields before proceeding.</p>
              </motion.div>
            )}

            <div className="space-y-6">
              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#450f8c] focus:border-transparent transition-all duration-300"
                    placeholder="Please enter full name as shown on your passport"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Please enter full name as shown on your passport</p>
              </motion.div>

              {/* Email Address */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#450f8c] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>
              </motion.div>

              {/* Payment Date */}
              <motion.div variants={itemVariants}>
                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Date for payment to be made *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    id="paymentDate"
                    name="paymentDate"
                    required
                    value={formData.paymentDate}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#450f8c] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </motion.div>

              {/* Visa Document Type */}
              <motion.div variants={itemVariants}>
                <label htmlFor="visaDocumentType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Visa Document *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="visaDocumentType"
                    name="visaDocumentType"
                    required
                    value={formData.visaDocumentType}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#450f8c] focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  >
                    {visaDocumentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* File Upload */}
              <motion.div variants={itemVariants}>
                <label htmlFor="sevisFile" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Your SEVIS Coupon *
                </label>
                
                {!formData.sevisFile ? (
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#450f8c] transition-colors duration-300">
                    <div className="text-center">
                      <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="sevisFile"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#450f8c] hover:text-[#f96714] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#450f8c]"
                        >
                          <span>Choose File</span>
                          <input
                            id="sevisFile"
                            name="sevisFile"
                            type="file"
                            required
                            onChange={handleFileChange}
                            className="sr-only"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">No file chosen</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-green-300 bg-green-50 rounded-xl p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="mb-2">
                        <p className="font-medium text-gray-900 mb-1">{formData.sevisFile.name}</p>
                        <p className="text-sm text-green-600 font-medium">✓ Uploaded Successfully</p>
                      </div>
                      <label
                        htmlFor="sevisFileChange"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#450f8c] hover:text-[#f96714] border border-[#450f8c] hover:border-[#f96714] rounded-lg cursor-pointer transition-colors duration-300"
                      >
                        <Upload className="w-4 h-4" />
                        Change Upload
                        <input
                          id="sevisFileChange"
                          name="sevisFile"
                          type="file"
                          onChange={handleFileChange}
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid()}
                whileHover={{ scale: (isLoading || !isFormValid()) ? 1 : 1.02, y: (isLoading || !isFormValid()) ? 0 : -2 }}
                whileTap={{ scale: (isLoading || !isFormValid()) ? 1 : 0.98 }}
                className={`w-full px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isFormValid() && !isLoading
                    ? 'bg-gradient-to-r from-[#450f8c] to-[#f96714] text-white hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Redirecting to Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay Now - $390
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Payment Breakdown */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Payment Instructions */}
            <motion.div 
              variants={itemVariants}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-[#450f8c]" />
                <h2 className="text-xl font-bold text-gray-900">SEVIS FEE PAYMENT INSTRUCTIONS</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Breakdown:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">SEVIS Fee:</span>
                      <span className="font-semibold text-gray-900">$360</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Payment Method Charges:</span>
                      <span className="font-semibold text-gray-900">$20</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Website Utility Maintenance Fee:</span>
                      <span className="font-semibold text-gray-900">$10</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-900">Total Amount:</span>
                  <span className="text-[#450f8c]">$390</span>
                </div>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Secure Payment</h3>
                  <p className="text-sm text-green-700">
                    Your payment is processed securely through encrypted channels. 
                    You will receive an email confirmation upon successful payment.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Support Notice */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
            >
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
                  <p className="text-sm text-blue-700 mb-2">
                    If you encounter any issues during payment, our support team is here to help.
                  </p>
                  <p className="text-sm font-medium text-blue-800">
                    Contact: +1 (216) 624-1878
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}