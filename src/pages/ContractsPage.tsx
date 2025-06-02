
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ContractManagement from '@/components/contracts/ContractManagement';
import { useAuth } from '@/contexts/AuthContext';

const ContractsPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Veuillez vous connecter pour accéder à vos contrats</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <ContractManagement />
        </main>
      </div>
    </div>
  );
};

export default ContractsPage;
