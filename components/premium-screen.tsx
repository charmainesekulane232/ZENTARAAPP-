'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crown,
  Check,
  Sparkles,
  Brain,
  BarChart3,
  Shield,
  Zap,
  X,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PremiumScreenProps {
  onClose?: () => void
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 'R0',
    period: '/month',
    description: 'Basic income tracking',
    features: [
      'Connect 1 bank account',
      'Basic transaction categorization',
      'Monthly summary reports',
      '3 AI insights per month',
      'Community support',
    ],
    cta: 'Current Plan',
    disabled: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'R149',
    period: '/month',
    description: 'For serious freelancers',
    popular: true,
    features: [
      'Unlimited bank accounts',
      'Smart auto-categorization',
      'Real-time analytics',
      'Unlimited AI insights',
      'AI Profit Coach',
      'Export reports (PDF/CSV)',
      'Priority support',
      'Tax report generation',
    ],
    cta: 'Upgrade Now',
    disabled: false,
  },
  {
    id: 'business',
    name: 'Business',
    price: 'R399',
    period: '/month',
    description: 'For growing teams',
    features: [
      'Everything in Premium',
      'Team collaboration (5 users)',
      'Invoice management',
      'Client billing integration',
      'Advanced forecasting',
      'API access',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    disabled: false,
  },
]

export function PremiumScreen({ onClose }: PremiumScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [isAnnual, setIsAnnual] = useState(false)
  
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Upgrade</h1>
              <p className="text-xs text-muted-foreground">Unlock all features</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </header>
      
      <div className="px-4 space-y-6 pt-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Save 20% with annual</span>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Supercharge Your Finances
          </h2>
          <p className="text-muted-foreground text-sm">
            Join 10,000+ freelancers using Zentara Premium
          </p>
        </motion.div>
        
        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3"
        >
          <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              isAnnual ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
              animate={{ left: isAnnual ? '1.75rem' : '0.25rem' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Annual
          </span>
        </motion.div>
        
        {/* Plan Cards */}
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <motion.button
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full text-left glass rounded-2xl p-4 border-2 transition-all ${
                selectedPlan === plan.id
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent'
              }`}
            >
              {plan.popular && (
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full gradient-primary text-[10px] text-primary-foreground font-medium mb-3">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}
              
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-foreground">
                    {isAnnual && plan.id !== 'free'
                      ? `R${Math.round(parseInt(plan.price.replace('R', '')) * 0.8)}`
                      : plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {plan.features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
                {plan.features.length > 4 && (
                  <p className="text-xs text-primary pl-6">
                    +{plan.features.length - 4} more features
                  </p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
        
        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="glass rounded-xl p-4">
            <Brain className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm font-medium text-foreground">AI Insights</p>
            <p className="text-xs text-muted-foreground">Smart recommendations</p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <BarChart3 className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm font-medium text-foreground">Analytics</p>
            <p className="text-xs text-muted-foreground">Deep financial insights</p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <Shield className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm font-medium text-foreground">Secure</p>
            <p className="text-xs text-muted-foreground">Bank-grade encryption</p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <Zap className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm font-medium text-foreground">Fast</p>
            <p className="text-xs text-muted-foreground">Real-time sync</p>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          <Button className="w-full h-14 text-base font-semibold gradient-primary text-primary-foreground rounded-2xl">
            {selectedPlan === 'business' ? 'Contact Sales' : 'Start Free Trial'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            7-day free trial • Cancel anytime • No credit card required
          </p>
        </motion.div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-4"
        >
          <p className="text-xs text-muted-foreground text-center mb-3">Trusted by freelancers at</p>
          <div className="flex items-center justify-center gap-4 opacity-50">
            <span className="text-sm font-bold text-muted-foreground">Upwork</span>
            <span className="text-sm font-bold text-muted-foreground">Fiverr</span>
            <span className="text-sm font-bold text-muted-foreground">Toptal</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
