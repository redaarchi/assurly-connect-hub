
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ClientDashboard from '@/components/dashboards/ClientDashboard';
import AgentDashboard from '@/components/dashboards/AgentDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'client':
        return <ClientDashboard />;
      case 'agent':
        return <AgentDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <ClientDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Index;
