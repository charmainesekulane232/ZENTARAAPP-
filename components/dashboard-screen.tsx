'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Bell,
  ChevronRight,
  Wallet
} from 'lucide-react'
import { 
  demoTransactions, 
  demoMonthlyStats, 
  demoUser,
  formatCurrency,
  calculateSummary
} from '@/lib/demo-data'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts'

interface DashboardScreenProps {
  onNavigate: (tab: string) => void
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const summary = calculateSummary(demoTransactions)
  const recentTransactions = demoTransactions.slice(0, 5)
  
  // Calculate growth
  const lastMonth = demoMonthlyStats[demoMonthlyStats.length - 2]
  const currentMonth = demoMonthlyStats[demoMonthlyStats.length - 1]
  const growth = ((currentMonth.profit - lastMonth.profit) / lastMonth.profit * 100).toFixed(1)
  
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Good morning</p>
            <h1 className="text-xl font-bold text-foreground">{demoUser.name.split(' ')[0]}</h1>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-full glass flex items-center justify-center"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </motion.button>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold"
            >
              {demoUser.name.charAt(0)}
            </motion.div>
          </div>
        </div>
      </header>
      
      <div className="px-4 space-y-6 pt-2">
        {/* Main Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl gradient-primary p-6"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-primary-foreground/70" />
              <p className="text-sm text-primary-foreground/70">Net Profit This Month</p>
            </div>
            
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              {formatCurrency(summary.profit)}
            </h2>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20">
                <TrendingUp className="w-3 h-3 text-primary-foreground" />
                <span className="text-xs font-medium text-primary-foreground">+{growth}%</span>
              </div>
              <span className="text-xs text-primary-foreground/70">vs last month</span>
            </div>
          </div>
        </motion.div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-success/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Income</span>
            </div>
            <p className="text-xl font-bold text-foreground">{formatCurrency(summary.income)}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-destructive/20 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Expenses</span>
            </div>
            <p className="text-xl font-bold text-foreground">{formatCurrency(summary.expenses)}</p>
          </motion.div>
        </div>
        
        {/* Income Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Profit Trend</h3>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <button 
              onClick={() => onNavigate('insights')}
              className="text-sm text-primary font-medium flex items-center gap-1"
            >
              Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoMonthlyStats}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.25 280)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.65 0.25 280)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'oklch(0.65 0.02 280)', fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(0.12 0.025 280)',
                    border: '1px solid oklch(0.22 0.04 280)',
                    borderRadius: '12px',
                    color: 'oklch(0.98 0 0)',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Profit']}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="oklch(0.65 0.25 280)"
                  strokeWidth={2}
                  fill="url(#profitGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
            <button 
              onClick={() => onNavigate('transactions')}
              className="text-sm text-primary font-medium flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {recentTransactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="glass rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'income' ? 'bg-success/20' : 'bg-destructive/20'
                  }`}>
                    {tx.type === 'income' ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{tx.category}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${
                  tx.type === 'income' ? 'text-success' : 'text-destructive'
                }`}>
                  {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3 pb-4"
        >
          <button
            onClick={() => onNavigate('ai-coach')}
            className="glass rounded-2xl p-4 text-left group hover:bg-primary/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3">
              <span className="text-lg">🤖</span>
            </div>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              AI Coach
            </p>
            <p className="text-xs text-muted-foreground">Get insights</p>
          </button>
          
          <button
            onClick={() => onNavigate('insights')}
            className="glass rounded-2xl p-4 text-left group hover:bg-primary/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
              <span className="text-lg">📊</span>
            </div>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Analytics
            </p>
            <p className="text-xs text-muted-foreground">View reports</p>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
