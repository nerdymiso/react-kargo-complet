// src/pages/NewOrder.jsx
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { supabase } from "../services/supabase";
import { UserContext } from "../hooks/UserProvider";

function NewOrder() {
  const { user } = UserContext();

  const [form, setForm] = useState({
    description: "",
    volume: "",
    poids: "",
    conditionnement: "",
    vehicle: "",
    pickup: "",
    delivery: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Insérer la commande
      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            client_id: user.id,
            description: form.description,
            volume: form.volume,
            poids: form.poids,
            conditionnement: form.conditionnement,
            vehicle: form.vehicle,
            pickup: form.pickup,
            delivery: form.delivery,
            status: "en_attente",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2️⃣ Créer une notification
      const { error: notifError } = await supabase.from("notifications").insert([
        {
          user_id: user.id,
          type: "commande",
          message: `Nouvelle commande créée : ${form.description}`,
          related_order: newOrder.id,
        },
      ]);

      if (notifError) throw notifError;

      alert("🚚 Commande créée avec succès !");
      setForm({
        description: "",
        volume: "",
        poids: "",
        conditionnement: "",
        vehicle: "",
        pickup: "",
        delivery: "",
      });
    } catch (err) {
      console.error("❌ Erreur lors de la création :", err.message);
      alert("Erreur lors de la création de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-14">
        <h1 className="text-2xl font-bold mb-6">
          📦 Créer une nouvelle commande
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 shadow-lg rounded-xl max-w-2xl"
        >
          <input
            type="text"
            name="description"
            placeholder="Description de la marchandise"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

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

          <select
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Choisir un véhicule --</option>
            <optgroup label="🚐 Utilitaires légers">
              <option value="harbin_ridelles">Harbin ridelles</option>
              <option value="fourgonnette">Fourgonnette</option>
              <option value="pickup">Pickup</option>
            </optgroup>
            <optgroup label="🚚 Camions légers & moyens">
              <option value="fourgon">Fourgon</option>
              <option value="camion_2.5t">Camion 2.5T</option>
            </optgroup>
            <optgroup label="🚛 Camions lourds">
              <option value="camion_5t">Camion 5T</option>
              <option value="camion_lourd">Camion lourd</option>
            </optgroup>
          </select>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Création en cours..." : "Créer la commande"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default NewOrder;
