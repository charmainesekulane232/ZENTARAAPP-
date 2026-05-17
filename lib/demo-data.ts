import { Transaction, Account, AIInsight, MonthlyStats, CategoryBreakdown, User } from './types'

export const demoUser: User = {
  id: 'user_001',
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  plan: 'premium',
  joinedDate: '2024-01-15',
}

export const demoAccounts: Account[] = [
  {
    id: 'acc_001',
    name: 'Main Business',
    balance: 45720.50,
    currency: 'ZAR',
    type: 'business',
  },
  {
    id: 'acc_002',
    name: 'Savings',
    balance: 28350.00,
    currency: 'ZAR',
    type: 'savings',
  },
]

export const demoTransactions: Transaction[] = [
  {
    id: 'tx_001',
    description: 'Upwork Payment - Web Development',
    amount: 15500.00,
    type: 'income',
    category: 'freelance',
    date: '2024-12-15',
    merchant: 'Upwork Inc',
    accountId: 'acc_001',
  },
  {
    id: 'tx_002',
    description: 'Fiverr Gig - Logo Design',
    amount: 3200.00,
    type: 'income',
    category: 'side-hustle',
    date: '2024-12-14',
    merchant: 'Fiverr',
    accountId: 'acc_001',
  },
  {
    id: 'tx_003',
    description: 'YouTube AdSense',
    amount: 8750.00,
    type: 'income',
    category: 'side-hustle',
    date: '2024-12-13',
    merchant: 'Google',
    accountId: 'acc_001',
  },
  {
    id: 'tx_004',
    description: 'Consulting - TechCorp',
    amount: 22000.00,
    type: 'income',
    category: 'freelance',
    date: '2024-12-12',
    merchant: 'TechCorp SA',
    accountId: 'acc_001',
  },
  {
    id: 'tx_005',
    description: 'Spotify Premium',
    amount: -179.99,
    type: 'expense',
    category: 'subscription',
    date: '2024-12-11',
    merchant: 'Spotify',
    accountId: 'acc_001',
  },
  {
    id: 'tx_006',
    description: 'Uber Ride',
    amount: -245.00,
    type: 'expense',
    category: 'transport',
    date: '2024-12-11',
    merchant: 'Uber',
    accountId: 'acc_001',
  },
  {
    id: 'tx_007',
    description: 'Woolworths Groceries',
    amount: -1850.50,
    type: 'expense',
    category: 'food',
    date: '2024-12-10',
    merchant: 'Woolworths',
    accountId: 'acc_001',
  },
  {
    id: 'tx_008',
    description: 'Adobe Creative Cloud',
    amount: -899.00,
    type: 'expense',
    category: 'subscription',
    date: '2024-12-09',
    merchant: 'Adobe',
    accountId: 'acc_001',
  },
  {
    id: 'tx_009',
    description: 'Client Payment - E-commerce Site',
    amount: 35000.00,
    type: 'income',
    category: 'freelance',
    date: '2024-12-08',
    merchant: 'RetailMax',
    accountId: 'acc_001',
  },
  {
    id: 'tx_010',
    description: 'Takealot Purchase',
    amount: -1299.00,
    type: 'expense',
    category: 'shopping',
    date: '2024-12-07',
    merchant: 'Takealot',
    accountId: 'acc_001',
  },
  {
    id: 'tx_011',
    description: 'Course Sales - Gumroad',
    amount: 4500.00,
    type: 'income',
    category: 'side-hustle',
    date: '2024-12-06',
    merchant: 'Gumroad',
    accountId: 'acc_001',
  },
  {
    id: 'tx_012',
    description: 'Petrol - Engen',
    amount: -950.00,
    type: 'expense',
    category: 'transport',
    date: '2024-12-05',
    merchant: 'Engen',
    accountId: 'acc_001',
  },
  {
    id: 'tx_013',
    description: 'Discovery Health',
    amount: -2450.00,
    type: 'expense',
    category: 'health',
    date: '2024-12-04',
    merchant: 'Discovery',
    accountId: 'acc_001',
  },
  {
    id: 'tx_014',
    description: 'Affiliate Commission',
    amount: 6200.00,
    type: 'income',
    category: 'side-hustle',
    date: '2024-12-03',
    merchant: 'Amazon Associates',
    accountId: 'acc_001',
  },
  {
    id: 'tx_015',
    description: 'Nando\'s',
    amount: -385.00,
    type: 'expense',
    category: 'food',
    date: '2024-12-02',
    merchant: 'Nando\'s',
    accountId: 'acc_001',
  },
]

