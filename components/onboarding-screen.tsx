'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface OnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    id: 1,
    title: 'Welcome to Zentara',
    subtitle: 'AI-Powered Income Intelligence',
    description: 'Built for freelancers, creators, and side hustlers who want to understand and grow their income.',
    icon: Sparkles,
    gradient: 'from-primary via-accent to-chart-2',
  },
  {
    id: 2,
    title: 'Track Every Stream',
    subtitle: 'Income Intelligence',
    description: 'Automatically categorize income from freelancing, side hustles, and passive sources. See the full picture.',
    icon: TrendingUp,
    gradient: 'from-chart-1 via-chart-2 to-chart-3',
  },
  {
    id: 3,
    title: 'AI Profit Coach',
    subtitle: 'Smart Recommendations',
    description: 'Get personalized insights on how to increase your earnings and optimize your expenses.',
    icon: Zap,
    gradient: 'from-accent via-primary to-chart-1',
  },
  {
    id: 4,
    title: 'Bank-Grade Security',
    subtitle: 'Your Data is Safe',
    description: 'End-to-end encryption, read-only API access, and full compliance with financial regulations.',
    icon: Shield,
    gradient: 'from-success via-chart-4 to-chart-5',
  },
]

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1)
    } else {
      onComplete()
    }
  }
  
  const handleSkip = () => {
    onComplete()
  }
  
  const slide = slides[currentSlide]
  const Icon = slide.icon
  
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 gradient-glow opacity-50" />
      
      {/* Skip button */}
      <div className="relative z-10 flex justify-end p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip
        </Button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            {/* Icon container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className={`relative mb-8`}
            >
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${slide.gradient} p-0.5`}>
                <div className="w-full h-full rounded-3xl bg-background/90 flex items-center justify-center">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
              </div>
              <motion.div
                className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${slide.gradient} opacity-30 blur-2xl -z-10`}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            </motion.div>
            
            {/* Text content */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-primary font-medium mb-2"
            >
              {slide.subtitle}
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-3xl font-bold text-foreground mb-4 text-balance"
            >
              {slide.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground leading-relaxed text-pretty"
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Bottom section */}
      <div className="relative z-10 px-6 pb-8 space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        
        {/* CTA Button */}
        <Button
          onClick={handleNext}
          className="w-full h-14 text-base font-semibold gradient-primary text-primary-foreground rounded-2xl"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        {/* Terms */}
        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our{' '}
          <span className="text-primary">Terms of Service</span> and{' '}
          <span className="text-primary">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}
