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
        <Route path="/ClientDashboard" element={<ClientDashboard />} />
        <Route path="/DriverDashboard" element={<DriverDashboard />} />
        <Route path="/NewOrder" element={<NewOrder />} />
        <Route path="/OrdersTracking" element={<OrdersTracking />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/DriverHistory" element={<DriverHistory />} />
      </Routes>

       <Contact />
    </div>
  );
}

export default App;
