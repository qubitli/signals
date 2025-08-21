"use client"

import { Signal } from "@/types"
import { cn, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Clock, Target, Shield } from "lucide-react"

interface SignalCardProps {
  signal: Signal
  className?: string
}

export function SignalCard({ signal, className }: SignalCardProps) {
  const isSignalBuy = signal.action === 'BUY'
  const confidenceColor = signal.confidence >= 80 ? 'text-green-500' : 
                         signal.confidence >= 60 ? 'text-yellow-500' : 'text-red-500'

  return (
    <Card className={cn("w-full hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isSignalBuy ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
            <span className="font-semibold text-lg">{signal.pair}</span>
            <Badge 
              variant={isSignalBuy ? "default" : "destructive"}
              className="font-medium"
            >
              {signal.action}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {signal.timeframe}
            </Badge>
            <span className={cn("text-sm font-medium", confidenceColor)}>
              {signal.confidence}%
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Price Levels */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>Entry</span>
            </div>
            <div className="font-medium">${formatPrice(signal.entry_price)}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>Target</span>
            </div>
            <div className="font-medium text-green-600">${formatPrice(signal.target_price)}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Stop Loss</span>
            </div>
            <div className="font-medium text-red-600">${formatPrice(signal.stop_loss)}</div>
          </div>
        </div>

        {/* Analysis */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">AI Analysis</h4>
          <p className="text-sm text-card-foreground leading-relaxed">
            {signal.analysis}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Just now</span>
          </div>
          <Badge 
            variant={signal.status === 'ACTIVE' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {signal.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
