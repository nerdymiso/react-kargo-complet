// src/pages/onboarding/OnboardingTransporteur.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function OnboardingTransporteur() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    vehicle_type: "",
    license_plate: "",
    capacity_kg: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("transporteurs").insert([
      {
        id: user.id,
        vehicle_type: form.vehicle_type,
        license_plate: form.license_plate,
        capacity_kg: form.capacity_kg,
      },
    ]);

    navigate("/onboarding/finish");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-6">Infos Transporteur</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="vehicle_type"
            placeholder="Type de véhicule"
            value={form.vehicle_type}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="license_plate"
            placeholder="Immatriculation"
            value={form.license_plate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="number"
            name="capacity_kg"
            placeholder="Capacité en Kg"
            value={form.capacity_kg}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Continuer
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnboardingTransporteur;
