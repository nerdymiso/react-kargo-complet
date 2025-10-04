import React, { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

const BUCKET = "transporteur_docs";

export default function OnboardingTransporteur() {
  const [form, setForm] = useState({
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
        return setErrorMsg("⚠️ Le fichier doit être inférieur à 1 Mo.");
      }
      if (file.type !== "application/pdf") {
        return setErrorMsg("⚠️ Seuls les fichiers PDF sont acceptés.");
      }

      setForm((prev) => ({ ...prev, [e.target.name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const uploadAndGetPublicUrl = async (userId, file, kind) => {
    if (!file) return null;
    const filePath = `${userId}/${kind}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    return data?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess("");
    setLoading(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Utilisateur non authentifié");
      const userId = user.id;

      // Upload docs
      const [permisUrl, assuranceUrl, carteGriseUrl, casierUrl] = await Promise.all([
        uploadAndGetPublicUrl(userId, form.permis, "permis"),
        uploadAndGetPublicUrl(userId, form.assurance, "assurance"),
        uploadAndGetPublicUrl(userId, form.carte_grise, "carte_grise"),
        uploadAndGetPublicUrl(userId, form.casier, "casier"),
      ]);

      // Insert/Upsert
      const { error: insertError } = await supabase.from("transporteurs").upsert([
        {
          id: userId,
          vehicle_type: form.vehicle_type,
          license_plate: form.license_plate,
          capacity_kg: parseFloat(form.capacity_kg),
          capacity_m3: parseFloat(form.capacity_m3),
          permis_url: permisUrl,
          assurance_url: assuranceUrl,
          carte_grise_url: carteGriseUrl,
          casier_url: casierUrl,
          is_available: true, // can remove if default set in DB
          rating: 5.0,        // idem
          total_deliveries: 0 // idem
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
          <select
            name="vehicle_type"
            value={form.vehicle_type}
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
