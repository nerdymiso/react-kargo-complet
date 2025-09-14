import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/contact";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DriverDashboard from "./pages/DriverDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import NewOrder from "./pages/NewOrder";
import OrdersTracking from "./pages/OrdersTracking";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DriverHistory from "./pages/DriverHistory";

// Onboarding
import Role from "./pages/onboarding/Role";
import OnboardingProfil from "./pages/onboarding/OnboardingProfil";
import OnboardingFinish from "./pages/onboarding/OnboardingFinish";
import OnboardingTransporteur from "./pages/onboarding/OnboardingTransporteur";
import OnboardingExpediteur from "./pages/onboarding/OnboardingExpediteur";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar toujours visible */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />

        {/* Dashboards */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />

        {/* Pages Client */}
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/orders-tracking" element={<OrdersTracking />} />

        {/* Commun */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/driver-history" element={<DriverHistory />} />

        {/* Onboarding */}
        <Route path="/onboarding/role" element={<Role />} />
        <Route path="/onboarding/profil" element={<OnboardingProfil />} />
        <Route path="/onboarding/finish" element={<OnboardingFinish />} />
        <Route path="/onboarding/transporteur" element={<OnboardingTransporteur />} />
        <Route path="/onboarding/expediteur" element={<OnboardingExpediteur />} />
      </Routes>

      <Contact />
    </div>
  );
}

export default App;
