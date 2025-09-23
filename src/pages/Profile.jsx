// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { User as UserIcon, Lock } from "lucide-react";
import { supabase } from "../services/supabase";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState("");

  // Charger les infos du user connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError) throw authError;

        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("prenom, nom, email, phone, pseudo")
            .eq("id", user.id)
            .single();

          if (profileError) throw profileError;

          setUser({
            prenom: profile.prenom || "",
            nom: profile.nom || "",
            email: profile.email || user.email,
            phone: profile.phone || "",
            pseudo: profile.pseudo || "",
          });
        }
      } catch (err) {
        console.error("❌ Erreur récupération profil:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Débloquer édition après vérification du mot de passe
  const handleUnlock = async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        alert("Utilisateur non connecté.");
        return;
      }

      // Vérification du mot de passe
      const { error } = await supabase.auth.signInWithPassword({
        email: authUser.email,
        password,
      });

      if (error) {
        alert("Mot de passe incorrect !");
        return;
      }

      setEditing(true);
      setPassword("");
    } catch (err) {
      console.error("❌ Erreur vérification mot de passe:", err.message);
    }
  };

  // Gestion des inputs
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Sauvegarde en base
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("users")
        .update({
          prenom: user.prenom,
          nom: user.nom,
          phone: user.phone,
          email: user.email,
          pseudo: user.pseudo,
        })
        .eq("id", authUser.id);

      if (error) throw error;

      console.log("✅ Profil mis à jour:", user);
      alert("Profil mis à jour avec succès !");
      setEditing(false);
    } catch (err) {
      console.error("❌ Erreur mise à jour:", err.message);
      alert("Erreur lors de la mise à jour du profil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-orange-500" /> Mon Profil
        </h1>

        {/* Bloc de sécurité */}
        {!editing && (
          <div className="bg-white shadow-md p-4 mb-6 rounded-lg">
            <h2 className="font-semibold mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-600" /> Vérification requise
            </h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-3"
              placeholder="Mot de passe actuel"
            />
            <button
              onClick={handleUnlock}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Déverrouiller l’édition
            </button>
          </div>
        )}

        {/* Formulaire profil */}
        <form
          onSubmit={handleSave}
          className="space-y-4 bg-white p-6 shadow-lg rounded-xl"
        >
          <input
            type="text"
            name="pseudo"
            value={user.pseudo}
            onChange={handleChange}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Pseudo"
          />
          <input
            type="text"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Prénom"
          />
          <input
            type="text"
            name="nom"
            value={user.nom}
            onChange={handleChange}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Nom"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Email"
          />
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Téléphone"
          />
          {editing && (
            <button
              type="submit"
              disabled={saving}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
