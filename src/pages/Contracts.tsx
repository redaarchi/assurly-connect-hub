
import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Calendar, AlertCircle, Download, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Contract } from '@/types';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const mockContracts: Contract[] = [
  {
    id: '1',
    clientId: '1',
    agentId: '2',
    type: 'auto',
    status: 'active',
    premium: 850,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    details: { vehicle: 'Toyota Camry 2020', coverage: 'Comprehensive' },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    clientId: '1',
    type: 'home',
    status: 'pending',
    premium: 1200,
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    details: { property: 'Maison 120m²', address: 'Paris 75001' },
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  }
];

const Contracts = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'auto': return 'Automobile';
      case 'home': return 'Habitation';
      case 'health': return 'Santé';
      case 'life': return 'Vie';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="animate-fade-in">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des Contrats
              </h1>
              <p className="text-gray-600">
                Gérez vos contrats d'assurance, suivez les statuts et générez des documents
              </p>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6 animate-scale-in">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher un contrat..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-80"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="expired">Expiré</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="auto">Automobile</SelectItem>
                      <SelectItem value="home">Habitation</SelectItem>
                      <SelectItem value="health">Santé</SelectItem>
                      <SelectItem value="life">Vie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(user?.role === 'agent' || user?.role === 'admin') && (
                  <Button className="hover-scale transition-all duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau Contrat
                  </Button>
                )}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover-scale transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Contrats Actifs</p>
                      <p className="text-2xl font-bold text-blue-900">24</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 cursor-pointer bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Revenus Mensuels</p>
                      <p className="text-2xl font-bold text-green-900">€15,420</p>
                    </div>
                    <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 cursor-pointer bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">En Attente</p>
                      <p className="text-2xl font-bold text-yellow-900">3</p>
                    </div>
                    <div className="h-12 w-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Renouvellements</p>
                      <p className="text-2xl font-bold text-purple-900">7</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contracts List */}
            <div className="space-y-4">
              {mockContracts.map((contract, index) => (
                <Card key={contract.id} className={`hover-scale transition-all duration-300 hover:shadow-lg animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Contrat #{contract.id}
                          </h3>
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status === 'active' ? 'Actif' : 
                             contract.status === 'pending' ? 'En attente' :
                             contract.status === 'expired' ? 'Expiré' : 'Annulé'}
                          </Badge>
                          <Badge variant="outline">
                            {getTypeLabel(contract.type)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Prime: </span>
                            €{contract.premium.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Début: </span>
                            {new Date(contract.startDate).toLocaleDateString('fr-FR')}
                          </div>
                          <div>
                            <span className="font-medium">Fin: </span>
                            {new Date(contract.endDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>

                        {contract.details && (
                          <div className="mt-2 text-sm text-gray-600">
                            {Object.entries(contract.details).map(([key, value]) => (
                              <span key={key} className="mr-4">
                                <span className="font-medium capitalize">{key}: </span>
                                {value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hover-scale">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" className="hover-scale">
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contracts;
