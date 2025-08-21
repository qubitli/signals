import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Shield, Settings, Crown, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mi Cuenta | Dashboard | Signals',
  description: 'Gestiona tu perfil, suscripción y configuración de cuenta',
}

export default function AccountPage() {
  return (
    <div className="space-y-8">
      {/* Account Sections */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil
            </CardTitle>
            <CardDescription>
              Información personal y configuración del perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-muted-foreground">john@signals.ai</p>
                <Badge variant="secondary" className="mt-1">Verificado</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Editar Perfil
            </Button>
          </CardContent>
        </Card>

        {/* Subscription Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Suscripción
            </CardTitle>
            <CardDescription>
              Tu plan actual y facturación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Plan Pro</h3>
                <p className="text-sm text-muted-foreground">$29.99/mes</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Activo</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Renovación: 21 de septiembre, 2025
            </div>
            <Button variant="outline" className="w-full">
              Gestionar Suscripción
            </Button>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Seguridad
            </CardTitle>
            <CardDescription>
              Configuración de seguridad y autenticación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Contraseña</span>
                <Button variant="ghost" size="sm">Cambiar</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Autenticación 2FA</span>
                <Badge variant="outline">Configurar</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sesiones activas</span>
                <Button variant="ghost" size="sm">Ver</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Preferencias
            </CardTitle>
            <CardDescription>
              Configuración de notificaciones y preferencias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Notificaciones por email</span>
                <Badge variant="secondary">Activado</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Alertas de señales</span>
                <Badge variant="secondary">Activado</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Modo oscuro</span>
                <Badge variant="outline">Auto</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Configurar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
