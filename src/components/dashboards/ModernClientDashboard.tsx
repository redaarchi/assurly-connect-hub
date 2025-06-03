
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoCard from '@/components/profile/PersonalInfoCard';
import { apiService } from '@/services/apiService';
import { DashboardStats, Notification } from '@/types/api';
import { 
  Plus, 
  History, 
  Mail, 
  CreditCard, 
  Bell, 
  FileText, 
  Calendar, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  PenTool
} from 'lucide-react';

const ModernClientDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsResponse, notificationsResponse] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getNotifications()
      ]);
      
      setStats(statsResponse.data);
      setNotifications(notificationsResponse.data.slice(0, 3)); // Show only 3 recent notifications
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du tableau de bord",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewRequest = () => {
    setShowNewRequestForm(true);
    toast({
      title: "Nouvelle demande",
      description: "Ouverture du formulaire de demande d'assurance",
    });
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: `Action: ${action}`,
      description: "Fonctionnalité en cours d'implémentation",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="text-green-600" size={16} />;
      case 'renewal': return <Calendar className="text-orange-600" size={16} />;
      case 'warning': return <AlertCircle className="text-red-600" size={16} />;
      case 'success': return <CheckCircle className="text-green-600" size={16} />;
      default: return <Bell className="text-blue-600" size={16} />;
    }
  };

  if (showNewRequestForm) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Nouvelle Demande d'Assurance</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowNewRequestForm(false)}
            className="hover-scale"
          >
            Retour au Dashboard
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-600 py-8">
            Formulaire de nouvelle demande d'assurance sera intégré ici
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600 mt-1">Gérez vos assurances en toute simplicité</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={handleNewRequest}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover-scale"
          >
            <Plus size={18} className="mr-2" />
            Nouvelle Demande
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contrats Actifs</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.activeContracts || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Paiements en Attente</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.pendingPayments || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bell className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.unreadNotifications || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Prochain Renouvellement</p>
                    <p className="text-sm font-bold text-gray-900">
                      {stats?.nextRenewal ? new Date(stats.nextRenewal).toLocaleDateString('fr-FR') : 'Aucun'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={20} />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 hover-scale"
              onClick={() => handleQuickAction('Historique')}
            >
              <History size={20} />
              <span>Historique</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 hover-scale"
              onClick={() => handleQuickAction('Notifications Email')}
            >
              <Mail size={20} />
              <span>Notifications</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 hover-scale"
              onClick={() => handleQuickAction('Paiements')}
            >
              <CreditCard size={20} />
              <span>Paiements</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 hover-scale"
              onClick={() => handleQuickAction('Signature')}
            >
              <PenTool size={20} />
              <span>Signature</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info Section */}
        <div className="lg:col-span-2">
          <PersonalInfoCard />
        </div>

        {/* Recent Notifications */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="text-blue-600" size={20} />
              Notifications Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Nouveau
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">Aucune notification</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModernClientDashboard;
