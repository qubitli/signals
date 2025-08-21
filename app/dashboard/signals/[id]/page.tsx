import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft,
  Target,
  Shield,
  Clock,
  Brain,
  Activity,
  Copy,
  Bell,
  Star,
  AlertTriangle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Detalle de Señal | Dashboard | Signals',
  description: 'Análisis detallado de la señal de trading',
}

interface SignalDetailPageProps {
  params: {
    id: string
  }
}

// Mock data - En producción vendría de una API
const mockSignal = {
  id: 1,
  pair: 'BTC/USDT',
  action: 'BUY',
  confidence: 85,
  entryPrice: 43250,
  targetPrice: 45000,
  stopLoss: 41500,
  timeframe: '4h',
  status: 'ACTIVE',
  created: '2024-08-21T14:30:00Z',
  pnl: '+2.5%',
  analysis: 'Ruptura alcista confirmada con volumen alto. El precio ha superado la resistencia clave en $43,000 con un volumen significativamente mayor al promedio. Los indicadores técnicos muestran momentum positivo.',
  aiReasoning: 'RSI oversold + MACD bullish cross + support level hold + volume breakout',
  riskReward: 2.3,
  currentPrice: 43995,
  progress: 42.8, // Porcentaje hacia el objetivo
  technicalIndicators: {
    rsi: 68,
    macd: 'bullish',
    ma20: 42800,
    ma50: 41900,
    volume: '+45%'
  },
  priceHistory: [
    { timestamp: '14:30', price: 43250 },
    { timestamp: '15:00', price: 43180 },
    { timestamp: '15:30', price: 43420 },
    { timestamp: '16:00', price: 43650 },
    { timestamp: '16:30', price: 43995 }
  ]
}

export default function SignalDetailPage({ params }: SignalDetailPageProps) {
  // En producción, aquí harías fetch de la señal por ID usando params.id
  const signal = mockSignal
  
  if (!signal) {
    notFound()
  }

  const progressToTarget = ((signal.currentPrice - signal.entryPrice) / (signal.targetPrice - signal.entryPrice)) * 100
  const isProfit = signal.currentPrice > signal.entryPrice

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/signals">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a señales
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {signal.pair} - {signal.action}
          </h1>
          <p className="text-muted-foreground">
            Señal generada el {new Date(signal.created).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Favorita
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerta
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copiar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Signal Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Estado Actual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {signal.action === 'BUY' ? (
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  ) : (
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    </div>
                  )}
                  <div>
                    <p className="text-2xl font-bold">${signal.currentPrice.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Precio actual</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {signal.pnl}
                  </p>
                  <Badge 
                    variant={signal.status === 'ACTIVE' ? 'default' : 'secondary'}
                    className="mt-1"
                  >
                    {signal.status === 'ACTIVE' ? 'Activa' : 'Cerrada'}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso al objetivo</span>
                  <span>{progressToTarget.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      progressToTarget > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(Math.abs(progressToTarget), 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Señal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Entrada</p>
                  <p className="text-lg font-semibold">${signal.entryPrice.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Objetivo</p>
                  <p className="text-lg font-semibold text-green-600">${signal.targetPrice.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Stop Loss</p>
                  <p className="text-lg font-semibold text-red-600">${signal.stopLoss.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">R:R</p>
                  <p className="text-lg font-semibold">1:{signal.riskReward}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Marco temporal</p>
                  <Badge variant="outline">{signal.timeframe}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Confianza</p>
                  <Badge variant={signal.confidence >= 80 ? "default" : "secondary"}>
                    {signal.confidence}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Análisis de IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Análisis técnico</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {signal.analysis}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Factores clave detectados</h4>
                <div className="flex flex-wrap gap-2">
                  {signal.aiReasoning.split(' + ').map((factor, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price History Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Evolución del Precio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de precios (próximamente)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technical Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Indicadores Técnicos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">RSI (14)</span>
                <Badge variant={signal.technicalIndicators.rsi > 70 ? "destructive" : signal.technicalIndicators.rsi < 30 ? "default" : "secondary"}>
                  {signal.technicalIndicators.rsi}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MACD</span>
                <Badge variant={signal.technicalIndicators.macd === 'bullish' ? "default" : "destructive"}>
                  {signal.technicalIndicators.macd}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MA 20</span>
                <span className="text-sm font-medium">${signal.technicalIndicators.ma20.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MA 50</span>
                <span className="text-sm font-medium">${signal.technicalIndicators.ma50.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Volumen</span>
                <Badge variant="default">{signal.technicalIndicators.volume}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Risk Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Gestión de Riesgo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Distancia al Stop</span>
                  <span className="text-sm font-medium text-red-600">
                    {(((signal.currentPrice - signal.stopLoss) / signal.currentPrice) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Distancia al Target</span>
                  <span className="text-sm font-medium text-green-600">
                    {(((signal.targetPrice - signal.currentPrice) / signal.currentPrice) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Riesgo/Recompensa</span>
                  <span className="text-sm font-medium">1:{signal.riskReward}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Modificar objetivo
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Ajustar stop loss
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                Renovar señal
              </Button>
              <Separator />
              <Button variant="destructive" size="sm" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Cerrar señal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
