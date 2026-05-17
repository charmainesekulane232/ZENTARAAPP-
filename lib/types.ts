export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: TransactionCategory
  date: string
  merchant?: string
  accountId?: string
}

export type TransactionCategory = 
  | 'freelance'
  | 'side-hustle'
  | 'investment'
  | 'subscription'
  | 'transport'
  | 'food'
  | 'utilities'
  | 'entertainment'
  | 'shopping'
  | 'health'
  | 'other'

export interface Account {
  id: string
  name: string
  balance: number
  currency: string
  type: 'checking' | 'savings' | 'business'
}

export interface AIInsight {
  id: string
  type: 'opportunity' | 'warning' | 'tip' | 'pattern'
  title: string
  description: string
  impact?: string
  priority: 'high' | 'medium' | 'low'
  category?: string
  actionable?: boolean
}

export interface MonthlyStats {
  month: string
  income: number
  expenses: number
  profit: number
}

export interface CategoryBreakdown {
  category: TransactionCategory
  amount: number
  percentage: number
  count: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'free' | 'premium' | 'business'
  joinedDate: string
}
