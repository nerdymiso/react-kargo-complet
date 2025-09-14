// src/pages/onboarding/Profile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function OnboardingProfil() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: "", address: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("users")
      .update({ phone: form.phone, address: form.address })
      .eq("id", user.id);

    navigate("/onboarding/finish");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-6">Complétez votre profil</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            Continuer
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnboardingProfil;
