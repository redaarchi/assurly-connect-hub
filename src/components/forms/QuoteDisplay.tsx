
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Download, Edit, Check, X, FileText, Euro, Calendar, Shield } from 'lucide-react';

interface QuoteData {
  id: string;
  type: string;
  vehicleInfo?: {
    marque: string;
    modele: string;
    annee: string;
    immatriculation: string;
  };
  guarantees: string[];
  pricing: {
    primeBrute: number;
    taxes: number;
    frais: number;
    total: number;
  };
  validity: string;
  contractDuration: string;
  startDate: string;
}

const QuoteDisplay: React.FC<{ 
  quote: QuoteData; 
  onAccept: () => void; 
  onModify: () => void; 
  onReject: () => void 
}> = ({ quote, onAccept, onModify, onReject }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onAccept();
      toast({
        title: "Devis accepté",
        description: "Vous allez être redirigé vers l'étape de signature",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = () => {
    onReject();
    toast({
      title: "Devis refusé",
      description: "Votre demande a été archivée",
    });
  };

  const downloadQuote = () => {
    // Simulate PDF download
    toast({
      title: "Téléchargement en cours",
      description: "Le PDF de votre devis est en cours de génération",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getGuaranteeLabel = (guarantee: string) => {
    const labels: Record<string, string> = {
      'rc': 'Responsabilité civile',
      'vol': 'Vol et tentative de vol',
      'incendie': 'Incendie et explosion',
      'bris-glace': 'Bris de glace',
      'tous-risques': 'Tous risques collision',
      'protection-juridique': 'Protection juridique',
      'panne': 'Assistance panne 0 km',
      'conducteur': 'Garantie du conducteur'
    };
    return labels[guarantee] || guarantee;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Votre devis d'assurance
        </h1>
        <p className="text-gray-600">
          Devis n° {quote.id} - Valable jusqu'au {quote.validity}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Détails du devis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations véhicule */}
          {quote.vehicleInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Véhicule assuré
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Marque et modèle</p>
                    <p className="font-medium">{quote.vehicleInfo.marque} {quote.vehicleInfo.modele}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Année</p>
                    <p className="font-medium">{quote.vehicleInfo.annee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Immatriculation</p>
                    <p className="font-medium">{quote.vehicleInfo.immatriculation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type d'assurance</p>
                    <Badge className="bg-blue-100 text-blue-800">
                      {quote.type === 'auto' ? 'Automobile' : quote.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Garanties incluses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                Garanties incluses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quote.guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{getGuaranteeLabel(guarantee)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conditions du contrat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Conditions du contrat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Durée du contrat</span>
                  <span className="font-medium">{quote.contractDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date de prise d'effet</span>
                  <span className="font-medium">{quote.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tacite reconduction</span>
                  <span className="font-medium">Oui</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Délai de rétractation</span>
                  <span className="font-medium">14 jours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tarification et actions */}
        <div className="space-y-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Euro className="h-5 w-5" />
                Tarification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Prime brute</span>
                  <span>{formatPrice(quote.pricing.primeBrute)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Taxes</span>
                  <span>{formatPrice(quote.pricing.taxes)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Frais de dossier</span>
                  <span>{formatPrice(quote.pricing.frais)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-blue-900">
                  <span>Total</span>
                  <span>{formatPrice(quote.pricing.total)}</span>
                </div>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Soit {formatPrice(quote.pricing.total / 12)}/mois
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleAccept} 
                disabled={isProcessing} 
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <Check className="h-4 w-4 mr-2" />
                {isProcessing ? "Traitement..." : "Accepter le devis"}
              </Button>
              
              <Button 
                onClick={onModify} 
                variant="outline" 
                className="w-full"
                size="lg"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier ma demande
              </Button>
              
              <Button 
                onClick={downloadQuote} 
                variant="outline" 
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger PDF
              </Button>
              
              <Button 
                onClick={handleReject} 
                variant="outline" 
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Refuser le devis
              </Button>
            </CardContent>
          </Card>

          {/* Aide */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-sm">Besoin d'aide ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Une question sur votre devis ? Nos conseillers sont là pour vous accompagner.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Contacter un conseiller
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
