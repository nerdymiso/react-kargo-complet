// src/pages/OnboardingTransporteur.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

const BUCKET = "transporteur_docs"; // <- mets exactement le nom du bucket ici

export default function OnboardingTransporteur() {
  const [form, setForm] = useState({
    vehicle_type: "",
    license_plate: "",
    capacity_kg: "",
    capacity_m3: "",
    permis: null,
    assurance: null,
    carte_grise: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // debug : check session when page loads
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("DEBUG session (on mount) :", sessionData);
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      console.log("DEBUG getUser (on mount) :", userData, userErr);
    })();
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file && file.size > 1024 * 1024) {
        setErrorMsg("⚠️ Le fichier doit être inférieur à 1 Mo.");
        return;
      }
      setForm((s) => ({ ...s, [e.target.name]: file }));
    } else {
      setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    }
  };

  const uploadAndGetPublicUrl = async (userId, file, kind) => {
    if (!file) return null;
    if (!userId) throw new Error("Missing userId for upload");
    if (file.type !== "application/pdf") throw new Error("Only PDF allowed");

    const filePath = `${userId}/${kind}_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    console.log("Uploading to", BUCKET, "->", filePath);

    // upload
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error raw:", uploadError);
      throw uploadError;
    }
    console.log("Upload data:", uploadData);

    // get public url (works even for private buckets but access may be blocked by policies)
    const { data: urlData, error: urlErr } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    if (urlErr) {
      console.warn("getPublicUrl err:", urlErr);
      // if you use private bucket and want temporary link, you can createSignedUrl here
    }
    console.log("Public URL data:", urlData);
    return urlData?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // check active session
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("DEBUG session (submit):", sessionData);
      if (!sessionData?.session) {
        throw new Error("Aucun utilisateur connecté. Connecte-toi d'abord (session manquante).");
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error("getUser error:", userError);
        throw new Error("Utilisateur introuvable (getUser returned null).");
      }
      const userId = userData.user.id;
      console.log("Uploading files for user:", userId);

      // upload each file (if présent) and get public URL
      let permisUrl = null,
        assuranceUrl = null,
        carteGriseUrl = null;

      if (form.permis) {
        permisUrl = await uploadAndGetPublicUrl(userId, form.permis, "permis");
        console.log("permisUrl =>", permisUrl);
      }
      if (form.assurance) {
        assuranceUrl = await uploadAndGetPublicUrl(userId, form.assurance, "assurance");
        console.log("assuranceUrl =>", assuranceUrl);
      }
      if (form.carte_grise) {
        carteGriseUrl = await uploadAndGetPublicUrl(userId, form.carte_grise, "carte_grise");
        console.log("carteGriseUrl =>", carteGriseUrl);
      }

      // insert transporteur record with URLs (id must match existing users.id)
      const { error: insertError } = await supabase.from("transporteurs").insert([
        {
          id: userId,
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
        },
      ]);

      if (insertError) {
        console.error("Insert transporteurs error:", insertError);
        throw insertError;
      }

      // success
      navigate("/DriverDashboard"); 
    } catch (err) {
      console.error("❌ Erreur OnboardingTransporteur:", err);
      setErrorMsg(err.message || "Erreur inattendue");

      // debug info: si StorageApiError bucket not found -> affiche nom bucket
      if (err?.message?.toLowerCase?.().includes("bucket not found")) {
        console.warn("Vérifie le bucket name dans le code et dans Supabase Storage:", BUCKET);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Transporteur – Infos & Documents</h1>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="vehicle_type" value={form.vehicle_type} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required>
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

          <input type="text" name="license_plate" placeholder="Numéro d'immatriculation" value={form.license_plate} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
          <input type="number" name="capacity_kg" placeholder="Capacité en kg" value={form.capacity_kg} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
          <input type="number" name="capacity_m3" placeholder="Capacité en m³" value={form.capacity_m3} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />

          <label className="block font-medium">📄 Permis (PDF, max 1 Mo)</label>
          <input type="file" name="permis" accept="application/pdf" onChange={handleChange} />
          <label className="block font-medium">📄 Assurance (PDF, max 1 Mo)</label>
          <input type="file" name="assurance" accept="application/pdf" onChange={handleChange} />
          <label className="block font-medium">📄 Carte grise (PDF, max 1 Mo)</label>
          <input type="file" name="carte_grise" accept="application/pdf" onChange={handleChange} />

          <button type="submit" disabled={loading} className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">
            {loading ? "Enregistrement..." : "Continuer"}
          </button>
        </form>
      </div>
    </div>
  );
}