export const demoMonthlyStats: MonthlyStats[] = [
  { month: 'Jul', income: 68500, expenses: 12400, profit: 56100 },
  { month: 'Aug', income: 72300, expenses: 14200, profit: 58100 },
  { month: 'Sep', income: 65800, expenses: 11800, profit: 54000 },
  { month: 'Oct', income: 89200, expenses: 15600, profit: 73600 },
  { month: 'Nov', income: 95400, expenses: 13900, profit: 81500 },
  { month: 'Dec', income: 105150, expenses: 8258, profit: 96892 },
]

export const demoAIInsights: AIInsight[] = [
  {
    id: 'insight_001',
    type: 'opportunity',
    title: 'Freelance rate increase potential',
    description: 'Your web development projects have a 100% client satisfaction rate. Consider raising your hourly rate by 15-20% for new clients.',
    impact: '+R3,200/month potential',
    priority: 'high',
    category: 'pricing',
    actionable: true,
  },
  {
    id: 'insight_002',
    type: 'pattern',
    title: 'Income spike pattern detected',
    description: 'Your highest earning months (Oct-Dec) coincide with e-commerce project demand. Consider marketing to retail clients Q3 next year.',
    priority: 'medium',
    category: 'seasonality',
    actionable: true,
  },
  {
    id: 'insight_003',
    type: 'tip',
    title: 'Subscription optimization',
    description: 'You have 3 overlapping design tool subscriptions. Consolidating to Figma could save R650/month.',
    impact: '-R650/month savings',
    priority: 'medium',
    category: 'expenses',
    actionable: true,
  },
  {
    id: 'insight_004',
    type: 'opportunity',
    title: 'Side hustle growth opportunity',
    description: 'Your YouTube channel revenue grew 45% this quarter. Increasing posting frequency could accelerate growth significantly.',
    impact: '+R4,500/month potential',
    priority: 'high',
    category: 'content',
    actionable: true,
  },
  {
    id: 'insight_005',
    type: 'warning',
    title: 'Tax planning reminder',
    description: 'Based on your income trajectory, consider setting aside R15,000 for provisional tax payment due in February.',
    priority: 'high',
    category: 'tax',
    actionable: true,
  },
  {
    id: 'insight_006',
    type: 'tip',
    title: 'Passive income diversification',
    description: 'Your course sales provide consistent passive income. Creating a second course could double this revenue stream.',
    impact: '+R4,500/month potential',
    priority: 'medium',
    category: 'products',
    actionable: true,
  },
]

export const demoCategoryBreakdown: CategoryBreakdown[] = [
  { category: 'freelance', amount: 72500, percentage: 68.9, count: 3 },
  { category: 'side-hustle', amount: 22650, percentage: 21.5, count: 4 },
  { category: 'subscription', amount: -1078.99, percentage: 13.1, count: 2 },
  { category: 'transport', amount: -1195, percentage: 14.5, count: 2 },
  { category: 'food', amount: -2235.50, percentage: 27.1, count: 2 },
  { category: 'shopping', amount: -1299, percentage: 15.7, count: 1 },
  { category: 'health', amount: -2450, percentage: 29.6, count: 1 },
]

export function formatCurrency(amount: number, currency: string = 'ZAR'): string {
  const formatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return formatter.format(amount)
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
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
  return icons[category] || '📋'
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'freelance': 'bg-chart-1',
    'side-hustle': 'bg-chart-2',
    'investment': 'bg-chart-3',
    'subscription': 'bg-chart-4',
    'transport': 'bg-chart-5',
    'food': 'bg-destructive',
    'utilities': 'bg-muted',
    'entertainment': 'bg-accent',
    'shopping': 'bg-primary',
    'health': 'bg-success',
    'other': 'bg-secondary',
  }
  return colors[category] || 'bg-muted'
}

export function getInsightIcon(type: AIInsight['type']): string {
  const icons: Record<string, string> = {
    'opportunity': '💡',
    'warning': '⚠️',
    'tip': '✨',
    'pattern': '📊',
  }
  return icons[type] || '💡'
}

// Calculate summary stats
export function calculateSummary(transactions: Transaction[]) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
  const profit = income - expenses
  
  return { income, expenses, profit }
}
