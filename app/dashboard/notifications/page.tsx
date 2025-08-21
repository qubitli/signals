import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Bell, 
  Mail, 
  Smartphone, 
  TrendingUp, 
  DollarSign,
  Clock,
  Settings
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Notificaciones | Dashboard | Signals',
  description: 'Configura tus preferencias de notificaciones y alertas',
}

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      {/* Notification Settings Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configuración de Notificaciones
          </CardTitle>
          <CardDescription>
            Personaliza cómo y cuándo quieres recibir notificaciones sobre señales y actualizaciones
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Signal Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Notificaciones de Señales
          </CardTitle>
          <CardDescription>
            Configuración para alertas de señales de trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* New Signals */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Nuevas señales</Label>
                <div className="text-sm text-muted-foreground">
                  Recibe notificaciones cuando se publiquen nuevas señales
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Signal Updates */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Actualizaciones de señales</Label>
                <div className="text-sm text-muted-foreground">
                  Notificaciones cuando las señales alcancen objetivos o stop loss
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* High Confidence Signals */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Señales de alta confianza</Label>
                <div className="text-sm text-muted-foreground">
                  Solo señales con confianza superior al 80%
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Price Alerts */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alertas de precios</Label>
                <div className="text-sm text-muted-foreground">
                  Notificaciones cuando los precios alcancen niveles específicos
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Notificaciones de Cuenta
          </CardTitle>
          <CardDescription>
            Alertas relacionadas con tu suscripción y facturación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Billing Alerts */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alertas de facturación</Label>
                <div className="text-sm text-muted-foreground">
                  Notificaciones sobre pagos, facturas y renovaciones
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Subscription Changes */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Cambios de suscripción</Label>
                <div className="text-sm text-muted-foreground">
                  Confirmaciones de cambios en tu plan o suscripción
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Security Alerts */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alertas de seguridad</Label>
                <div className="text-sm text-muted-foreground">
                  Notificaciones sobre inicios de sesión y cambios de seguridad
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing & Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Marketing y Actualizaciones
          </CardTitle>
          <CardDescription>
            Comunicaciones sobre nuevas funciones y noticias del mercado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Product Updates */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Actualizaciones del producto</Label>
                <div className="text-sm text-muted-foreground">
                  Noticias sobre nuevas funciones y mejoras
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Market News */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Noticias del mercado</Label>
                <div className="text-sm text-muted-foreground">
                  Análisis y noticias importantes del mercado crypto
                </div>
              </div>
              <Switch />
            </div>

            <Separator />

            {/* Educational Content */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Contenido educativo</Label>
                <div className="text-sm text-muted-foreground">
                  Tips de trading y análisis educativo
                </div>
              </div>
              <Switch />
            </div>

            <Separator />

            {/* Promotional Emails */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Emails promocionales</Label>
                <div className="text-sm text-muted-foreground">
                  Ofertas especiales y promociones
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Métodos de Entrega
          </CardTitle>
          <CardDescription>
            Cómo quieres recibir las notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-base">Email</Label>
                  <div className="text-sm text-muted-foreground">
                    john.doe@example.com
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-base">Notificaciones push</Label>
                  <div className="text-sm text-muted-foreground">
                    Notificaciones del navegador y móvil
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* SMS (Premium Feature) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-base">SMS</Label>
                  <div className="text-sm text-muted-foreground">
                    Mensajes de texto para alertas críticas
                  </div>
                </div>
              </div>
              <Switch />
            </div>
          </div>

          <div className="pt-4">
            <Button>Guardar preferencias</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horarios Silenciosos
          </CardTitle>
          <CardDescription>
            Configura cuando no quieres recibir notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Activar horarios silenciosos</Label>
              <div className="text-sm text-muted-foreground">
                Las notificaciones se silenciarán durante las horas especificadas
              </div>
            </div>
            <Switch />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="quiet-start">Inicio</Label>
              <select 
                id="quiet-start"
                className="w-full p-2 border rounded-md bg-background"
                disabled
              >
                <option>22:00</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quiet-end">Fin</Label>
              <select 
                id="quiet-end"
                className="w-full p-2 border rounded-md bg-background"
                disabled
              >
                <option>08:00</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
