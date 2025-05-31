
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  CreditCard, 
  AlertTriangle, 
  Plus,
  Calendar,
  Euro,
  Shield,
  MessageSquare
} from 'lucide-react';

const ClientDashboard: React.FC = () => {
  // Mock data - in real app this would come from API
  const stats = {
    activeContracts: 3,
    pendingPayments: 2,
    openClaims: 1,
    totalPremium: 1250
  };

  const recentActivity = [
    { id: 1, type: 'payment', description: 'Paiement assurance auto - 45€', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'contract', description: 'Nouveau contrat habitation activé', date: '2024-01-12', status: 'active' },
    { id: 3, type: 'claim', description: 'Sinistre auto en cours de traitement', date: '2024-01-10', status: 'pending' },
  ];

  const upcomingPayments = [
    { id: 1, type: 'Auto', amount: 45, dueDate: '2024-02-01' },
    { id: 2, type: 'Habitation', amount: 65, dueDate: '2024-02-05' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle demande
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrats actifs</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeContracts}</div>
            <p className="text-xs text-muted-foreground">Assurances en cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">À régler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sinistres ouverts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openClaims}</div>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prime totale</CardTitle>
            <Euro className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPremium}€</div>
            <p className="text-xs text-muted-foreground">Par mois</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'active' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  <Badge variant={
                    activity.status === 'completed' ? 'default' :
                    activity.status === 'active' ? 'secondary' : 'outline'
                  }>
                    {activity.status === 'completed' ? 'Terminé' :
                     activity.status === 'active' ? 'Actif' : 'En attente'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Prochains paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Assurance {payment.type}</p>
                      <p className="text-xs text-gray-500">Échéance: {payment.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{payment.amount}€</p>
                    <Button size="sm" variant="outline">
                      Payer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="p-6 h-auto flex flex-col space-y-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span>Nouvelle demande d'assurance</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex flex-col space-y-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <span>Déclarer un sinistre</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex flex-col space-y-2">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <span>Contacter un conseiller</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
