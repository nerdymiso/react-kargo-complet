import React, { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function OnboardingExpediteur() {
  const [form, setForm] = useState({
    goods_type: "",
    description: "",
    volume: "",
    vehicle_type_needed: "",
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

      const { error: insertError } = await supabase.from("expediteurs").insert([
        {
          id: user.id,
          goods_type: form.goods_type,
          description: form.description,
          volume: form.volume,
          vehicle_type_needed: form.vehicle_type_needed,
        },
      ]);

      if (insertError) throw insertError;

      navigate("/dashboard"); // à changer selon ta logique
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Expéditeur – Infos</h1>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="goods_type"
            placeholder="Type de marchandise (ex: meubles, légumes)"
            value={form.goods_type}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="volume"
            placeholder="Volume (ex: 20m³, 2 tonnes)"
            value={form.volume}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="vehicle_type_needed"
            placeholder="Type de véhicule requis (camion, pick-up...)"
            value={form.vehicle_type_needed}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Enregistrement..." : "Continuer"}
          </button>
        </form>
      </div>
    </div>
  );
}
