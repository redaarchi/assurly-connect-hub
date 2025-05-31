
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  CreditCard, 
  AlertTriangle, 
  Plus,
  Calendar,
  Euro,
  Shield,
  MessageSquare,
  Bell,
  RefreshCw,
  Download
} from 'lucide-react';

interface DashboardData {
  stats: {
    activeContracts: number;
    pendingPayments: number;
    openClaims: number;
    totalPremium: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
    status: string;
  }>;
  upcomingPayments: Array<{
    id: string;
    type: string;
    amount: number;
    dueDate: string;
    contractId: string;
  }>;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    date: string;
    read: boolean;
  }>;
}

const DynamicClientDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData: DashboardData = {
        stats: {
          activeContracts: 3,
          pendingPayments: 2,
          openClaims: 1,
          totalPremium: 1250
        },
        recentActivity: [
          {
            id: '1',
            type: 'payment',
            description: 'Paiement assurance auto - 45€',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
            status: 'completed'
          },
          {
            id: '2',
            type: 'contract',
            description: 'Nouveau contrat habitation activé',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
            status: 'active'
          },
          {
            id: '3',
            type: 'claim',
            description: 'Sinistre auto en cours de traitement',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
            status: 'pending'
          }
        ],
        upcomingPayments: [
          {
            id: '1',
            type: 'Auto',
            amount: 45,
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
            contractId: 'AUTO-001'
          },
          {
            id: '2',
            type: 'Habitation',
            amount: 65,
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
            contractId: 'HAB-001'
          }
        ],
        notifications: [
          {
            id: '1',
            title: 'Échéance proche',
            message: 'Votre paiement d\'assurance auto arrive à échéance dans 5 jours',
            type: 'warning',
            date: new Date().toLocaleDateString('fr-FR'),
            read: false
          },
          {
            id: '2',
            title: 'Contrat renouvelé',
            message: 'Votre contrat habitation a été automatiquement renouvelé',
            type: 'success',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
            read: true
          }
        ]
      };
      
      setDashboardData(mockData);
      setLastRefresh(new Date());
    } catch (error) {
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les données du tableau de bord",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
    toast({
      title: "Actualisation",
      description: "Données mises à jour",
    });
  };

  const handlePayment = (paymentId: string, amount: number) => {
    toast({
      title: "Redirection vers le paiement",
      description: `Paiement de ${amount}€ - Redirection vers la page sécurisée`,
    });
  };

  const markNotificationAsRead = (notificationId: string) => {
    if (dashboardData) {
      const updatedNotifications = dashboardData.notifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      setDashboardData({
        ...dashboardData,
        notifications: updatedNotifications
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <p className="text-gray-600">Erreur de chargement des données</p>
          <Button onClick={fetchDashboardData} className="mt-4">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  const unreadNotifications = dashboardData.notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">
            Dernière mise à jour : {lastRefresh.toLocaleTimeString('fr-FR')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle demande
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {unreadNotifications > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Bell className="h-5 w-5" />
              Notifications ({unreadNotifications})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dashboardData.notifications
                .filter(n => !n.read)
                .slice(0, 3)
                .map((notification) => (
                <div 
                  key={notification.id} 
                  className="flex items-start justify-between p-3 bg-white rounded border cursor-pointer hover:bg-gray-50"
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                  </div>
                  <Badge variant={notification.type === 'warning' ? 'destructive' : 'secondary'}>
                    {notification.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrats actifs</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.activeContracts}</div>
            <p className="text-xs text-muted-foreground">Assurances en cours</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">À régler</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sinistres ouverts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.openClaims}</div>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prime totale</CardTitle>
            <Euro className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.totalPremium}€</div>
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
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
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
              {dashboardData.upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Assurance {payment.type}</p>
                      <p className="text-xs text-gray-500">Échéance: {payment.dueDate}</p>
                      <p className="text-xs text-gray-500">Contrat: {payment.contractId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{payment.amount}€</p>
                    <Button 
                      size="sm" 
                      onClick={() => handlePayment(payment.id, payment.amount)}
                      className="mt-1"
                    >
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="p-6 h-auto flex flex-col space-y-2 hover:bg-blue-50">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-center">Nouvelle demande d'assurance</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex flex-col space-y-2 hover:bg-red-50">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <span className="text-center">Déclarer un sinistre</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex flex-col space-y-2 hover:bg-green-50">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <span className="text-center">Contacter un conseiller</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex flex-col space-y-2 hover:bg-purple-50">
              <Download className="h-8 w-8 text-purple-600" />
              <span className="text-center">Télécharger documents</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicClientDashboard;
