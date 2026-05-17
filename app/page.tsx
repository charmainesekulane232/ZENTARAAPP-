'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { OnboardingScreen } from '@/components/onboarding-screen'
import { DashboardScreen } from '@/components/dashboard-screen'
import { TransactionsScreen } from '@/components/transactions-screen'
import { AICoachScreen } from '@/components/ai-coach-screen'
import { InsightsScreen } from '@/components/insights-screen'
import { PremiumScreen } from '@/components/premium-screen'
import { SettingsScreen } from '@/components/settings-screen'
import { BottomNav } from '@/components/bottom-nav'

type Screen = 'onboarding' | 'dashboard' | 'transactions' | 'ai-coach' | 'insights' | 'premium' | 'settings'

export default function ZentaraApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding')
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  
  // Check if user has already onboarded (in real app, this would be from storage)
  useEffect(() => {
    const onboarded = localStorage.getItem('zentara_onboarded')
    if (onboarded === 'true') {
      setHasOnboarded(true)
      setCurrentScreen('dashboard')
    }
  }, [])
  
  const handleOnboardingComplete = () => {
    setHasOnboarded(true)
    setCurrentScreen('dashboard')
    localStorage.setItem('zentara_onboarded', 'true')
  }
  
  const handleTabChange = (tab: string) => {
    if (tab === 'premium') {
      setShowPremium(true)
    } else {
      setCurrentScreen(tab as Screen)
    }
  }
  
  const handleUpgrade = () => {
    setShowPremium(true)
  }
  
  // Show onboarding if not completed
  if (!hasOnboarded && currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />
  }
  
  return (
    <div className="min-h-screen max-w-lg mx-auto bg-background relative">
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden max-w-lg mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentScreen === 'dashboard' && (
            <DashboardScreen onNavigate={handleTabChange} />
          )}
          {currentScreen === 'transactions' && (
            <TransactionsScreen />
          )}
          {currentScreen === 'ai-coach' && (
            <AICoachScreen onUpgrade={handleUpgrade} />
          )}
          {currentScreen === 'insights' && (
            <InsightsScreen />
          )}
          {currentScreen === 'settings' && (
            <SettingsScreen onUpgrade={handleUpgrade} />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={currentScreen} 
        onTabChange={handleTabChange} 
      />
      
      {/* Premium Modal */}
      <AnimatePresence>
        {showPremium && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <PremiumScreen onClose={() => setShowPremium(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
