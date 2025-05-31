
import React from 'react';
import { BarChart3, Download, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Reports = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Rapports et Analyses
              </h1>
              <p className="text-gray-600">
                Consultez les statistiques et générez des rapports détaillés
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Rapport Mensuel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Statistiques du mois en cours</p>
                  <Button className="w-full hover-scale">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Analyse Annuelle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Tendances et évolutions annuelles</p>
                  <Button className="w-full hover-scale">
                    <Download className="h-4 w-4 mr-2" />
                    Générer Rapport
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Rapport Personnalisé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Choisissez votre période et critères</p>
                  <Button className="w-full hover-scale">
                    <Calendar className="h-4 w-4 mr-2" />
                    Configurer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
