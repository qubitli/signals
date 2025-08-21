import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  CheckCircle, 
  Search,
  Filter,
  MoreHorizontal,
  Bell,
  Clock,
  AlertTriangle,
  Star,
  Eye,
  Copy
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'Señales | Dashboard | Signals',
  description: 'Gestiona y monitorea todas tus señales de trading activas',
}

const mockSignals = [
  {
    id: 1,
    pair: 'BTC/USDT',
    action: 'BUY',
    confidence: 85,
    entryPrice: 43250,
    targetPrice: 45000,
    stopLoss: 41500,
    timeframe: '4h',
    status: 'ACTIVE',
    created: '2h ago',
    pnl: '+2.5%',
    analysis: 'Ruptura alcista confirmada con volumen alto',
    aiReasoning: 'RSI oversold + MACD bullish cross + support level hold'
  },
  {
    id: 2,
    pair: 'ETH/USDT',
    action: 'SELL',
    confidence: 78,
    entryPrice: 2680,
    targetPrice: 2550,
    stopLoss: 2750,
    timeframe: '1h',
    status: 'TRIGGERED',
    created: '4h ago',
    pnl: '+4.8%',
    analysis: 'Resistencia alcanzada, momentum debilitándose',
    aiReasoning: 'Overbought conditions + bearish divergence detected'
  },
  {
    id: 3,
    pair: 'ADA/USDT',
    action: 'BUY',
    confidence: 92,
    entryPrice: 0.45,
    targetPrice: 0.52,
    stopLoss: 0.42,
    timeframe: '1d',
    status: 'STOPPED',
    created: '1d ago',
    pnl: '-3.2%',
    analysis: 'Fallo en soporte clave, tendencia bajista confirmada',
    aiReasoning: 'Support level broken + volume spike down'
  },
  {
    id: 4,
    pair: 'SOL/USDT',
    action: 'BUY',
    confidence: 88,
    entryPrice: 185.50,
    targetPrice: 195.00,
    stopLoss: 178.00,
    timeframe: '4h',
    status: 'ACTIVE',
    created: '1h ago',
    pnl: '+1.2%',
    analysis: 'Patrón de bandera alcista completado',
    aiReasoning: 'Flag pattern breakout + increasing volume'
  },
  {
    id: 5,
    pair: 'MATIC/USDT',
    action: 'SELL',
    confidence: 76,
    entryPrice: 0.92,
    targetPrice: 0.86,
    stopLoss: 0.95,
    timeframe: '2h',
    status: 'ACTIVE',
    created: '30m ago',
    pnl: '-0.5%',
    analysis: 'Triángulo descendente cerca de ruptura',
    aiReasoning: 'Descending triangle + weak momentum'
  }
]

