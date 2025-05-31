
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  Euro,
  TrendingUp,
  Shield,
  BarChart3,
  Settings,
  Download
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data - in real app this would come from API
  const stats = {
    totalUsers: 1284,
    totalContracts: 856,
    totalClaims: 142,
    totalRevenue: 125600
  };

  const systemHealth = {
    uptime: 99.9,
    activeUsers: 84,
    processingQueue: 12,
    errorRate: 0.1
  };

  const recentActivities = [
    { id: 1, type: 'user', description: 'Nouvel agent créé: Marie Dubois', time: '2h' },
    { id: 2, type: 'contract', description: '25 nouveaux contrats approuvés', time: '4h' },
    { id: 3, type: 'claim', description: 'Sinistre de 15 000€ validé', time: '6h' },
    { id: 4, type: 'system', description: 'Mise à jour système déployée', time: '1j' },
  ];

  const topAgents = [
    { name: 'Pierre Martin', contracts: 45, revenue: 12500, satisfaction: 94 },
    { name: 'Sophie Laurent', contracts: 38, revenue: 11200, satisfaction: 91 },
    { name: 'Jean Dubois', contracts: 42, revenue: 10800, satisfaction: 89 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-600" />;
      case 'contract': return <FileText className="h-4 w-4 text-green-600" />;
      case 'claim': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'system': return <Settings className="h-4 w-4 text-purple-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de bord - Administrateur</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="mr-2 h-4 w-4" />
            Rapport complet
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrats actifs</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContracts}</div>
            <p className="text-xs text-muted-foreground">+8% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sinistres totaux</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClaims}</div>
            <p className="text-xs text-muted-foreground">-5% vs mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}€</div>
            <p className="text-xs text-muted-foreground">+22% ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>État du système</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{systemHealth.uptime}%</div>
              <p className="text-sm text-gray-600">Disponibilité</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{systemHealth.activeUsers}</div>
              <p className="text-sm text-gray-600">Utilisateurs actifs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{systemHealth.processingQueue}</div>
              <p className="text-sm text-gray-600">File d'attente</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{systemHealth.errorRate}%</div>
              <p className="text-sm text-gray-600">Taux d'erreur</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Agents */}
        <Card>
          <CardHeader>
            <CardTitle>Meilleurs agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAgents.map((agent, index) => (
                <div key={agent.name} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      #{index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-600">{agent.contracts} contrats</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{agent.revenue.toLocaleString()}€</p>
                    <p className="text-sm text-green-600">{agent.satisfaction}% satisfaction</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Targets */}
      <Card>
        <CardHeader>
          <CardTitle>Objectifs mensuels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Nouveaux contrats</span>
                <span>156/200</span>
              </div>
              <Progress value={78} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Revenus</span>
                <span>125k€/150k€</span>
              </div>
              <Progress value={83} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Satisfaction client</span>
                <span>91%/95%</span>
              </div>
              <Progress value={96} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
