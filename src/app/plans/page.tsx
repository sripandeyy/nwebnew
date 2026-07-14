"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, Sparkles, Zap, Crown, Star, ArrowRight } from "lucide-react"
import Topbar from "../components/Topbar"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FloatingParticles from "../components/FloatingParticles"

type PlanType = "basic" | "advanced" | "pro"
type SubPlanType = "recorded" | "live" | "offline" | "online"

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)
  const [selectedSubPlan, setSelectedSubPlan] = useState<{ plan: PlanType; type: SubPlanType } | null>(null)
  const [hoveredCard, setHoveredCard] = useState<PlanType | null>(null)
  const [dragProgress, setDragProgress] = useState<{ [key: string]: number }>({})
  const [isUnlocking, setIsUnlocking] = useState<{ [key: string]: boolean }>({})
  const [modalSessionKey, setModalSessionKey] = useState(0)

  const resetAllPlanState = () => {
    setSelectedSubPlan(null)
    setSelectedPlan(null)
    setDragProgress({})
    setIsUnlocking({})
  }

  const openPlan = (planId: PlanType) => {
    setSelectedSubPlan(null)
    setDragProgress({})
    setIsUnlocking({})
    setModalSessionKey((key) => key + 1)
    setSelectedPlan(planId)
  }

  const plans = [
    {
      id: "basic" as PlanType,
      name: "Basic",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      glowColor: "rgba(59, 130, 246, 0.5)",
      icon: <Sparkles className="w-6 h-6" />,
      duration: "2 Months Duration",
      pros: [
        "Real Time Projects",
        "Recorded Sessions",
        "Doubt Clearance Sessions",
        "36Hr+ Live Sessions",
        "Certifications",
        "Resume Building",
        "LMS Subscription",
      ],
      cons: [
        "Mentor Support",
        "Placement Training",
        "Mock Interviews",
        "Seminars",
        "Presentation Sessions",
      ],
      subPlans: [
        {
          type: "recorded" as SubPlanType,
          name: " Self-paced",
          features: [
            "Lifetime access to all content",
            "Self-paced learning experience",
            "Budget-friendly pricing",
            "Download resources offline",
          ],
        },
        {
          type: "live" as SubPlanType,
          name: " Live Sessions",
          features: [
            "Real-time mentor interaction",
            "Immediate doubt resolution",
            "Includes all recordings",
            "Live Q&A sessions",
          ],
        },
      ],
    },
    {
      id: "advanced" as PlanType,
      name: "Advanced",
      gradient: "from-purple-500 via-fuchsia-600 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.5)",
      icon: <Zap className="w-6 h-6" />,
      duration: "4 Months Duration",
      pros: [
        "Real Time Projects",
        "Recorded Sessions",
        "Doubt Clearance Sessions",
        "52Hr+ Live Sessions",
        "Certifications",
        "Resume Building",
        "Mentor Support",
        "LMS Subscription of 1 Year",
      ],
      cons: [
        "Placement Training",
        "Mock Interviews",
        "Seminars",
        "Presentation Sessions",
      ],
      subPlans: [
        {
          type: "recorded" as SubPlanType,
          name: " Self-paced",
          features: [
            "Lifetime access to all content",
            "Self-paced learning experience",
            "Budget-friendly pricing",
            "Premium support included",
          ],
        },
        {
          type: "live" as SubPlanType,
          name: " Live Sessions",
          features: [
            "Real-time mentor interaction",
            "Immediate doubt resolution",
            "Includes all recordings",
            "Priority support access",
          ],
        },
      ],
    },
    {
      id: "pro" as PlanType,
      name: "Pro",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      glowColor: "rgba(251, 191, 36, 0.5)",
      icon: <Crown className="w-6 h-6" />,
      duration: "6 Months Duration",
      popular: true,
      pros: [
        "Real Time Projects",
        "Recorded Sessions",
        "Doubt Clearance Sessions",
        "100Hr+ Live Sessions",
        "Certifications",
        "Resume Building",
        "Mentor Support",
        "LMS Subscription of 1 Year",
        "Placement Training",
        "Mock Interviews",
        "Seminars",
        "Presentation Sessions",
      ],
      cons: [],
      subPlans: [
        {
          type: "offline" as SubPlanType,
          name: " Job Guarantee Program",
          features: [
            "In-person mentorship",
            "Real-world workshops",
            "Networking opportunities",
            "Hands-on project guidance",
            "Pay 70% of the total amount of the program to start your journey",
            "The remaining 30% is payable only after you successfully land a job",
          ],
        },
        {
          type: "online" as SubPlanType,
          name: " Job Assistance Program",
          features: [
            "Attend from anywhere",
            "Access recordings + live sessions",
            "Flexible scheduling",
            "24/7 learning platform access",
          ],
        },
      ],
    },
  ]

  const paymentConfig: Record<PlanType, Record<SubPlanType, { price: string; pre: string; full: string }>> = {
    basic: {
      recorded: { price: '₹5000 + GST', pre: 'https://rzp.io/rzp/NYE1kPR2m', full: 'https://rzp.io/rzp/NYFPBaSp' },
      live: { price: '₹7000 + GST', pre: 'https://rzp.io/rzp/NYE1kPR2m', full: 'https://rzp.io/rzp/NYFPBaL' },
      offline: { price: '₹5000 + GST', pre: 'https://rzp.io/rzp/NYE1kPR2m', full: 'https://rzp.io/rzp/NYFPBaSp' },
      online: { price: '₹7000 + GST', pre: 'https://rzp.io/rzp/NYE1kPR2m', full: 'https://rzp.io/rzp/NYFPBaL' },
    },
    advanced: {
      recorded: { price: '₹10000 + GST', pre: 'https://rzp.io/rzp/NYE2kPR4m', full: 'https://rzp.io/rzp/NYFPAdSp' },
      live: { price: '₹15000 + GST', pre: 'https://rzp.io/rzp/NYE2kPR4m', full: 'https://rzp.io/rzp/NYFPAdL' },
      offline: { price: '₹10000 + GST', pre: 'https://rzp.io/rzp/NYE2kPR4m', full: 'https://rzp.io/rzp/NYFPAdSp' },
      online: { price: '₹15000 + GST', pre: 'https://rzp.io/rzp/NYE2kPR4m', full: 'https://rzp.io/rzp/NYFPAdL' },
    },
    pro: {
      offline: { price: '₹120000 + GST', pre: 'https://rzp.io/rzp/NYE5kPRoffline', full: 'https://rzp.io/rzp/NYFPOff' },
      online: { price: '₹60000 + GST', pre: 'https://rzp.io/rzp/NYE3kPRPRO', full: 'https://rzp.io/rzp/NYFPProL' },
      recorded: { price: '₹120000 + GST', pre: 'https://rzp.io/rzp/NYE3kPRPRO', full: 'https://rzp.io/rzp/NYFPOff' },
      live: { price: '₹60000 + GST', pre: 'https://rzp.io/rzp/NYE3kPRPRO', full: 'https://rzp.io/rzp/NYFPProL' },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white/60">
      <Topbar />
      <Header />
      <main className="relative flex-grow pt-32 pb-20 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stunning 3D Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full mb-6 border border-white/10 shadow-2xl"
              style={{ backgroundColor: '#6600CC' }}
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-yellow-400" />
              </motion.div>
              <span className="text-sm font-semibold text-white tracking-wider">
                PREMIUM PLANS
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-6"
              style={{
                backgroundImage: 'linear-gradient(to right, #6600CC, #7c3aed, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(102, 0, 204, 0.4)',
              }}
            >
              Choose Your Learning Path
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Unlock your potential with our
              <span className="font-semibold bg-gradient-to-r from-[#6600CC] to-[#4f46e5] bg-clip-text text-transparent"> cutting-edge courses</span>
              and
              <span className="font-semibold bg-gradient-to-r from-[#6600CC] to-[#ec4899] bg-clip-text text-transparent"> expert mentorship</span>
            </motion.p>
          </motion.div>
          {/* Stunning 3D Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 sm:px-6" style={{ perspective: '2000px' }}>
            {plans.map((plan, index) => (
              <motion.div 
                key={plan.id}
                className={`relative ${plan.popular ? 'md:-mt-4' : 'mt-4'} isolate pointer-events-auto z-10`}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(plan.id)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-xs font-bold px-6 py-2 rounded-full shadow-2xl flex items-center gap-2"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(251, 191, 36, 0.6)',
                          '0 0 40px rgba(251, 191, 36, 0.8)',
                          '0 0 20px rgba(251, 191, 36, 0.6)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-4 h-4" fill="currentColor" />
                      </motion.div>
                      <span className="tracking-wider">MOST POPULAR</span>
                    </motion.div>
                  </motion.div>
                )}

                {/* Animated Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${plan.glowColor}, transparent 70%)`,
                  }}
                  animate={hoveredCard === plan.id ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* 3D Card with Glassmorphism */}
                <motion.div 
                  className={`relative h-full rounded-2xl overflow-hidden backdrop-blur-xl border-2 ${
                    plan.popular ? 'border-yellow-400/40' : 'border-gray-200'
                  } shadow-2xl mx-auto w-full max-w-xs sm:max-w-none bg-white/90`}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: plan.popular 
                      ? '0 25px 50px -12px rgba(251, 191, 36, 0.25)'
                      : '0 25px 40px -12px rgba(15, 23, 42, 0.18)',
                  }}
                >
                  {/* 3D Animated Header */}
                  <div className={`relative p-6 sm:p-8 text-center bg-gradient-to-br ${plan.gradient} overflow-hidden`}>
                    {/* Animated Background Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                      animate={{
                        backgroundPosition: ['0px 0px', '20px 20px'],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* 3D Icon Container */}
                    <motion.div 
                      className="relative w-24 h-24 mx-auto mb-6"
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={hoveredCard === plan.id ? { rotateY: 360 } : {}}
                    >
                      {/* Animated Shimmer */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <div className="relative flex items-center justify-center w-full h-full">
                        {React.cloneElement(plan.icon, { 
                          className: 'w-12 h-12 text-white drop-shadow-2xl',
                          strokeWidth: 2.5
                        })}
                      </div>
                    </motion.div>

                    <motion.h3 
                      className="text-3xl font-black mb-2 text-white drop-shadow-lg"
                      animate={hoveredCard === plan.id ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      {plan.name}
                    </motion.h3>
                    <p className="text-sm opacity-90 font-medium text-white/90">{plan.duration}</p>
                  </div>

                  {/* Features with Staggered Animation */}
                  <div className="p-8 space-y-1">
                    {plan.pros.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + i * 0.05 }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5 drop-shadow-lg" strokeWidth={3} />
                        </motion.div>
                        <span className="text-gray-800 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                    {plan.cons.map((feature, i) => (
                      <motion.div
                        key={`cons-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + (plan.pros.length + i) * 0.05 }}
                        className="flex items-start gap-3 p-2 rounded-lg opacity-60"
                      >
                        <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-gray-500 line-through font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* 3D Animated Button */}
                  <div className="p-8 pt-4">
                    <motion.div 
                      className="relative w-full pointer-events-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="button"
                        onClick={() => openPlan(plan.id)}
                        className={`relative w-full py-4 rounded-xl text-white font-bold text-lg overflow-hidden group z-30 bg-gradient-to-r ${plan.gradient}`}
                        style={{
                          boxShadow: `0 10px 30px ${plan.glowColor || 'rgba(0,0,0,0.2)'}`,
                        }}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          Choose Plan
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                        {/* Animated Shimmer */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            style={{
                              transform: 'skewX(-20deg)',
                              width: '50%',
                            }}
                            animate={{
                              left: ['-50%', '150%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      </button>
                    </motion.div>
                  {/* 3D Shadow */}
                  <div className="absolute inset-0 rounded-full bg-black/20 blur-xl pointer-events-none" 
                    style={{ transform: 'translateZ(-20px) scale(0.9)' }}
                  />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
      </div>
    </main>

      {/* Premium 3D Modal */}
      {selectedPlan && (
        <motion.div 
          key={`plan-modal-${modalSessionKey}`}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={resetAllPlanState}
        >
          <motion.div 
            className="relative max-w-lg w-full mx-2 sm:mx-4 overflow-hidden max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
              {/* Glassmorphism Card */}
              <div className="relative rounded-3xl overflow-hidden backdrop-blur-2xl border border-white/20 shadow-2xl"
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 0 50px rgba(139, 92, 246, 0.1)',
                }}
              >
                {/* Modal Header with Gradient */}
                <div className={`relative p-4 sm:p-6 md:p-8 border-b border-white/10 bg-gradient-to-br ${plans.find(p => p.id === selectedPlan)?.gradient} overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative flex justify-between items-start gap-2 mb-2 sm:mb-3">
                    <motion.h3 
                      className="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-lg flex-1"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {plans.find(p => p.id === selectedPlan)?.name} Plan
                    </motion.h3>
                    <motion.button 
                      onClick={resetAllPlanState}
                      className="text-white/80 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/10 rounded-full flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                  </div>
                  <p className="relative text-white/80 text-xs sm:text-sm">Select your preferred learning format</p>
                </div>

                {/* Plan Options or Payment Step */}
                <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                  {!selectedSubPlan && plans
                    .find((p) => p.id === selectedPlan)
                    ?.subPlans.map((subPlan, index) => {
                      const isOnline = subPlan.type === 'online' || subPlan.type === 'live';
                      const priceLabel = selectedPlan ? paymentConfig[selectedPlan][subPlan.type].price : '';
                      return (
                        <motion.div 
                          key={subPlan.type}
                          className="relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-white/10 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            y: -4,
                            scale: 1.02,
                            boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.3)',
                          }}
                        >
                          {/* Background Gradient */}
                          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: isOnline 
                                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
                                : 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
                            }}
                          />
                          
                          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <motion.div 
                                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${isOnline ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                {isOnline ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                )}
                              </motion.div>
                              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">{subPlan.name}</h4>
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-white/90 bg-white/10 px-2.5 sm:px-3 py-1 rounded-full border border-white/10 self-start sm:self-auto whitespace-nowrap shrink-0">{priceLabel}</div>
                          </div>
                          
                          <ul className="relative space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            {subPlan.features.map((feature, i) => (
                              <motion.li 
                                key={i} 
                                className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + i * 0.05 }}
                              >
                                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                <span className="leading-relaxed">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {(() => {
                            const dragKey = `${selectedPlan}-${subPlan.type}`;
                            const progress = dragProgress[dragKey] || 0;
                            const unlocking = isUnlocking[dragKey] || false;
                            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                            const maxDrag = isMobile ? 180 : 250;
                            const threshold = isMobile ? 140 : 190;

                            return (
                              <div 
                                className="relative w-full h-12 sm:h-14 md:h-16 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-slate-700/50"
                                style={{
                                  overflow: 'hidden',
                                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)'
                                }}
                              >
                                {/* Enhanced Chevron Arrows on Right */}
                                <div className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
                                  {[...Array(5)].map((_, i) => {
                                    const isActive = progress > i * 18;
                                    const isPastThreshold = progress > 70;
                                    return (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0.2 }}
                                        animate={{
                                          opacity: isPastThreshold 
                                            ? [0.6, 1, 0.6]
                                            : isActive 
                                              ? [0.4, 0.8, 0.4] 
                                              : [0.2, 0.7, 0.2],
                                          scale: isPastThreshold ? [1, 1.1, 1] : [1, 1.05, 1]
                                        }}
                                        transition={{
                                          opacity: { 
                                            duration: 0.6, 
                                            repeat: Infinity,
                                            delay: i * 0.15,
                                            ease: "easeInOut"
                                          },
                                          scale: {
                                            duration: 0.6,
                                            repeat: Infinity,
                                            delay: i * 0.15,
                                            ease: "easeInOut"
                                          }
                                        }}
                                      >
                                        <svg 
                                          width="14" 
                                          height="14" 
                                          className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] text-white" 
                                          viewBox="0 0 24 24" 
                                          fill="none" 
                                          stroke="currentColor" 
                                          strokeWidth={isPastThreshold ? "3" : "2.5"}
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                      </motion.div>
                                    );
                                  })}
                                </div>

                                {/* Draggable Pill Button */}
                                <motion.div
                                  className={`absolute top-1 sm:top-1.5 md:top-2 left-1 sm:left-1.5 md:left-2 h-10 sm:h-11 md:h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing px-4 sm:px-6 md:px-8 will-change-transform touch-none`}
                                  style={{
                                    background: isOnline 
                                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                      : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                    boxShadow: progress > 70
                                      ? `0 4px 20px ${isOnline ? 'rgba(16, 185, 129, 0.6)' : 'rgba(139, 92, 246, 0.6)'}, 0 0 40px ${isOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`
                                      : '0 4px 12px rgba(0, 0, 0, 0.3)',
                                    minWidth: isMobile ? '140px' : '180px',
                                    WebkitBackfaceVisibility: 'hidden',
                                    backfaceVisibility: 'hidden',
                                    transform: 'translateZ(0)'
                                  }}
                                  drag="x"
                                  dragConstraints={{ left: 0, right: maxDrag }}
                                  dragElastic={0.08}
                                  dragMomentum={false}
                                  dragTransition={{ bounceStiffness: 220, bounceDamping: 18 }}
                                  whileTap={{ 
                                    scale: 0.99,
                                    boxShadow: `0 2px 8px ${isOnline ? 'rgba(16, 185, 129, 0.4)' : 'rgba(139, 92, 246, 0.4)'}`
                                  }}
                                  whileHover={{
                                    scale: 1.01,
                                    boxShadow: `0 6px 16px ${isOnline ? 'rgba(16, 185, 129, 0.4)' : 'rgba(139, 92, 246, 0.4)'}`
                                  }}
                                  onDrag={(e, info) => {
                                    const dragAmount = Math.max(0, Math.min(info.point.x - info.offset.x, maxDrag));
                                    const progressPercent = (dragAmount / maxDrag) * 100;
                                    const current = dragProgress[dragKey] || 0;
                                    if (Math.abs(current - progressPercent) >= 0.5) {
                                      setDragProgress(prev => ({ ...prev, [dragKey]: progressPercent }));
                                    }
                                  }}
                                  onDragEnd={(e, info) => {
                                    const dragAmount = Math.max(0, info.point.x - info.offset.x);
                                    if (dragAmount > threshold && selectedPlan) {
                                      setIsUnlocking(prev => ({ ...prev, [dragKey]: true }));
                                      setTimeout(() => {
                                        setSelectedSubPlan({ plan: selectedPlan, type: subPlan.type });
                                        setDragProgress(prev => ({ ...prev, [dragKey]: 0 }));
                                        setIsUnlocking(prev => ({ ...prev, [dragKey]: false }));
                                      }, 500);
                                    } else {
                                      setDragProgress(prev => ({ ...prev, [dragKey]: 0 }));
                                    }
                                  }}
                                  animate={{
                                    x: unlocking ? maxDrag : progress === 0 ? [0, 12, 0] : 0,
                                    rotateY: progress > 60 ? [0, 10, -10, 0] : 0,
                                    scale: progress > 70 ? [1, 1.05, 1] : 1
                                  }}
                                  transition={{
                                    x: unlocking 
                                      ? { type: 'spring', stiffness: 220, damping: 20 }
                                      : progress === 0 
                                        ? { duration: 1.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }
                                        : { type: 'spring', stiffness: 220, damping: 20 },
                                    rotateY: { duration: 0.45, repeat: progress > 60 ? Infinity : 0, ease: 'easeInOut' },
                                    scale: { duration: 0.28, repeat: progress > 70 ? Infinity : 0, ease: 'easeOut' }
                                  }}
                                >
                                  {/* Glass Shine Effect */}
                                  <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <motion.div
                                      className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent"
                                      animate={{
                                        opacity: [0.3, 0.5, 0.3]
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    />
                                  </div>

                                  {/* Drag Text with Animation */}
                                  <motion.span 
                                    className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wide relative z-10 flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                                    animate={{
                                      x: progress > 50 ? 4 : [0, 2, 0]
                                    }}
                                    transition={{
                                      x: progress > 50 ? { duration: 0.18, ease: 'easeOut' } : { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                                    }}
                                  >
                                    <motion.span
                                      animate={{
                                        opacity: progress > 70 ? 0 : 1
                                      }}
                                    >
                                      Proceed for Payment
                                    </motion.span>
                                    {progress > 70 && (
                                      <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute left-0"
                                      >
                                        Release Now!
                                      </motion.span>
                                    )}
                                  </motion.span>
                                </motion.div>

                                {/* Drag Trail Effect */}
                                {progress > 20 && !unlocking && (
                                  <motion.div
                                    className="absolute left-0 top-0 bottom-0 rounded-full"
                                    style={{
                                      width: `${progress}%`,
                                      background: isOnline 
                                        ? 'linear-gradient(to right, rgba(16, 185, 129, 0.2), transparent)'
                                        : 'linear-gradient(to right, rgba(139, 92, 246, 0.2), transparent)'
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                  />
                                )}

                                {/* Success Glow */}
                                {unlocking && (
                                  <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '200%' }}
                                    transition={{ duration: 0.5 }}
                                  />
                                )}
                              </div>
                            );
                          })()}
                        </motion.div>
                      );
                    })}

                  {selectedSubPlan && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                          {plans.find(p => p.id === selectedSubPlan!.plan)?.name} - {selectedSubPlan!.type === 'live' ? 'Live' : selectedSubPlan!.type === 'recorded' ? 'Recorded' : selectedSubPlan!.type === 'online' ? 'Online' : 'Offline'}
                        </h4>
                        <div className="text-xs sm:text-sm font-semibold text-white/90 bg-white/10 px-2.5 sm:px-3 py-1 rounded-full border border-white/10 whitespace-nowrap shrink-0">
                          {paymentConfig[selectedSubPlan!.plan][selectedSubPlan!.type].price}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <a
                          href={paymentConfig[selectedSubPlan!.plan][selectedSubPlan!.type].pre}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-blue-400/40 hover:border-blue-400/80 bg-blue-500/10 text-white transition-all overflow-hidden"
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                          <div className="relative flex items-center justify-between">
                            <div>
                              <div className="text-base sm:text-lg font-bold">Pre-registration</div>
                              <div className="text-xs text-white/80">Pay and reserve your seat</div>
                            </div>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                        </a>

                        <a
                          href={paymentConfig[selectedSubPlan!.plan][selectedSubPlan!.type].full}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-emerald-400/40 hover:border-emerald-400/80 bg-emerald-500/10 text-white transition-all overflow-hidden"
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
                          <div className="relative flex items-center justify-between">
                            <div>
                              <div className="text-base sm:text-lg font-bold">Full Payment</div>
                              <div className="text-xs text-white/80">Pay the full course fee</div>
                            </div>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                        </a>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 pt-2">
                        <button
                          className="text-white/80 hover:text-white text-xs sm:text-sm underline underline-offset-4 text-center sm:text-left"
                          onClick={() => setSelectedSubPlan(null)}
                        >
                          Back to delivery options
                        </button>
                        <button
                          className="text-white/80 hover:text-white text-xs sm:text-sm underline underline-offset-4 text-center sm:text-left"
                          onClick={resetAllPlanState}
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
      )}
      <Footer />
    </div>
  )
}

export default PlansPage