export default function SignalsPage() {
  return (
    <div className="space-y-8">
      {/* Header with Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Señales de Trading</h1>
          <p className="text-muted-foreground">
            Gestiona y monitorea todas tus señales de trading con IA
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <a href="/dashboard/signals/new">
              Nueva Señal
            </a>
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por par..."
              className="pl-8 w-[200px] md:w-[300px]"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[120px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="active">Activas</SelectItem>
              <SelectItem value="triggered">Ejecutadas</SelectItem>
              <SelectItem value="stopped">Detenidas</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Marco" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="4h">4h</SelectItem>
              <SelectItem value="1d">1d</SelectItem>
              <SelectItem value="1w">1w</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Señales Activas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+3 desde ayer</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ejecutadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">esta semana</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% vs mes anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P&L Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$2,450</div>
            <p className="text-xs text-muted-foreground">+12.5% este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Signals Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas las Señales</TabsTrigger>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="triggered">Ejecutadas</TabsTrigger>
          <TabsTrigger value="watchlist">Favoritas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Señales</CardTitle>
              <CardDescription>
                Todas tus señales ordenadas por fecha de creación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSignals.map((signal) => (
                  <div key={signal.id} className="group relative">
                    <div className="flex items-center justify-between p-6 border rounded-lg hover:bg-muted/50 transition-all duration-200">
                      {/* Main Signal Info */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          {signal.action === 'BUY' ? (
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                          ) : (
                            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                              <TrendingDown className="h-5 w-5 text-red-600" />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-lg">{signal.pair}</p>
                              <Badge variant="outline" className="text-xs">
                                {signal.timeframe}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {signal.action} @ ${signal.entryPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {/* Signal Details */}
                        <div className="hidden md:block space-y-1">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">Target:</span>
                            <span className="font-medium">${signal.targetPrice.toLocaleString()}</span>
                            <span className="text-muted-foreground">Stop:</span>
                            <span className="font-medium">${signal.stopLoss.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Confianza:</span>
                            <Badge variant={signal.confidence >= 80 ? "default" : "secondary"}>
                              {signal.confidence}%
                            </Badge>
                          </div>
                        </div>

                        {/* AI Analysis Preview */}
                        <div className="hidden lg:block max-w-[200px]">
                          <p className="text-sm text-muted-foreground truncate">
                            {signal.analysis}
                          </p>
                          <p className="text-xs text-muted-foreground/70 truncate">
                            AI: {signal.aiReasoning}
                          </p>
                        </div>
                      </div>
                      
                      {/* Right Side - Status & Actions */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`font-bold text-lg ${signal.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {signal.pnl}
                          </p>
                          <p className="text-xs text-muted-foreground">{signal.created}</p>
                        </div>
                        
                        <Badge 
                          variant={
                            signal.status === 'ACTIVE' ? 'default' :
                            signal.status === 'TRIGGERED' ? 'secondary' :
                            'destructive'
                          }
                          className="min-w-[80px] justify-center"
                        >
                          {signal.status === 'ACTIVE' ? 'Activa' :
                           signal.status === 'TRIGGERED' ? 'Ejecutada' :
                           'Detenida'}
                        </Badge>

                        {/* Actions Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Copiar señal
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="h-4 w-4 mr-2" />
                              Agregar a favoritas
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bell className="h-4 w-4 mr-2" />
                              Configurar alerta
                            </DropdownMenuItem>
                            {signal.status === 'ACTIVE' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Cerrar señal
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Señales Activas</CardTitle>
              <CardDescription>
                Señales que están actualmente abiertas y monitoreándose
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSignals
                  .filter(signal => signal.status === 'ACTIVE')
                  .map((signal) => (
                    <div key={signal.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-950/10 border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                          <Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{signal.pair}</p>
                          <p className="text-sm text-muted-foreground">
                            {signal.action} @ ${signal.entryPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${signal.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {signal.pnl}
                        </p>
                        <p className="text-xs text-muted-foreground">{signal.created}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="triggered">
          <Card>
            <CardHeader>
              <CardTitle>Señales Ejecutadas</CardTitle>
              <CardDescription>
                Señales que han alcanzado su objetivo o stop loss
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSignals
                  .filter(signal => signal.status === 'TRIGGERED' || signal.status === 'STOPPED')
                  .map((signal) => (
                    <div key={signal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${signal.status === 'TRIGGERED' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                          {signal.status === 'TRIGGERED' ? (
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{signal.pair}</p>
                          <p className="text-sm text-muted-foreground">
                            {signal.action} @ ${signal.entryPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${signal.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {signal.pnl}
                        </p>
                        <Badge variant={signal.status === 'TRIGGERED' ? 'secondary' : 'destructive'}>
                          {signal.status === 'TRIGGERED' ? 'Objetivo alcanzado' : 'Stop Loss'}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card>
            <CardHeader>
              <CardTitle>Señales Favoritas</CardTitle>
              <CardDescription>
                Señales que has marcado para seguimiento especial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tienes señales favoritas</h3>
                <p className="text-muted-foreground">
                  Marca señales como favoritas para acceso rápido
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
