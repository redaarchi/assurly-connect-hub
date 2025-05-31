
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Save, ChevronLeft, ChevronRight } from 'lucide-react';

interface AutoInsuranceData {
  // Informations véhicule
  marque: string;
  modele: string;
  annee: string;
  immatriculation: string;
  carburant: string;
  usage: string;
  
  // Informations conducteur
  datePermis: string;
  bonus: string;
  sinistres: string;
  kilometrage: string;
  
  // Garanties
  garanties: string[];
  
  // Documents
  documents: File[];
}

const AutoInsuranceForm: React.FC<{ onSubmit: (data: AutoInsuranceData) => void; onBack: () => void }> = ({ onSubmit, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AutoInsuranceData>({
    marque: '',
    modele: '',
    annee: '',
    immatriculation: '',
    carburant: '',
    usage: '',
    datePermis: '',
    bonus: '',
    sinistres: '',
    kilometrage: '',
    garanties: [],
    documents: []
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    const timer = setTimeout(() => {
      localStorage.setItem('autoInsuranceFormData', JSON.stringify(formData));
      console.log('Données sauvegardées automatiquement');
    }, 2000);
    
    setAutoSaveTimer(timer);
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formData]);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('autoInsuranceFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        toast({
          title: "Données restaurées",
          description: "Vos données précédemment saisies ont été restaurées",
        });
      } catch (error) {
        console.error('Erreur lors de la restauration des données:', error);
      }
    }
  }, []);

  const handleInputChange = (field: keyof AutoInsuranceData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.marque) errors.marque = 'La marque est requise';
        if (!formData.modele) errors.modele = 'Le modèle est requis';
        if (!formData.annee) errors.annee = 'L\'année est requise';
        if (!formData.immatriculation) errors.immatriculation = 'L\'immatriculation est requise';
        if (!formData.carburant) errors.carburant = 'Le type de carburant est requis';
        if (!formData.usage) errors.usage = 'L\'usage est requis';
        break;
      case 2:
        if (!formData.datePermis) errors.datePermis = 'La date du permis est requise';
        if (!formData.bonus) errors.bonus = 'Le coefficient bonus/malus est requis';
        if (!formData.kilometrage) errors.kilometrage = 'Le kilométrage est requis';
        break;
      case 3:
        if (formData.garanties.length === 0) errors.garanties = 'Sélectionnez au moins une garantie';
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast({
        title: "Erreurs de validation",
        description: "Veuillez corriger les erreurs avant de continuer",
        variant: "destructive",
      });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      localStorage.removeItem('autoInsuranceFormData');
      onSubmit(formData);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Informations du véhicule</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="marque">Marque *</Label>
          <Select value={formData.marque} onValueChange={(value) => handleInputChange('marque', value)}>
            <SelectTrigger className={validationErrors.marque ? 'border-red-500' : ''}>
              <SelectValue placeholder="Sélectionnez une marque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="peugeot">Peugeot</SelectItem>
              <SelectItem value="renault">Renault</SelectItem>
              <SelectItem value="citroen">Citroën</SelectItem>
              <SelectItem value="volkswagen">Volkswagen</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes">Mercedes</SelectItem>
              <SelectItem value="audi">Audi</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.marque && <p className="text-red-500 text-sm mt-1">{validationErrors.marque}</p>}
        </div>

        <div>
          <Label htmlFor="modele">Modèle *</Label>
          <Input
            id="modele"
            value={formData.modele}
            onChange={(e) => handleInputChange('modele', e.target.value)}
            placeholder="Ex: 308, Clio, Golf..."
            className={validationErrors.modele ? 'border-red-500' : ''}
          />
          {validationErrors.modele && <p className="text-red-500 text-sm mt-1">{validationErrors.modele}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="annee">Année de mise en circulation *</Label>
          <Select value={formData.annee} onValueChange={(value) => handleInputChange('annee', value)}>
            <SelectTrigger className={validationErrors.annee ? 'border-red-500' : ''}>
              <SelectValue placeholder="Sélectionnez l'année" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.annee && <p className="text-red-500 text-sm mt-1">{validationErrors.annee}</p>}
        </div>

        <div>
          <Label htmlFor="immatriculation">Numéro d'immatriculation *</Label>
          <Input
            id="immatriculation"
            value={formData.immatriculation}
            onChange={(e) => handleInputChange('immatriculation', e.target.value.toUpperCase())}
            placeholder="AA-123-BB"
            className={validationErrors.immatriculation ? 'border-red-500' : ''}
          />
          {validationErrors.immatriculation && <p className="text-red-500 text-sm mt-1">{validationErrors.immatriculation}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="carburant">Type de carburant *</Label>
          <Select value={formData.carburant} onValueChange={(value) => handleInputChange('carburant', value)}>
            <SelectTrigger className={validationErrors.carburant ? 'border-red-500' : ''}>
              <SelectValue placeholder="Sélectionnez le carburant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="essence">Essence</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="hybride">Hybride</SelectItem>
              <SelectItem value="electrique">Électrique</SelectItem>
              <SelectItem value="gpl">GPL</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.carburant && <p className="text-red-500 text-sm mt-1">{validationErrors.carburant}</p>}
        </div>

        <div>
          <Label htmlFor="usage">Usage du véhicule *</Label>
          <Select value={formData.usage} onValueChange={(value) => handleInputChange('usage', value)}>
            <SelectTrigger className={validationErrors.usage ? 'border-red-500' : ''}>
              <SelectValue placeholder="Sélectionnez l'usage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personnel">Personnel</SelectItem>
              <SelectItem value="professionnel">Professionnel</SelectItem>
              <SelectItem value="mixte">Mixte</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.usage && <p className="text-red-500 text-sm mt-1">{validationErrors.usage}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Informations du conducteur</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="datePermis">Date d'obtention du permis *</Label>
          <Input
            id="datePermis"
            type="date"
            value={formData.datePermis}
            onChange={(e) => handleInputChange('datePermis', e.target.value)}
            className={validationErrors.datePermis ? 'border-red-500' : ''}
          />
          {validationErrors.datePermis && <p className="text-red-500 text-sm mt-1">{validationErrors.datePermis}</p>}
        </div>

        <div>
          <Label htmlFor="bonus">Coefficient bonus/malus *</Label>
          <Select value={formData.bonus} onValueChange={(value) => handleInputChange('bonus', value)}>
            <SelectTrigger className={validationErrors.bonus ? 'border-red-500' : ''}>
              <SelectValue placeholder="Sélectionnez votre coefficient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.50">0.50 (Bonus maximal)</SelectItem>
              <SelectItem value="0.60">0.60</SelectItem>
              <SelectItem value="0.70">0.70</SelectItem>
              <SelectItem value="0.80">0.80</SelectItem>
              <SelectItem value="0.90">0.90</SelectItem>
              <SelectItem value="1.00">1.00 (Coefficient de base)</SelectItem>
              <SelectItem value="1.25">1.25 (Malus)</SelectItem>
              <SelectItem value="1.50">1.50 (Malus)</SelectItem>
              <SelectItem value="inconnu">Je ne connais pas</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.bonus && <p className="text-red-500 text-sm mt-1">{validationErrors.bonus}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sinistres">Nombre de sinistres sur 5 ans</Label>
          <Select value={formData.sinistres} onValueChange={(value) => handleInputChange('sinistres', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez le nombre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Aucun</SelectItem>
              <SelectItem value="1">1 sinistre</SelectItem>
              <SelectItem value="2">2 sinistres</SelectItem>
              <SelectItem value="3">3 sinistres ou plus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="kilometrage">Kilométrage annuel estimé *</Label>
          <Select value={formData.kilometrage} onValueChange={(value) => handleInputChange('kilometrage', value)}>
            <SelectTrigger className={validationErrors.kilometrage ? 'border-red-500' : ''}>
              <SelectValue placeholder="Sélectionnez le kilométrage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moins-5000">Moins de 5 000 km</SelectItem>
              <SelectItem value="5000-10000">5 000 - 10 000 km</SelectItem>
              <SelectItem value="10000-15000">10 000 - 15 000 km</SelectItem>
              <SelectItem value="15000-20000">15 000 - 20 000 km</SelectItem>
              <SelectItem value="20000-30000">20 000 - 30 000 km</SelectItem>
              <SelectItem value="plus-30000">Plus de 30 000 km</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.kilometrage && <p className="text-red-500 text-sm mt-1">{validationErrors.kilometrage}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const garantiesOptions = [
      { id: 'rc', label: 'Responsabilité civile', description: 'Obligatoire par la loi', required: true },
      { id: 'vol', label: 'Vol et tentative de vol', description: 'Protection contre le vol du véhicule' },
      { id: 'incendie', label: 'Incendie et explosion', description: 'Dommages causés par le feu' },
      { id: 'bris-glace', label: 'Bris de glace', description: 'Réparation/remplacement des vitres' },
      { id: 'tous-risques', label: 'Tous risques collision', description: 'Dommages au véhicule même responsable' },
      { id: 'protection-juridique', label: 'Protection juridique', description: 'Assistance juridique et défense' },
      { id: 'panne', label: 'Assistance panne 0 km', description: 'Dépannage dès le domicile' },
      { id: 'conducteur', label: 'Garantie du conducteur', description: 'Protection corporelle du conducteur' }
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Garanties souhaitées</h3>
        <p className="text-gray-600 mb-6">Sélectionnez les garanties qui vous intéressent</p>
        
        <div className="space-y-3">
          {garantiesOptions.map((garantie) => (
            <div key={garantie.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <Checkbox
                id={garantie.id}
                checked={formData.garanties.includes(garantie.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('garanties', [...formData.garanties, garantie.id]);
                  } else if (!garantie.required) {
                    handleInputChange('garanties', formData.garanties.filter(g => g !== garantie.id));
                  }
                }}
                disabled={garantie.required}
              />
              <div className="flex-1">
                <Label htmlFor={garantie.id} className="font-medium cursor-pointer">
                  {garantie.label}
                  {garantie.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <p className="text-sm text-gray-600 mt-1">{garantie.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {validationErrors.garanties && <p className="text-red-500 text-sm mt-1">{validationErrors.garanties}</p>}
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Documents et finalisation</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Documents optionnels</h4>
        <p className="text-blue-800 text-sm mb-4">
          Vous pouvez joindre des documents pour accélérer le traitement de votre demande
        </p>
        
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Carte grise du véhicule</p>
          <p>• Relevé d'information de votre précédent assureur</p>
          <p>• Permis de conduire</p>
        </div>
      </div>

      <div className="mt-6">
        <Label htmlFor="documents">Télécharger des documents (optionnel)</Label>
        <Input
          id="documents"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            if (e.target.files) {
              const filesArray = Array.from(e.target.files);
              setFormData(prev => ({ ...prev, documents: filesArray }));
            }
          }}
          className="mt-1"
        />
        {formData.documents.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            {formData.documents.length} fichier(s) sélectionné(s)
          </p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <h4 className="font-medium mb-2">Récapitulatif de votre demande</h4>
        <div className="space-y-1 text-sm">
          <p><strong>Véhicule:</strong> {formData.marque} {formData.modele} ({formData.annee})</p>
          <p><strong>Immatriculation:</strong> {formData.immatriculation}</p>
          <p><strong>Usage:</strong> {formData.usage}</p>
          <p><strong>Garanties:</strong> {formData.garanties.length} sélectionnée(s)</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Assurance Automobile</h2>
          <Button variant="outline" size="sm" onClick={() => {
            localStorage.setItem('autoInsuranceFormData', JSON.stringify(formData));
            toast({
              title: "Données sauvegardées",
              description: "Vos informations ont été sauvegardées",
            });
          }}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Étape {currentStep} sur {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% complété</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Informations du véhicule"}
            {currentStep === 2 && "Profil conducteur"}
            {currentStep === 3 && "Choix des garanties"}
            {currentStep === 4 && "Finalisation"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="flex justify-between mt-8">
            <div className="flex gap-2">
              <Button variant="outline" onClick={onBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevStep}>
                  Étape précédente
                </Button>
              )}
            </div>

            <div>
              {currentStep < totalSteps ? (
                <Button onClick={handleNextStep}>
                  Étape suivante
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Générer le devis
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoInsuranceForm;
