// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("✅ Utilisateur connecté:", data.user);

      // récupère le rôle depuis la table users
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;

      // Redirection selon rôle
      if (profile.role === "expediteur") {
        navigate("ClientDashboard");
      } else if (profile.role === "transporteur") {
        navigate("/DriverDashboard");
      } else {
        navigate("/ClientDashboard");
      }
    } catch (err) {
      console.error("❌ Login error:", err.message);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Pas encore de compte ?{" "}
          <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
            S’inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
