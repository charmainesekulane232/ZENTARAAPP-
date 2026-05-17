'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Calendar
} from 'lucide-react'
import { demoTransactions, formatCurrency } from '@/lib/demo-data'
import type { TransactionCategory } from '@/lib/types'

const categoryLabels: Record<TransactionCategory, string> = {
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

const categoryIcons: Record<TransactionCategory, string> = {
  'freelance': '💼',
  'side-hustle': '🚀',
  'investment': '📈',
  'subscription': '📱',
  'transport': '🚗',
  'food': '🍽️',
  'utilities': '💡',
  'entertainment': '🎬',
  'shopping': '🛍️',
  'health': '🏥',
  'other': '📋',
}

type FilterType = 'all' | 'income' | 'expense'

export function TransactionsScreen() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | 'all'>('all')
  
  const filteredTransactions = demoTransactions.filter(tx => {
    const matchesType = filter === 'all' || tx.type === filter
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.merchant?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tx.category === selectedCategory
    return matchesType && matchesSearch && matchesCategory
  })
  
  const incomeTotal = demoTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const expenseTotal = demoTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, tx) => {
    const date = new Date(tx.date).toLocaleDateString('en-ZA', { 
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(tx)
    return groups
  }, {} as Record<string, typeof demoTransactions>)
  
  const categories = ['all', ...Object.keys(categoryLabels)] as const
  
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground mb-4">Transactions</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                showFilters ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(['all', 'income', 'expense'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                  filter === type
                    ? 'gradient-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {type === 'all' ? 'All' : type === 'income' ? 'Income' : 'Expenses'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Category Filter (Expandable) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground font-medium">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? 'gradient-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {cat === 'all' ? 'All' : categoryLabels[cat as TransactionCategory]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <div className="px-4 pt-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Total Income</span>
            </div>
            <p className="text-lg font-bold text-success">{formatCurrency(incomeTotal)}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Total Expenses</span>
            </div>
            <p className="text-lg font-bold text-destructive">{formatCurrency(expenseTotal)}</p>
          </motion.div>
        </div>
        
        {/* Transaction List */}
        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, transactions], groupIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
              </div>
              
              <div className="space-y-2">
                {transactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIndex * 0.05) + (index * 0.02) }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        tx.type === 'income' ? 'bg-success/20' : 'bg-secondary'
                      }`}>
                        {categoryIcons[tx.category]}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {tx.description}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">
                            {categoryLabels[tx.category]}
                          </span>
                          {tx.merchant && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground truncate">
                                {tx.merchant}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-sm font-bold ${
                          tx.type === 'income' ? 'text-success' : 'text-foreground'
                        }`}>
                          {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredTransactions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No transactions found</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
