// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      // 1️⃣ Créer user dans Auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;
      const user = data.user;

      // 2️⃣ Ajouter user dans la table "users"
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user.id,
          full_name: `${form.firstName} ${form.lastName}`,
          email: form.email,
        },
      ]);

      if (insertError) throw insertError;

      // 3️⃣ Redirection vers l’onboarding (choix du rôle)
      navigate("/onboarding/role");
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
        <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>

        {errorMsg && (
          <p className="text-red-500 text-center mb-4">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
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
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
