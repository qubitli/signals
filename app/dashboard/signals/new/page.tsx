import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Plus, Settings, Bell, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nueva Señal | Dashboard | Signals',
  description: 'Crear una nueva señal de trading personalizada',
}

export default function NewSignalPage() {
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nueva Señal</h1>
          <p className="text-muted-foreground">
            Crea una señal personalizada o configura alertas de precios
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Signal Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Configuración de Señal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pair">Par de trading</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTCUSDT">BTC/USDT</SelectItem>
                    <SelectItem value="ETHUSDT">ETH/USDT</SelectItem>
                    <SelectItem value="ADAUSDT">ADA/USDT</SelectItem>
                    <SelectItem value="SOLUSDT">SOL/USDT</SelectItem>
                    <SelectItem value="MATICUSDT">MATIC/USDT</SelectItem>
                    <SelectItem value="DOTUSDT">DOT/USDT</SelectItem>
                    <SelectItem value="LINKUSDT">LINK/USDT</SelectItem>
                    <SelectItem value="AVAXUSDT">AVAX/USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="action">Acción</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="BUY o SELL" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUY">BUY (Comprar)</SelectItem>
                    <SelectItem value="SELL">SELL (Vender)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeframe">Marco temporal</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5m">5 minutos</SelectItem>
                    <SelectItem value="15m">15 minutos</SelectItem>
                    <SelectItem value="1h">1 hora</SelectItem>
                    <SelectItem value="4h">4 horas</SelectItem>
                    <SelectItem value="1d">1 día</SelectItem>
                    <SelectItem value="1w">1 semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence">Confianza (%)</Label>
                <Input 
                  id="confidence" 
                  type="number" 
                  placeholder="85" 
                  min="1" 
                  max="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry">Precio de entrada</Label>
                <Input 
                  id="entry" 
                  type="number" 
                  placeholder="43250" 
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Precio objetivo</Label>
                <Input 
                  id="target" 
                  type="number" 
                  placeholder="45000" 
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stop">Stop Loss</Label>
                <Input 
                  id="stop" 
                  type="number" 
                  placeholder="41500" 
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="analysis">Análisis técnico</Label>
              <Textarea 
                id="analysis" 
                placeholder="Describe el análisis técnico que respalda esta señal..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasoning">Factores clave de IA</Label>
              <Input 
                id="reasoning" 
                placeholder="RSI oversold + MACD bullish + support hold"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configuración de Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificación push</Label>
                  <div className="text-sm text-muted-foreground">
                    Recibir notificación cuando se active la señal
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email</Label>
                  <div className="text-sm text-muted-foreground">
                    Enviar por email cuando se ejecute
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS (Premium)</Label>
                  <div className="text-sm text-muted-foreground">
                    Alerta por SMS para señales críticas
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-renovar</Label>
                  <div className="text-sm text-muted-foreground">
                    Renovar automáticamente si no se ejecuta
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración Avanzada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Vencimiento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar vencimiento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hora</SelectItem>
                    <SelectItem value="6h">6 horas</SelectItem>
                    <SelectItem value="24h">24 horas</SelectItem>
                    <SelectItem value="3d">3 días</SelectItem>
                    <SelectItem value="1w">1 semana</SelectItem>
                    <SelectItem value="never">Sin vencimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="critical">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Pública</Label>
                  <div className="text-sm text-muted-foreground">
                    Compartir con la comunidad
                  </div>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Etiquetas</Label>
                <Input 
                  id="tags" 
                  placeholder="scalping, breakout, resistance"
                />
              </div>
            </CardContent>
          </Card>

          {/* Risk Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Riesgo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Riesgo/Recompensa</span>
                <span className="font-semibold">1:2.3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Distancia al stop</span>
                <span className="font-semibold text-red-600">4.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Potencial ganancia</span>
                <span className="font-semibold text-green-600">9.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Capital sugerido</span>
                <span className="font-semibold">2-5%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-6">
        <Button size="lg" className="flex-1 md:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          Crear Señal
        </Button>
        <Button variant="outline" size="lg">
          Guardar como borrador
        </Button>
        <Button variant="outline" size="lg">
          Vista previa
        </Button>
      </div>
    </div>
  )
}
