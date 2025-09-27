import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/contact";
import { UserProvider } from "./hooks/UserContext"; 

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
import OnboardingTransporteur from "./pages/onboarding/OnboardingTransporteur";
import OnboardingClient from "./pages/onboarding/OnboardingClient";

function App() {
  return (
    <UserProvider>
      {/* Wrapper */}
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        
        {/* Navbar toujours visible */}
        <Navbar />

        {/* Main Content (ajustement du padding pour compenser la navbar fixe) */}
        <main className="flex-1 pt-20 px-4 md:px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />

            {/* Dashboards */}
            <Route path="/ClientDashboard" element={<ClientDashboard />} />
            <Route path="/DriverDashboard" element={<DriverDashboard />} />

            {/* Pages Client */}
            <Route path="/NewOrder" element={<NewOrder />} />
            <Route path="/OrdersTracking" element={<OrdersTracking />} />

            {/* Commun */}
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/DriverHistory" element={<DriverHistory />} />

            {/* Onboarding */}
            <Route path="/OnboardingTransporteur" element={<OnboardingTransporteur />} />
            <Route path="/OnboardingClient" element={<OnboardingClient />} />
          </Routes>
        </main>

        {/* Footer Contact */}
        <footer className="mt-8">
          <Contact />
        </footer>
      </div>
    </UserProvider>
  );
}

export default App;
