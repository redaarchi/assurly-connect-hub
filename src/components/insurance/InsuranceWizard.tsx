import React, { useState } from 'react';
import InsuranceSelectionForm from '@/components/forms/InsuranceSelectionForm';
import AutoInsuranceForm from '@/components/forms/dynamic/AutoInsuranceForm';
import QuoteDisplay from '@/components/forms/QuoteDisplay';
import ElectronicSignature from '@/components/forms/ElectronicSignature';
import Button from '@/components/Button';

type WizardStep = 'selection' | 'form' | 'quote' | 'signature' | 'payment';

const InsuranceWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('selection');
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('');
  const [formData, setFormData] = useState<any>(null);
  const [quoteData, setQuoteData] = useState<any>(null);

  const handleInsuranceSelection = (type: string) => {
    setSelectedInsuranceType(type);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    
    // Generate mock quote based on form data
    const mockQuote = {
      id: `DEV-${Date.now()}`,
      type: selectedInsuranceType,
      vehicleInfo: selectedInsuranceType === 'auto' ? {
        marque: data.marque,
        modele: data.modele,
        annee: data.annee,
        immatriculation: data.immatriculation
      } : undefined,
      guarantees: data.garanties || ['rc', 'vol', 'incendie'],
      pricing: {
        primeBrute: selectedInsuranceType === 'auto' ? 580 : 420,
        taxes: selectedInsuranceType === 'auto' ? 87 : 63,
        frais: 35,
        total: selectedInsuranceType === 'auto' ? 702 : 518
      },
      validity: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      contractDuration: '1 an',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')
    };
    
    setQuoteData(mockQuote);
    setCurrentStep('quote');
  };

  const handleQuoteAccept = () => {
    setCurrentStep('signature');
  };

  const handleSignatureComplete = (signatureData: any) => {
    console.log('Signature complétée:', signatureData);
    setCurrentStep('payment');
  };

  const handleQuoteModify = () => {
    setCurrentStep('form');
  };

  const handleQuoteReject = () => {
    setCurrentStep('selection');
    setSelectedInsuranceType('');
    setFormData(null);
    setQuoteData(null);
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setSelectedInsuranceType('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'selection' && (
        <InsuranceSelectionForm onSelect={handleInsuranceSelection} />
      )}
      
      {currentStep === 'form' && selectedInsuranceType === 'auto' && (
        <AutoInsuranceForm 
          onSubmit={handleFormSubmit} 
          onBack={handleBackToSelection}
        />
      )}
      
      {currentStep === 'quote' && quoteData && (
        <QuoteDisplay
          quote={quoteData}
          onAccept={handleQuoteAccept}
          onModify={handleQuoteModify}
          onReject={handleQuoteReject}
        />
      )}
      
      {currentStep === 'signature' && (
        <div className="p-6">
          <ElectronicSignature
            document={quoteData}
            onSignatureComplete={handleSignatureComplete}
            onCancel={() => setCurrentStep('quote')}
          />
        </div>
      )}
      
      {currentStep === 'payment' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Paiement sécurisé</h2>
            <p className="text-gray-600 mb-4">Redirection vers notre partenaire de paiement...</p>
            <Button>Procéder au paiement</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceWizard;
