import React, { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function OnboardingTransporteur() {
  const [form, setForm] = useState({
    vehicle_type: "",
    license_plate: "",
    capacity_kg: "",
    capacity_m3: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw new Error("Utilisateur non trouvé");

      const { error: insertError } = await supabase.from("transporteurs").insert([
        {
          id: user.id,
          vehicle_type: form.vehicle_type, // ✅ corrigé
          license_plate: form.license_plate || null,
          capacity_kg: form.capacity_kg ? parseFloat(form.capacity_kg) : null,
          capacity_m3: form.capacity_m3 ? parseFloat(form.capacity_m3) : null,
          is_available: true,
          rating: 5.0,
          total_deliveries: 0,
        },
      ]);

      if (insertError) throw insertError;

      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Erreur OnboardingTransporteur:", err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Transporteur – Infos Véhicule
        </h1>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="vehicle_type" // ✅ corrigé
            value={form.vehicle_type} // ✅ corrigé
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

          <input
            type="text"
            name="license_plate"
            placeholder="Numéro d'immatriculation"
            value={form.license_plate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="capacity_kg"
            placeholder="Capacité en kg"
            value={form.capacity_kg}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="capacity_m3"
            placeholder="Capacité en m³"
            value={form.capacity_m3}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            {loading ? "Enregistrement..." : "Continuer"}
          </button>
        </form>
      </div>
    </div>
  );
}
