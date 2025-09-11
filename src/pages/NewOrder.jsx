// src/pages/NewOrder.jsx
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function NewOrder() {
  const [form, setForm] = useState({
    description: "",
    volume: "",
    poids: "",
    conditionnement: "",
    vehicle: "",
    pickup: "",
    delivery: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvelle commande créée:", form);
    alert("Commande créée avec succès 🚚");
  };

  return (
    <DashboardLayout>
      <div className="p-14">
        <h1 className="text-2xl font-bold mb-6">📦 Créer une nouvelle commande</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 shadow-lg rounded-xl max-w-2xl"
        >
          {/* Description de la marchandise */}
          <input
            type="text"
            name="description"
            placeholder="Description de la marchandise"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Volume et poids */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="volume"
              placeholder="Volume (m³)"
              value={form.volume}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              name="poids"
              placeholder="Poids (kg)"
              value={form.poids}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Conditionnement */}
          <select
            name="conditionnement"
            value={form.conditionnement}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Type de conditionnement --</option>
            <option value="palette">Palette</option>
            <option value="cartons">Cartons</option>
            <option value="vrac">Vrac</option>
            <option value="conteneur">Conteneur</option>
            <option value="sacs">Sacs</option>
          </select>

          {/* Choix du véhicule */}
          <select
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Choisir un véhicule --</option>

            {/* Utilitaires légers */}
            <optgroup label="🚐 Utilitaires légers">
              <option value="harbin_ridelles">Harbin ridelles</option>
              <option value="harbin_maraicher">Harbin maraîcher</option>
              <option value="harbin_conteneur">Harbin conteneur</option>
              <option value="harbin_frigorifique">Harbin frigorifique</option>
              <option value="fourgonnette">Fourgonnette</option>
              <option value="pickup">Pickup</option>
              <option value="pickup_maraicher">Pickup maraîcher</option>
            </optgroup>

            {/* Camions légers et moyens */}
            <optgroup label="🚚 Camions légers & moyens">
              <option value="petit_fourgon">Petit fourgon</option>
              <option value="fourgon_2p">Fourgon 2 panneaux</option>
              <option value="fourgon_3p">Fourgon 3 panneaux</option>
              <option value="fourgon_chassis_long">
                Fourgon châssis long jumelé
              </option>

              <option value="camion_2.5t_ridelles">Camion 2.5T ridelles</option>
              <option value="camion_2.5t_maraicher">Camion 2.5T maraîcher</option>
              <option value="camion_2.5t_conteneur">Camion 2.5T conteneur</option>
              <option value="camion_2.5t_frigorifique">
                Camion 2.5T frigorifique
              </option>

              <option value="camion_3.5t_ridelles">Camion 3.5T ridelles</option>
              <option value="camion_3.5t_maraicher">Camion 3.5T maraîcher</option>
              <option value="camion_3.5t_conteneur">Camion 3.5T conteneur</option>
              <option value="camion_3.5t_frigorifique">
                Camion 3.5T frigorifique
              </option>
            </optgroup>

            {/* Camions lourds */}
            <optgroup label="🚛 Camions lourds (≥ 5T)">
              <option value="camion_5t_ridelles">Camion 5T ridelles</option>
              <option value="camion_5t_maraicher">Camion 5T maraîcher</option>
              <option value="camion_5t_conteneur">Camion 5T conteneur</option>
              <option value="camion_5t_frigorifique">Camion 5T frigorifique</option>

              <option value="camion_lourd_ridelles">Camion lourd ridelles</option>
              <option value="camion_lourd_maraicher">Camion lourd maraîcher</option>
              <option value="camion_lourd_conteneur">Camion lourd conteneur</option>
              <option value="camion_lourd_frigorifique">
                Camion lourd frigorifique
              </option>
            </optgroup>
          </select>

          {/* Adresse départ / arrivée */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="pickup"
              placeholder="Adresse de départ"
              value={form.pickup}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="delivery"
              placeholder="Adresse de livraison"
              value={form.delivery}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Créer la commande
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default NewOrder;
