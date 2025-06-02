
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SupportModule from '@/components/support/SupportModule';
import ChatbotIA from '@/components/support/ChatbotIA';
import { useAuth } from '@/contexts/AuthContext';

const Support = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Veuillez vous connecter pour accéder au support</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <SupportModule />
          <ChatbotIA />
        </main>
      </div>
    </div>
  );
};

export default Support;
