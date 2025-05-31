
import React from 'react';
import { Plus, Car, Home, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const InsuranceTypes = () => {
  const { user } = useAuth();

  const insuranceTypes = [
    {
      id: 1,
      name: 'Assurance Automobile',
      icon: Car,
      description: 'Protection complète pour votre véhicule',
      active: true
    },
    {
      id: 2,
      name: 'Assurance Habitation',
      icon: Home,
      description: 'Sécurisez votre logement et vos biens',
      active: true
    },
    {
      id: 3,
      name: 'Assurance Santé',
      icon: Heart,
      description: 'Couverture santé personnalisée',
      active: true
    },
    {
      id: 4,
      name: 'Assurance Vie',
      icon: Shield,
      description: 'Protection pour l\'avenir de votre famille',
      active: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Types d'Assurance
                  </h1>
                  <p className="text-gray-600">
                    Gérez les différents types d'assurance proposés
                  </p>
                </div>
                {user?.role === 'admin' && (
                  <Button className="hover-scale transition-all duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau Type
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insuranceTypes.map((type, index) => (
                <Card key={type.id} className={`hover-scale transition-all duration-300 hover:shadow-lg animate-fade-in ${type.active ? 'border-green-200 bg-green-50' : 'border-gray-200'}`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${type.active ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <type.icon className={`h-6 w-6 ${type.active ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      {type.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${type.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {type.active ? 'Actif' : 'Inactif'}
                      </span>
                      {user?.role === 'admin' && (
                        <Button variant="outline" size="sm" className="hover-scale">
                          Configurer
                        </Button>
                      )}
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

export default InsuranceTypes;
