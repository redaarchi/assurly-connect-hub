
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import InsuranceWizard from '@/components/insurance/InsuranceWizard';
import { useAuth } from '@/contexts/AuthContext';

const NewInsuranceRequest = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Veuillez vous connecter pour accéder à cette page</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <InsuranceWizard />
        </main>
      </div>
    </div>
  );
};

export default NewInsuranceRequest;
