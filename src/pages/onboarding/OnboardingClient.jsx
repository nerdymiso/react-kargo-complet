import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function OnboardingClient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pseudo: "",
    company_name: "",
    address: "",
    payment_method: "",
    nif: "",
    rc: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("Utilisateur non authentifié");

      const { error: insertError } = await supabase.from("clients").upsert([
        {
          id: user.id,
          pseudo: formData.pseudo,
          company_name: formData.company_name,
          address: formData.address,
          payment_method: formData.payment_method,
          nif: formData.nif,
          rc: formData.rc,
        },
      ]);

      if (insertError) throw insertError;

      setSuccess("✅ Onboarding réussi 🎉 Bienvenue !");
      setTimeout(() => navigate("/ClientDashboard"), 1500);
    } catch (err) {
      console.error("❌ Onboarding error:", err.message);
      setError(err.message || "Impossible de compléter l’onboarding. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.pseudo &&
    formData.company_name &&
    formData.address &&
    formData.payment_method &&
    formData.nif &&
    formData.rc;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-xl font-semibold mb-6 text-center">
          Onboarding Entreprise
        </h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mb-4 text-center">{success}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ex: speedyDZ"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Nom de l’entreprise</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ex: TransCo"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Adresse</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ex: Alger, Hydra"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Méthode de paiement</label>
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Sélectionner</option>
            <option value="cash">Espèces</option>
            <option value="bank_transfer">Virement bancaire</option>
            <option value="cheque">Chèque</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">NIF</label>
          <input
            type="text"
            name="nif"
            value={formData.nif}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ex: 1234567890"
          />
          <label className="block mb-1 font-medium mt-4">RC</label>
          <input
            type="text"
            name="rc"
            value={formData.rc}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-2"
            placeholder="Ex: 12-34-567890"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Valider"}
        </button>
      </form>
    </div>
  );
}
