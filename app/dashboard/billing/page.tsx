import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  Download, 
  Crown, 
  Calendar, 
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Facturación | Dashboard | Signals',
  description: 'Gestiona tu suscripción, métodos de pago e historial de facturación',
}

const invoices = [
  {
    id: 'INV-001',
    date: '2025-07-21',
    amount: 29.99,
    status: 'paid',
    description: 'Plan Pro - Agosto 2025'
  },
  {
    id: 'INV-002', 
    date: '2025-06-21',
    amount: 29.99,
    status: 'paid',
    description: 'Plan Pro - Julio 2025'
  },
  {
    id: 'INV-003',
    date: '2025-05-21', 
    amount: 29.99,
    status: 'paid',
    description: 'Plan Pro - Junio 2025'
  }
]

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Suscripción Actual
          </CardTitle>
          <CardDescription>
            Detalles de tu plan actual y próxima facturación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Plan Pro</h3>
              <p className="text-sm text-muted-foreground">
                Señales premium, análisis avanzados, alertas ilimitadas
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Próxima facturación: 21 de septiembre, 2025
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$29.99</div>
              <div className="text-sm text-muted-foreground">por mes</div>
              <Badge className="bg-green-100 text-green-800 mt-2">
                <CheckCircle className="h-3 w-3 mr-1" />
                Activo
              </Badge>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              Cambiar plan
            </Button>
            <Button variant="outline">
              Cancelar suscripción
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Método de Pago
          </CardTitle>
          <CardDescription>
            Gestiona tus métodos de pago y facturación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded text-white flex items-center justify-center text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expira 12/27</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">Principal</Badge>
              <Button variant="ghost" size="sm">
                Editar
              </Button>
            </div>
          </div>

          <Button variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Agregar método de pago
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Historial de Facturación
          </CardTitle>
          <CardDescription>
            Todas tus facturas y recibos de pago
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount}</p>
                    <Badge 
                      variant={invoice.status === 'paid' ? 'secondary' : 'outline'}
                      className={invoice.status === 'paid' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {invoice.status === 'paid' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Pagado
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          Pendiente
                        </>
                      )}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Dirección de Facturación
          </CardTitle>
          <CardDescription>
            Información para la facturación y recibos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg space-y-2">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">123 Trading Street</p>
            <p className="text-sm text-muted-foreground">New York, NY 10001</p>
            <p className="text-sm text-muted-foreground">Estados Unidos</p>
          </div>
          
          <Button variant="outline">
            Actualizar dirección
          </Button>
        </CardContent>
      </Card>

      {/* Usage & Limits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Uso y Límites
          </CardTitle>
          <CardDescription>
            Tu uso actual y límites del plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Señales activas</span>
              <span className="text-sm font-medium">8 / ∞</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Alertas este mes</span>
              <span className="text-sm font-medium">245 / ∞</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">API calls</span>
              <span className="text-sm font-medium">15,420 / 100,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
