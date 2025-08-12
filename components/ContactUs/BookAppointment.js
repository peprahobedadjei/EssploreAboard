import React, { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  Video,
  MessageSquare,
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedDate: '',
    selectedTime: '',
    consultationType: 'video', // video, phone, or in-person
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  // Generate time slots (9 AM to 5 PM GMT, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break; // Stop at 5:00 PM
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: time, display: `${displayTime} GMT` });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Generate calendar dates (next 30 days, Monday-Friday only)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const endDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
    
    for (let date = new Date(today); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      // Only include Monday (1) to Friday (5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        dates.push(new Date(date));
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split('T')[0];
    setFormData({
      ...formData,
      selectedDate: dateString
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          selectedDate: '',
          selectedTime: '',
          consultationType: 'video',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const formatSelectedDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const consultationTypes = [
    { value: 'video', label: 'Video Call', icon: Video, description: 'Meet online via Zoom/Teams' },
    { value: 'phone', label: 'Phone Call', icon: Phone, description: 'Traditional phone consultation' },
    { value: 'in-person', label: 'In-Person', icon: MessageSquare, description: 'Meet at our office' }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <Calendar className="w-4 h-4" />
            Free Consultation
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Book Your{" "}
            <span className="bg-gradient-to-r from-[#450f8c] to-[#f96714] bg-clip-text text-transparent">
              Free Consultation
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Schedule a personalized consultation with our study abroad experts. 
            Get guidance tailored to your academic goals and career aspirations.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 mb-6"
            >
              Schedule Your Session
            </motion.h2>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-700 font-medium">Consultation received successfully!</p>
                  <p className="text-green-600 text-sm">We'll confirm your appointment via email within 24 hours.</p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 font-medium">Failed to book consultation. Please try again.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#450f8c] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-4">
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#450f8c] focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#450f8c] focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Consultation Type */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Type</h3>
                <div className="grid grid-cols-1 gap-3">
                  {consultationTypes.map((type) => (
                    <label key={type.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="consultationType"
                        value={type.value}
                        checked={formData.consultationType === type.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                        formData.consultationType === type.value
                          ? 'border-[#450f8c] bg-[#450f8c]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            formData.consultationType === type.value
                              ? 'bg-gradient-to-br from-[#450f8c] to-[#f96714] text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <type.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{type.label}</div>
                            <div className="text-sm text-gray-600">{type.description}</div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Date Selection */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {availableDates.slice(0, 20).map((date, index) => {
                      const dateString = date.toISOString().split('T')[0];
                      const isSelected = formData.selectedDate === dateString;
                      const isToday = date.toDateString() === new Date().toDateString();
                      
                      return (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => handleDateSelect(date)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#450f8c] to-[#f96714] text-white shadow-lg'
                              : isToday
                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xs opacity-75">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div>
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  {formData.selectedDate && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <Calendar className="w-4 h-4" />
                        Selected: {formatSelectedDate(formData.selectedDate)}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Time Selection */}
              {formData.selectedDate && (
                <motion.div 
                  variants={itemVariants}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time (GMT)</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                      {timeSlots.map((slot, index) => {
                        const isSelected = formData.selectedTime === slot.value;
                        
                        return (
                          <motion.button
                            key={index}
                            type="button"
                            onClick={() => setFormData({...formData, selectedTime: slot.value})}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              isSelected
                                ? 'bg-gradient-to-br from-[#450f8c] to-[#f96714] text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {slot.display}
                          </motion.button>
                        );
                      })}
                    </div>
                    {formData.selectedTime && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          <Clock className="w-4 h-4" />
                          Selected: {timeSlots.find(slot => slot.value === formData.selectedTime)?.display}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Additional Message */}
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#450f8c] focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your study abroad goals or any specific questions..."
                />
              </motion.div>

              {/* Disclaimer */}
              <motion.div variants={itemVariants}>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Important Note:</p>
                      <p>
                        All times are in GMT. If your selected time slot is not suitable, 
                        we will email you with alternative available times within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading || !formData.fullName || !formData.email || !formData.phone || !formData.selectedDate || !formData.selectedTime}
                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-[#450f8c] to-[#f96714] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    Book Free Consultation
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Information Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* What to Expect */}
            <motion.div 
              variants={itemVariants}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Assessment</h3>
                    <p className="text-gray-600 text-sm">We'll review your academic background, goals, and preferences to understand your needs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Guidance</h3>
                    <p className="text-gray-600 text-sm">Get personalized recommendations for countries, universities, and programs that match your profile.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Next Steps</h3>
                    <p className="text-gray-600 text-sm">Receive a customized roadmap with timelines, requirements, and action items for your journey.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-3xl p-8 text-white relative overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6">Why Choose Our Consultation?</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Free 45-minute personalized session</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Expert counselors with 10+ years experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Detailed university and scholarship guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>No obligation or pressure to sign up</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">Available Hours</span>
                  </div>
                  <p className="text-sm opacity-90">
                    Monday - Friday: 9:00 AM - 5:00 PM GMT<br />
                    All sessions are conducted by certified counselors
                  </p>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.2'%3E%3Cpath d='M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15S23.3 0 15 0zm0 27C8.4 27 3 21.6 3 15S8.4 3 15 3s12 5.4 12 12-5.4 12-12 12z'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}