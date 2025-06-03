
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Contracts from "./pages/Contracts";
import Payments from "./pages/Payments";
import Claims from "./pages/Claims";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import InsuranceTypes from "./pages/InsuranceTypes";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import NewInsuranceRequest from "./pages/NewInsuranceRequest";
import RegistrationForm from "./components/forms/RegistrationForm";
import Support from "./pages/Support";
import Notifications from "./pages/Notifications";
import UserManagementPage from "./pages/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/insurance-types" element={<InsuranceTypes />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/new-insurance" element={<NewInsuranceRequest />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/support" element={<Support />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
