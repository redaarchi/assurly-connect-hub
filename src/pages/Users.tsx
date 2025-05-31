
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, UserCheck, UserX, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'client@demo.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'client',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    id: '2',
    email: 'agent@demo.com',
    firstName: 'Marie',
    lastName: 'Martin',
    role: 'agent',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  }
];

const Users = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Accès Restreint</h2>
          <p className="text-gray-600">Seuls les administrateurs peuvent accéder à cette page.</p>
        </Card>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'agent': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'client': return 'Client';
      case 'agent': return 'Agent';
      case 'admin': return 'Administrateur';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Gestion des Utilisateurs
                  </h1>
                  <p className="text-gray-600">
                    Gérez les comptes clients, agents et administrateurs
                  </p>
                </div>
                <Button className="hover-scale transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel Utilisateur
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card className="mb-8 animate-scale-in">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher un utilisateur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Clients</p>
                      <p className="text-2xl font-bold text-blue-900">1,247</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Agents</p>
                      <p className="text-2xl font-bold text-green-900">45</p>
                    </div>
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Administrateurs</p>
                      <p className="text-2xl font-bold text-purple-900">3</p>
                    </div>
                    <UserX className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Users List */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Liste des Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((userData, index) => (
                    <div key={userData.id} className={`p-4 border rounded-lg hover:shadow-md transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {userData.firstName} {userData.lastName}
                            </h3>
                            <Badge className={getRoleColor(userData.role)}>
                              {getRoleLabel(userData.role)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Email: </span>
                              {userData.email}
                            </div>
                            <div>
                              <span className="font-medium">Créé le: </span>
                              {new Date(userData.createdAt).toLocaleDateString('fr-FR')}
                            </div>
                            <div>
                              <span className="font-medium">Dernière mise à jour: </span>
                              {new Date(userData.updatedAt).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="hover-scale">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="hover-scale text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
