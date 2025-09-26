import React, { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

const BUCKET = "transporteur_docs"; // nom exact du bucket

export default function OnboardingTransporteur() {
  const [form, setForm] = useState({
    pseudo: "",
    vehicle_type: "",
    license_plate: "",
    capacity_kg: "",
    capacity_m3: "",
    permis: null,
    assurance: null,
    carte_grise: null,
    casier: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 1024 * 1024) {
        setErrorMsg("⚠️ Le fichier doit être inférieur à 1 Mo.");
        return;
      }
      if (file.type !== "application/pdf") {
        setErrorMsg("⚠️ Seuls les fichiers PDF sont acceptés.");
        return;
      }

      setForm((s) => ({ ...s, [e.target.name]: file }));
    } else {
      setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    }
  };

  const uploadAndGetPublicUrl = async (userId, file, kind) => {
    if (!file) return null;
    const filePath = `${userId}/${kind}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    return urlData?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess("");

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Utilisateur non authentifié");
      const userId = user.id;

      // ✅ Upload fichiers
      const permisUrl = await uploadAndGetPublicUrl(userId, form.permis, "permis");
      const assuranceUrl = await uploadAndGetPublicUrl(userId, form.assurance, "assurance");
      const carteGriseUrl = await uploadAndGetPublicUrl(userId, form.carte_grise, "carte_grise");
      const casierUrl = await uploadAndGetPublicUrl(userId, form.casier, "casier");

      // ✅ Insertion / mise à jour
      const { error: insertError } = await supabase.from("transporteurs").upsert([
        {
          id: userId,
          pseudo: form.pseudo,
          vehicle_type: form.vehicle_type || null,
          license_plate: form.license_plate || null,
          capacity_kg: form.capacity_kg ? parseFloat(form.capacity_kg) : null,
          capacity_m3: form.capacity_m3 ? parseFloat(form.capacity_m3) : null,
          is_available: true,
          rating: 5.0,
          total_deliveries: 0,
          permis_url: permisUrl,
          assurance_url: assuranceUrl,
          carte_grise_url: carteGriseUrl,
          casier_url: casierUrl,
        },
      ]);

      if (insertError) throw insertError;

      setSuccess("✅ Onboarding réussi 🎉 Bienvenue !");
      setTimeout(() => navigate("/DriverDashboard"), 1500);
    } catch (err) {
      console.error("❌ Erreur OnboardingTransporteur:", err);
      setErrorMsg(err.message || "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    form.pseudo &&
    form.vehicle_type &&
    form.license_plate &&
    form.capacity_kg &&
    form.capacity_m3 &&
    form.permis &&
    form.assurance &&
    form.carte_grise &&
    form.casier;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Transporteur – Infos & Documents
        </h1>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="pseudo"
            placeholder="Pseudo"
            value={form.pseudo}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <select
            name="vehicle_type"
            value={form.vehicle_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Choisir un véhicule --</option>
            <optgroup label="🚐 Utilitaires légers">
              <option value="pickup">Pickup</option>
              <option value="fourgon">Fourgon</option>
            </optgroup>
            <optgroup label="🚛 Camions lourds">
              <option value="camion_3.5t">Camion 3.5T</option>
              <option value="camion_5t">Camion 5T</option>
            </optgroup>
          </select>

          <input
            type="text"
            name="license_plate"
            placeholder="Numéro d'immatriculation"
            value={form.license_plate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="number"
            name="capacity_kg"
            placeholder="Capacité en kg"
            value={form.capacity_kg}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="number"
            name="capacity_m3"
            placeholder="Capacité en m³"
            value={form.capacity_m3}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <label className="block font-medium">📄 Permis (PDF, max 1 Mo)</label>
          <input type="file" name="permis" accept="application/pdf" onChange={handleChange} required />

          <label className="block font-medium">📄 Assurance (PDF, max 1 Mo)</label>
          <input type="file" name="assurance" accept="application/pdf" onChange={handleChange} required />

          <label className="block font-medium">📄 Carte grise (PDF, max 1 Mo)</label>
          <input type="file" name="carte_grise" accept="application/pdf" onChange={handleChange} required />

          <label className="block font-medium">📄 Casier judiciaire (PDF, max 1 Mo)</label>
          <input type="file" name="casier" accept="application/pdf" onChange={handleChange} required />

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Continuer"}
          </button>
        </form>
      </div>
    </div>
  );
}
