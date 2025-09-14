// src/pages/onboarding/OnboardingExpediteur.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function OnboardingExpediteur() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ company_name: "", siret: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("expediteurs").insert([
      {
        id: user.id,
        company_name: form.company_name,
        siret: form.siret,
      },
    ]);

    navigate("/onboarding/finish");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-6">Infos Expéditeur</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="company_name"
            placeholder="Nom de l’entreprise"
            value={form.company_name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="siret"
            placeholder="Numéro SIRET"
            value={form.siret}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Continuer
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnboardingExpediteur;
