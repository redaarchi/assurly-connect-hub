
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Home, Heart, Shield, ChevronRight, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InsuranceType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  priceRange: string;
  popular?: boolean;
}

const InsuranceSelectionForm: React.FC<{ onSelect: (type: string) => void }> = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState<string>('');

  const insuranceTypes: InsuranceType[] = [
    {
      id: 'auto',
      name: 'Assurance Automobile',
      icon: <Car className="h-8 w-8" />,
      description: 'Protection complète pour votre véhicule',
      features: ['Responsabilité civile', 'Vol et incendie', 'Bris de glace', 'Protection juridique'],
      priceRange: 'À partir de 25€/mois',
      popular: true
    },
    {
      id: 'habitation',
      name: 'Assurance Habitation',
      icon: <Home className="h-8 w-8" />,
      description: 'Sécurisez votre logement et vos biens',
      features: ['Incendie et explosion', 'Dégâts des eaux', 'Vol et vandalisme', 'Responsabilité civile'],
      priceRange: 'À partir de 15€/mois'
    },
    {
      id: 'sante',
      name: 'Assurance Santé',
      icon: <Heart className="h-8 w-8" />,
      description: 'Couverture santé personnalisée',
      features: ['Hospitalisation', 'Soins courants', 'Optique et dentaire', 'Médecines douces'],
      priceRange: 'À partir de 35€/mois'
    },
    {
      id: 'vie',
      name: 'Assurance Vie',
      icon: <Shield className="h-8 w-8" />,
      description: 'Protection pour l\'avenir de votre famille',
      features: ['Capital décès', 'Épargne retraite', 'Rente viagère', 'Avantages fiscaux'],
      priceRange: 'À partir de 50€/mois'
    }
  ];

  const handleSelection = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Choisissez votre type d'assurance
        </h1>
        <p className="text-gray-600 text-lg">
          Sélectionnez le type d'assurance qui correspond le mieux à vos besoins
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {insuranceTypes.map((insurance) => (
          <Card 
            key={insurance.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
              selectedType === insurance.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleSelection(insurance.id)}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center items-center mb-4">
                <div className={`p-4 rounded-full ${
                  selectedType === insurance.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <div className={selectedType === insurance.id ? 'text-blue-600' : 'text-gray-600'}>
                    {insurance.icon}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <CardTitle className="text-xl">{insurance.name}</CardTitle>
                {insurance.popular && (
                  <Badge className="bg-orange-100 text-orange-800">Populaire</Badge>
                )}
              </div>
              
              <CardDescription className="text-gray-600">
                {insurance.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="font-semibold text-blue-600">{insurance.priceRange}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    Garanties incluses :
                  </h4>
                  <ul className="space-y-1">
                    {insurance.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedType && (
        <div className="text-center">
          <Button 
            onClick={handleContinue}
            size="lg"
            className="px-8 py-3 text-lg animate-fade-in"
          >
            Continuer avec {insuranceTypes.find(t => t.id === selectedType)?.name}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default InsuranceSelectionForm;
