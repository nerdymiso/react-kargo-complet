// src/pages/NewOrder.jsx
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function NewOrder() {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    vehicle: "",
    description: "",
    weight: "",
    date: "",
  });

  const vehicles = [
    { category: "Utilitaires légers", options: ["Moto", "Scooter cargo", "Triporteur"] },
    { category: "Véhicules légers", options: ["Voiture", "Pick-up"] },
    { category: "Camions moyens", options: ["Fourgon", "Camion benne", "Camion frigorifique"] },
    { category: "Camions lourds", options: ["Semi-remorque", "Porte-conteneurs"] },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvelle commande :", formData);
    alert("Commande créée avec succès !");
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Créer une Nouvelle Commande</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 shadow-lg rounded-xl"
        >
          <input
            type="text"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Lieu de départ"
            required
          />
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Lieu de destination"
            required
          />

          {/* Select véhicules */}
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Choisir un véhicule --</option>
            {vehicles.map((group, index) => (
              <optgroup key={index} label={group.category}>
                {group.options.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {/* Poids */}
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Poids (kg)"
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Description de la marchandise"
          />

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Créer la commande
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default NewOrder;
