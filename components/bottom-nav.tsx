'use client'

import { Home, Receipt, Brain, BarChart3, Settings, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'transactions', label: 'Money', icon: Receipt },
  { id: 'ai-coach', label: 'AI Coach', icon: Brain, highlight: true },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/30 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300',
                isActive && 'bg-primary/20',
                item.highlight && !isActive && 'relative'
              )}
            >
              {item.highlight && !isActive && (
                <motion.span
                  className="absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Sparkles className="w-3 h-3 text-accent" />
                </motion.span>
              )}
              
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0 
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Icon 
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )} 
                />
              </motion.div>
              
              <span 
                className={cn(
                  'text-[10px] mt-1 font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
