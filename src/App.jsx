import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Hero />

      <div className="pt-72 max-w-7xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<h1 className="text-center text-3xl font-bold">Page d’accueil</h1>} />
          <Route
            path="/services"
            element={<Services items={["Transport", "Livraison", "Suivi en temps réel"]} />}
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
