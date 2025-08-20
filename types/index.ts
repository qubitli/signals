// Core signal types for the crypto trading platform

export interface Signal {
  id: string
  pair: string // BTC/USDT, ETH/USDT, etc.
  action: 'BUY' | 'SELL'
  confidence: number // 0-100
  entry_price: number
  target_price: number
  stop_loss: number
  timeframe: '1h' | '4h' | '1d' | '1w'
  analysis: string
  ai_reasoning: string
  created_at: Date
  status: 'ACTIVE' | 'TRIGGERED' | 'STOPPED' | 'EXPIRED'
}

export interface SignalPerformance {
  signal_id: string
  outcome: 'WIN' | 'LOSS' | 'PENDING'
  profit_loss_percentage: number
  close_price?: number
  closed_at?: Date
}

export interface User {
  id: string
  email: string
  name: string
  subscription_tier: SubscriptionTier
  created_at: Date
  preferences: UserPreferences
}

export interface UserPreferences {
  pairs: string[] // Preferred trading pairs
  min_confidence: number // Minimum confidence threshold
  risk_tolerance: 'LOW' | 'MEDIUM' | 'HIGH'
  notifications_enabled: boolean
  timeframes: string[]
}

export interface Subscription {
  id: string
  user_id: string
  tier: SubscriptionTier
  status: 'ACTIVE' | 'CANCELED' | 'EXPIRED'
  current_period_start: Date
  current_period_end: Date
  stripe_subscription_id?: string
}

export type SubscriptionTier = 'FREE' | 'PRO' | 'PREMIUM' | 'ENTERPRISE'

export interface SubscriptionPlan {
  tier: SubscriptionTier
  name: string
  price_monthly: number
  price_yearly: number
  features: string[]
  signal_limit: number | null // null = unlimited
  real_time_alerts: boolean
  api_access: boolean
  backtest_access: boolean
}

// Market data types
export interface MarketData {
  symbol: string
  price: number
  volume_24h: number
  change_24h: number
  timestamp: Date
}

export interface NewsItem {
  id: string
  title: string
  content: string
  source: string
  sentiment_score: number // -1 to 1
  relevance_score: number // 0 to 1
  published_at: Date
  symbols_mentioned: string[]
}

export interface SocialSentiment {
  symbol: string
  platform: 'TWITTER' | 'REDDIT' | 'TELEGRAM'
  sentiment_score: number // -1 to 1
  volume: number // Number of mentions
  timestamp: Date
}
