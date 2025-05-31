
import React from 'react';
import { User, Lock, Bell, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="animate-fade-in max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Paramètres
              </h1>
              <p className="text-gray-600">
                Gérez vos informations personnelles et préférences
              </p>
            </div>

            <div className="space-y-6">
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations Personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" defaultValue={user?.firstName} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" defaultValue={user?.lastName} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={user?.email} />
                  </div>
                  <Button className="hover-scale">Sauvegarder</Button>
                </CardContent>
              </Card>

              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="hover-scale">Changer le mot de passe</Button>
                </CardContent>
              </Card>

              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notifications par email</h4>
                      <p className="text-sm text-gray-600">Recevez des mises à jour par email</p>
                    </div>
                    <Button variant="outline" className="hover-scale">Activer</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Rappels de paiement</h4>
                      <p className="text-sm text-gray-600">Alertes avant échéance</p>
                    </div>
                    <Button variant="outline" className="hover-scale">Configurer</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
