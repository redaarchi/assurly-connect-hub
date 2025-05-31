
import React, { useState } from 'react';
import { Plus, FileText, AlertTriangle, CheckCircle, Clock, Camera, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Claim } from '@/types';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const mockClaims: Claim[] = [
  {
    id: '1',
    contractId: '1',
    clientId: '1',
    agentId: '2',
    type: 'Accident de la route',
    description: 'Collision avec un autre véhicule au carrefour',
    status: 'under_review',
    amount: 2500,
    documents: ['rapport_police.pdf', 'photos_vehicule.jpg'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22'
  }
];

const Claims = () => {
  const { user } = useAuth();
  const [showNewClaimForm, setShowNewClaimForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <FileText className="h-4 w-4" />;
      case 'under_review': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <AlertTriangle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted': return 'Soumis';
      case 'under_review': return 'En cours d\'examen';
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Rejeté';
      case 'closed': return 'Fermé';
      default: return status;
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
                    Gestion des Sinistres
                  </h1>
                  <p className="text-gray-600">
                    Déclarez et suivez vos sinistres, communiquez avec vos agents
                  </p>
                </div>
                {user?.role === 'client' && (
                  <Button 
                    onClick={() => setShowNewClaimForm(!showNewClaimForm)}
                    className="hover-scale transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Déclarer un Sinistre
                  </Button>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Sinistres</p>
                      <p className="text-2xl font-bold text-blue-900">8</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">En Cours</p>
                      <p className="text-2xl font-bold text-yellow-900">3</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Approuvés</p>
                      <p className="text-2xl font-bold text-green-900">4</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Indemnisations</p>
                      <p className="text-2xl font-bold text-purple-900">€12,500</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* New Claim Form */}
            {showNewClaimForm && (
              <Card className="mb-8 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Nouveau Sinistre
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="claim-type">Type de sinistre</Label>
                    <Input id="claim-type" placeholder="Ex: Accident de la route, Vol, Dégât des eaux..." />
                  </div>
                  <div>
                    <Label htmlFor="claim-description">Description détaillée</Label>
                    <Textarea 
                      id="claim-description"
                      placeholder="Décrivez les circonstances du sinistre..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="claim-amount">Montant estimé des dégâts (€)</Label>
                    <Input id="claim-amount" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="claim-documents">Documents</Label>
                    <Input id="claim-documents" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" />
                    <p className="text-sm text-gray-500 mt-1">
                      Ajoutez des photos, rapports de police, constats...
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="hover-scale">Soumettre le Sinistre</Button>
                    <Button variant="outline" onClick={() => setShowNewClaimForm(false)} className="hover-scale">
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Claims List */}
            <div className="space-y-6">
              {mockClaims.map((claim, index) => (
                <Card key={claim.id} className={`hover-scale transition-all duration-300 hover:shadow-lg animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Sinistre #{claim.id}
                          </h3>
                          <Badge className={getStatusColor(claim.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(claim.status)}
                              {getStatusLabel(claim.status)}
                            </span>
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-gray-700">Type: </span>
                            <span className="text-gray-600">{claim.type}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Description: </span>
                            <span className="text-gray-600">{claim.description}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Montant: </span>
                              <span className="text-gray-600">€{claim.amount.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Créé le: </span>
                              <span className="text-gray-600">
                                {new Date(claim.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Mis à jour: </span>
                              <span className="text-gray-600">
                                {new Date(claim.updatedAt).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                          
                          {claim.documents.length > 0 && (
                            <div>
                              <span className="font-medium text-gray-700">Documents: </span>
                              <div className="flex gap-2 mt-1">
                                {claim.documents.map((doc, i) => (
                                  <Badge key={i} variant="outline" className="cursor-pointer hover-scale">
                                    <FileText className="h-3 w-3 mr-1" />
                                    {doc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="lg:w-64 space-y-3">
                        <Button variant="outline" className="w-full hover-scale">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Messagerie
                        </Button>
                        <Button variant="outline" className="w-full hover-scale">
                          <Camera className="h-4 w-4 mr-2" />
                          Ajouter Photos
                        </Button>
                        <Button variant="outline" className="w-full hover-scale">
                          <FileText className="h-4 w-4 mr-2" />
                          Télécharger Rapport
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

export default Claims;
