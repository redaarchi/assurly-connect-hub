
import React, { useState } from 'react';
import { CreditCard, Download, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Payment } from '@/types';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const mockPayments: Payment[] = [
  {
    id: '1',
    contractId: '1',
    clientId: '1',
    amount: 850,
    status: 'completed',
    dueDate: '2024-01-15',
    paidDate: '2024-01-14',
    method: 'Carte bancaire',
    recurring: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    contractId: '2',
    clientId: '1',
    amount: 1200,
    status: 'pending',
    dueDate: '2024-02-15',
    recurring: false,
    createdAt: '2024-01-20'
  }
];

const Payments = () => {
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des Paiements
              </h1>
              <p className="text-gray-600">
                Suivez vos paiements, gérez les factures et configurez les paiements automatiques
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Paiements Réussis</p>
                      <p className="text-2xl font-bold text-green-900">€18,450</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">En Attente</p>
                      <p className="text-2xl font-bold text-yellow-900">€2,050</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Récurrents Actifs</p>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Taux de Réussite</p>
                      <p className="text-2xl font-bold text-purple-900">94%</p>
                    </div>
                    <div className="w-8">
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-16 hover-scale transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600">
                    <div className="text-center">
                      <CreditCard className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-sm">Nouveau Paiement</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16 hover-scale transition-all duration-200">
                    <div className="text-center">
                      <Calendar className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-sm">Planifier Paiement</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16 hover-scale transition-all duration-200">
                    <div className="text-center">
                      <Download className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-sm">Télécharger Factures</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payments List */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Historique des Paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPayments.map((payment, index) => (
                    <div key={payment.id} className={`p-4 border rounded-lg hover:shadow-md transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">Paiement #{payment.id}</h3>
                            <Badge className={getStatusColor(payment.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(payment.status)}
                                {payment.status === 'completed' ? 'Payé' : 
                                 payment.status === 'pending' ? 'En attente' : 'Échoué'}
                              </span>
                            </Badge>
                            {payment.recurring && (
                              <Badge variant="outline">Récurrent</Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Montant: </span>
                              €{payment.amount.toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">Échéance: </span>
                              {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                            </div>
                            {payment.paidDate && (
                              <div>
                                <span className="font-medium">Payé le: </span>
                                {new Date(payment.paidDate).toLocaleDateString('fr-FR')}
                              </div>
                            )}
                            {payment.method && (
                              <div>
                                <span className="font-medium">Méthode: </span>
                                {payment.method}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="hover-scale">
                            <Download className="h-4 w-4 mr-1" />
                            Facture
                          </Button>
                          {payment.status === 'pending' && (
                            <Button size="sm" className="hover-scale bg-gradient-to-r from-green-500 to-green-600">
                              <CreditCard className="h-4 w-4 mr-1" />
                              Payer
                            </Button>
                          )}
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

export default Payments;
