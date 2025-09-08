import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/contact";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

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
      </Routes>

       <Contact />
    </div>
  );
}

export default App;
