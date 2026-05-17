'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  Calendar,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { 
  demoMonthlyStats, 
  demoCategoryBreakdown, 
  formatCurrency,
  demoTransactions,
  calculateSummary
} from '@/lib/demo-data'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts'

type TimeRange = '7d' | '30d' | '90d' | '1y'

const categoryLabels: Record<string, string> = {
  'freelance': 'Freelance',
  'side-hustle': 'Side Hustle',
  'investment': 'Investment',
  'subscription': 'Subscriptions',
  'transport': 'Transport',
  'food': 'Food & Dining',
  'utilities': 'Utilities',
  'entertainment': 'Entertainment',
  'shopping': 'Shopping',
  'health': 'Health',
  'other': 'Other',
}

const CHART_COLORS = [
  'oklch(0.65 0.25 280)',
  'oklch(0.6 0.2 300)',
  'oklch(0.55 0.18 320)',
  'oklch(0.65 0.15 200)',
  'oklch(0.7 0.12 180)',
]

export function InsightsScreen() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')
  const [activeTab, setActiveTab] = useState<'income' | 'expenses'>('income')
  
  const summary = calculateSummary(demoTransactions)
  
  // Income breakdown data
  const incomeBreakdown = demoCategoryBreakdown.filter(c => 
    ['freelance', 'side-hustle', 'investment'].includes(c.category)
  )
  
  // Expense breakdown data
  const expenseBreakdown = demoCategoryBreakdown.filter(c => 
    !['freelance', 'side-hustle', 'investment'].includes(c.category)
  ).map(c => ({ ...c, amount: Math.abs(c.amount) }))
  
  const currentBreakdown = activeTab === 'income' ? incomeBreakdown : expenseBreakdown
  
  // Pie chart data
  const pieData = currentBreakdown.map((item, index) => ({
    name: categoryLabels[item.category],
    value: Math.abs(item.amount),
    color: CHART_COLORS[index % CHART_COLORS.length],
  }))
  
  // Calculate changes
  const lastMonth = demoMonthlyStats[demoMonthlyStats.length - 2]
  const currentMonth = demoMonthlyStats[demoMonthlyStats.length - 1]
  const incomeChange = ((currentMonth.income - lastMonth.income) / lastMonth.income * 100).toFixed(1)
  const expenseChange = ((currentMonth.expenses - lastMonth.expenses) / lastMonth.expenses * 100).toFixed(1)
  const profitChange = ((currentMonth.profit - lastMonth.profit) / lastMonth.profit * 100).toFixed(1)
  
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground mb-4">Insights & Analytics</h1>
          
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'gradient-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      <div className="px-4 space-y-6 pt-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-3"
          >
            <p className="text-[10px] text-muted-foreground mb-1">Income</p>
            <p className="text-sm font-bold text-foreground">{formatCurrency(summary.income)}</p>
            <div className={`flex items-center gap-1 mt-1 ${Number(incomeChange) >= 0 ? 'text-success' : 'text-destructive'}`}>
              {Number(incomeChange) >= 0 ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span className="text-[10px] font-medium">{incomeChange}%</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass rounded-xl p-3"
          >
            <p className="text-[10px] text-muted-foreground mb-1">Expenses</p>
            <p className="text-sm font-bold text-foreground">{formatCurrency(summary.expenses)}</p>
            <div className={`flex items-center gap-1 mt-1 ${Number(expenseChange) <= 0 ? 'text-success' : 'text-destructive'}`}>
              {Number(expenseChange) <= 0 ? (
                <ArrowDownRight className="w-3 h-3" />
              ) : (
                <ArrowUpRight className="w-3 h-3" />
              )}
              <span className="text-[10px] font-medium">{expenseChange}%</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-3"
          >
            <p className="text-[10px] text-muted-foreground mb-1">Profit</p>
            <p className="text-sm font-bold text-foreground">{formatCurrency(summary.profit)}</p>
            <div className={`flex items-center gap-1 mt-1 ${Number(profitChange) >= 0 ? 'text-success' : 'text-destructive'}`}>
              {Number(profitChange) >= 0 ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span className="text-[10px] font-medium">{profitChange}%</span>
            </div>
          </motion.div>
        </div>
        
        {/* Income vs Expenses Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Income vs Expenses</h3>
              <p className="text-xs text-muted-foreground">Monthly comparison</p>
            </div>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demoMonthlyStats}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'oklch(0.65 0.02 280)', fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(0.12 0.025 280)',
                    border: '1px solid oklch(0.22 0.04 280)',
                    borderRadius: '12px',
                    color: 'oklch(0.98 0 0)',
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => [
                    formatCurrency(value), 
                    name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                />
                <Bar 
                  dataKey="income" 
                  fill="oklch(0.65 0.2 150)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="oklch(0.55 0.22 25)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-success" />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-destructive" />
              <span className="text-xs text-muted-foreground">Expenses</span>
            </div>
          </div>
        </motion.div>
        
        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Category Breakdown</h3>
              <p className="text-xs text-muted-foreground">Where your money goes</p>
            </div>
            <PieChart className="w-4 h-4 text-muted-foreground" />
          </div>
          
          {/* Tab Switch */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('income')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'income'
                  ? 'bg-success/20 text-success'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              Income Sources
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'expenses'
                  ? 'bg-destructive/20 text-destructive'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              Expense Categories
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Pie Chart */}
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="flex-1 space-y-2">
              {currentBreakdown.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {categoryLabels[item.category]}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {formatCurrency(Math.abs(item.amount))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Profit Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Profit Trend</h3>
              <p className="text-xs text-muted-foreground">Net earnings over time</p>
            </div>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoMonthlyStats}>
                <defs>
                  <linearGradient id="profitGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.25 280)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.65 0.25 280)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'oklch(0.65 0.02 280)', fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(0.12 0.025 280)',
                    border: '1px solid oklch(0.22 0.04 280)',
                    borderRadius: '12px',
                    color: 'oklch(0.98 0 0)',
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Profit']}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="oklch(0.65 0.25 280)"
                  strokeWidth={2}
                  fill="url(#profitGradient2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Avg. Monthly Income</p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(demoMonthlyStats.reduce((sum, m) => sum + m.income, 0) / demoMonthlyStats.length)}
            </p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Savings Rate</p>
            <p className="text-lg font-bold text-success">
              {((summary.profit / summary.income) * 100).toFixed(1)}%
            </p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Income Streams</p>
            <p className="text-lg font-bold text-foreground">4</p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Best Month</p>
            <p className="text-lg font-bold text-primary">Dec</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
