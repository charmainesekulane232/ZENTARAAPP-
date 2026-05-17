'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Smartphone,
  Database,
  FileText,
  Lock,
  ExternalLink,
  Crown
} from 'lucide-react'
import { demoUser, demoAccounts, formatCurrency } from '@/lib/demo-data'
import { Button } from '@/components/ui/button'

interface SettingsScreenProps {
  onUpgrade: () => void
}

const settingsGroups = [
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile Settings', icon: User, description: 'Name, email, photo' },
      { id: 'subscription', label: 'Subscription', icon: Crown, description: 'Premium plan', badge: 'PRO' },
      { id: 'connected', label: 'Connected Accounts', icon: CreditCard, description: '2 accounts linked' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Push & email alerts' },
      { id: 'appearance', label: 'Appearance', icon: Moon, description: 'Dark mode enabled' },
      { id: 'currency', label: 'Currency & Region', icon: Smartphone, description: 'ZAR • South Africa' },
    ],
  },
  {
    title: 'Data & Security',
    items: [
      { id: 'security', label: 'Security', icon: Shield, description: 'Password, 2FA' },
      { id: 'privacy', label: 'Privacy', icon: Lock, description: 'Data sharing settings' },
      { id: 'export', label: 'Export Data', icon: Database, description: 'Download your data' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', label: 'Help Center', icon: HelpCircle, description: 'FAQs & guides' },
      { id: 'terms', label: 'Terms of Service', icon: FileText, description: 'Legal information' },
    ],
  },
]

export function SettingsScreen({ onUpgrade }: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
      </header>
      
      <div className="px-4 space-y-6 pt-2">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {demoUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">{demoUser.name}</h2>
              <p className="text-sm text-muted-foreground">{demoUser.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full gradient-primary text-primary-foreground font-medium">
                  PREMIUM
                </span>
                <span className="text-xs text-muted-foreground">
                  Since {new Date(demoUser.joinedDate).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>
        
        {/* Connected Banks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Connected Banks</h3>
              <p className="text-xs text-muted-foreground">Investec API Integration</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/20 text-success">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-medium">Live</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {demoAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{account.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{account.type}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {formatCurrency(account.balance)}
                </p>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            className="w-full mt-4 border-dashed border-border text-muted-foreground"
          >
            + Add Another Account
          </Button>
        </motion.div>
        
        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + groupIndex * 0.05 }}
          >
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {group.title}
            </h3>
            <div className="glass rounded-2xl overflow-hidden">
              {group.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'subscription') onUpgrade()
                    }}
                    className={`w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors ${
                      index < group.items.length - 1 ? 'border-b border-border/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon className="w-4 h-4 text-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          {item.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full gradient-primary text-primary-foreground font-medium">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                )
              })}
            </div>
          </motion.div>
        ))}
        
        {/* API Architecture Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">Investec API Integration</h3>
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 shrink-0 mt-0.5 text-success" />
              <p>Read-only access - we can never move your money</p>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 shrink-0 mt-0.5 text-success" />
              <p>Bank-grade 256-bit AES encryption for all data</p>
            </div>
            <div className="flex items-start gap-2">
              <Database className="w-4 h-4 shrink-0 mt-0.5 text-success" />
              <p>POPIA compliant - your data is never sold</p>
            </div>
          </div>
          
          <a
            href="https://developer.investec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-4 text-xs text-primary"
          >
            Learn more about Investec Programmable Banking
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
        
        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full glass rounded-2xl p-4 flex items-center justify-center gap-2 text-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </motion.button>
        
        {/* Version */}
        <p className="text-xs text-center text-muted-foreground pb-4">
          Zentara v1.0.0 • Made with love in South Africa
        </p>
      </div>
    </div>
  )
}
