// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pseudo: "",
    prenom: "",
    nom: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // 1️⃣ Créer l'utilisateur dans Auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: `${form.prenom} ${form.nom}`,
            role: form.role,
            pseudo: form.pseudo,
          },
        },
      });

      if (error) throw error;
      const user = data?.user;
      if (!user) throw new Error("Impossible de créer le compte utilisateur.");

      // 2️⃣ Enregistrer les infos dans la table "users"
      const { error: upsertError } = await supabase.from("users").upsert([
        {
          id: user.id,
          email: form.email,
          phone: form.phone,
          nom: form.nom,
          prenom: form.prenom,
          pseudo: form.pseudo,
          role: form.role,
          address: form.address,
        },
      ]);

      if (upsertError) throw upsertError;

      // 3️⃣ Vérifier session active
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("✅ Session après signup:", sessionData);

      // 4️⃣ Redirection selon rôle choisi
      if (form.role === "expediteur") {
        navigate("/ClientDashboard");
      } else if (form.role === "transporteur") {
        navigate("/OnboardingTransporteur");
      } else {
        navigate("/OnboardingClient");
      }
    } catch (err) {
      console.error("❌ Signup error:", err.message);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="pseudo"
            placeholder="Pseudo"
            value={form.pseudo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={form.prenom}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Numéro de téléphone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Choisis ton rôle --</option>
            <option value="expediteur">Expéditeur</option>
            <option value="transporteur">Transporteur</option>
            <option value="entreprise">Entreprise</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Création..." : "S’inscrire"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Déjà inscrit ?{" "}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
