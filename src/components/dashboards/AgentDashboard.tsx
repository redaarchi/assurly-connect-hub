
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
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AgentDashboard: React.FC = () => {
  // Mock data - in real app this would come from API
  const stats = {
    totalClients: 42,
    pendingRequests: 8,
    activeClaims: 5,
    monthlyRevenue: 15400
  };

  const pendingRequests = [
    { id: 1, client: 'Marie Dubois', type: 'Auto', date: '2024-01-15', priority: 'high' },
    { id: 2, client: 'Jean Martin', type: 'Habitation', date: '2024-01-14', priority: 'medium' },
    { id: 3, client: 'Sophie Laurent', type: 'Santé', date: '2024-01-13', priority: 'low' },
  ];

  const recentClaims = [
    { id: 1, client: 'Pierre Durand', type: 'Auto', status: 'under_review', amount: 2500 },
    { id: 2, client: 'Anne Moreau', type: 'Habitation', status: 'approved', amount: 1200 },
    { id: 3, client: 'Luc Bernard', type: 'Santé', status: 'rejected', amount: 850 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Badge variant="outline">En cours</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeté</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de bord - Agent</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Rapport
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Users className="mr-2 h-4 w-4" />
            Nouveau client
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients totaux</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">+2 ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes en attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sinistres actifs</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClaims}</div>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CA mensuel</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()}€</div>
            <p className="text-xs text-muted-foreground">+15% vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Demandes en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className={`p-3 border-l-4 rounded ${getPriorityColor(request.priority)}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{request.client}</p>
                      <p className="text-sm text-gray-600">Assurance {request.type}</p>
                      <p className="text-xs text-gray-500">{request.date}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card>
          <CardHeader>
            <CardTitle>Sinistres récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{claim.client}</p>
                    <p className="text-sm text-gray-600">Assurance {claim.type}</p>
                    <p className="text-sm font-bold">{claim.amount}€</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(claim.status)}
                    <Button size="sm" variant="outline" className="ml-2">
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance mensuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Objectif mensuel</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="mt-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Satisfaction client</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="mt-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Taux de conversion</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
