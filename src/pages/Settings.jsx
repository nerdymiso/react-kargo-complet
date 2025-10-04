// src/pages/Settings.jsx
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Settings as SettingsIcon } from "lucide-react";
import { supabase } from "../services/supabase";

function Settings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (newPassword.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas.");
      }

      // 1️⃣ Vérifier que l’utilisateur est connecté
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Aucun utilisateur connecté.");

      // 2️⃣ Réauthentifier avec l’ancien mot de passe
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });
      if (signInError) throw new Error("Mot de passe actuel incorrect.");

      // 3️⃣ Mettre à jour avec le nouveau mot de passe
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) throw updateError;

      setMessage("✅ Mot de passe mis à jour avec succès.");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("❌ Erreur update password:", err.message);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-orange-500" />
          Paramètres du Compte
        </h1>

        <form
          onSubmit={handleSave}
          className="space-y-4 bg-white p-6 shadow-lg rounded-xl"
        >
          {message && (
            <p
              className={`text-sm ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Mot de passe actuel"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Nouveau mot de passe"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Confirmer le nouveau mot de passe"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
