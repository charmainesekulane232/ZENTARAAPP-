'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BarChart2,
  ChevronRight,
  RefreshCw,
  Lock,
  Zap
} from 'lucide-react'
import { demoAIInsights, demoUser } from '@/lib/demo-data'
import type { AIInsight } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface AICoachScreenProps {
  onUpgrade: () => void
}

const insightIcons: Record<AIInsight['type'], typeof TrendingUp> = {
  'opportunity': TrendingUp,
  'warning': AlertTriangle,
  'tip': Lightbulb,
  'pattern': BarChart2,
}

const insightColors: Record<AIInsight['type'], { bg: string; text: string; border: string }> = {
  'opportunity': { bg: 'bg-success/10', text: 'text-success', border: 'border-success/30' },
  'warning': { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/30' },
  'tip': { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30' },
  'pattern': { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/30' },
}

export function AICoachScreen({ onUpgrade }: AICoachScreenProps) {
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const isPremium = demoUser.plan === 'premium'
  
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }
  
  const highPriorityInsights = demoAIInsights.filter(i => i.priority === 'high')
  const otherInsights = demoAIInsights.filter(i => i.priority !== 'high')
  
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Profit Coach</h1>
                <p className="text-xs text-muted-foreground">Powered by NLP Engine</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
            >
              <RefreshCw className={`w-4 h-4 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </div>
      </header>
      
      <div className="px-4 space-y-6 pt-2">
        {/* AI Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl gradient-primary p-6"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary-foreground/70" />
              <span className="text-sm text-primary-foreground/70">AI Analysis</span>
            </div>
            
            <p className="text-lg font-medium text-primary-foreground leading-relaxed mb-4">
              {`"Your freelance income has grown 38% this quarter. I've identified 3 opportunities to increase earnings by an additional R12,000/month."`}
            </p>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20">
                <Zap className="w-3 h-3 text-primary-foreground" />
                <span className="text-xs font-medium text-primary-foreground">
                  {demoAIInsights.length} insights ready
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* High Priority Insights */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h2 className="text-base font-semibold text-foreground">Priority Actions</h2>
          </div>
          
          <div className="space-y-3">
            {highPriorityInsights.map((insight, index) => {
              const Icon = insightIcons[insight.type]
              const colors = insightColors[insight.type]
              
              return (
                <motion.button
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedInsight(insight)}
                  className={`w-full glass rounded-2xl p-4 text-left border ${colors.border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-foreground">{insight.title}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} font-medium uppercase`}>
                          {insight.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {insight.description}
                      </p>
                      {insight.impact && (
                        <p className={`text-xs font-medium mt-2 ${colors.text}`}>
                          {insight.impact}
                        </p>
                      )}
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
        
        {/* Other Insights */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">More Insights</h2>
          </div>
          
          <div className="space-y-3">
            {otherInsights.map((insight, index) => {
              const Icon = insightIcons[insight.type]
              const colors = insightColors[insight.type]
              const isLocked = !isPremium && index > 0
              
              return (
                <motion.button
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => isLocked ? onUpgrade() : setSelectedInsight(insight)}
                  className={`w-full glass rounded-2xl p-4 text-left relative ${isLocked ? 'opacity-60' : ''}`}
                >
                  {isLocked && (
                    <div className="absolute inset-0 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="flex items-center gap-2 text-primary">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm font-medium">Premium</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground mb-1">{insight.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {insight.description}
                      </p>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
        
        {/* AI Engine Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-foreground mb-2">How AI Coach Works</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            Our NLP engine analyzes your transaction patterns, income sources, and spending habits 
            to provide personalized recommendations. The AI learns from your financial behavior 
            to improve suggestions over time.
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-primary">150+</p>
              <p className="text-[10px] text-muted-foreground">Data Points</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-primary">24/7</p>
              <p className="text-[10px] text-muted-foreground">Monitoring</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-primary">98%</p>
              <p className="text-[10px] text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Insight Detail Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute bottom-0 left-0 right-0 glass-strong rounded-t-3xl p-6 max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 rounded-full bg-muted mx-auto mb-6" />
              
              <div className={`w-14 h-14 rounded-2xl ${insightColors[selectedInsight.type].bg} flex items-center justify-center mb-4`}>
                {(() => {
                  const Icon = insightIcons[selectedInsight.type]
                  return <Icon className={`w-7 h-7 ${insightColors[selectedInsight.type].text}`} />
                })()}
              </div>
              
              <span className={`text-xs px-3 py-1 rounded-full ${insightColors[selectedInsight.type].bg} ${insightColors[selectedInsight.type].text} font-medium uppercase`}>
                {selectedInsight.type}
              </span>
              
              <h2 className="text-xl font-bold text-foreground mt-3 mb-2">
                {selectedInsight.title}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                {selectedInsight.description}
              </p>
              
              {selectedInsight.impact && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${insightColors[selectedInsight.type].bg} mb-6`}>
                  <TrendingUp className={`w-4 h-4 ${insightColors[selectedInsight.type].text}`} />
                  <span className={`text-sm font-medium ${insightColors[selectedInsight.type].text}`}>
                    {selectedInsight.impact}
                  </span>
                </div>
              )}
              
              {selectedInsight.actionable && (
                <Button className="w-full h-12 gradient-primary text-primary-foreground rounded-xl">
                  Take Action
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
