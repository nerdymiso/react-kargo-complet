// src/pages/onboarding/OnboardingRole.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function OnboardingRole() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRoleSelect = async (role) => {
    setLoading(true);
    setErrorMsg("");

    try {
      // 1️⃣ Récupérer l'utilisateur connecté
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Utilisateur non trouvé");

      // 2️⃣ Mettre à jour son rôle dans la table users
      const { error: updateError } = await supabase
        .from("users")
        .update({ role })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // 3️⃣ Rediriger selon le rôle
      if (role === "expediteur") {
        navigate("/onboarding/expediteur");
      } else if (role === "transporteur") {
        navigate("/onboarding/transporteur");
      } else {
        navigate("/dashboard/client");
      }
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
        <h1 className="text-2xl font-bold text-center mb-6">
          Choisissez votre rôle
        </h1>

        {errorMsg && (
          <p className="text-red-500 text-center mb-4">{errorMsg}</p>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelect("client")}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Je suis un Client
          </button>
          <button
            onClick={() => handleRoleSelect("expediteur")}
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Je suis un Expéditeur
          </button>
          <button
            onClick={() => handleRoleSelect("transporteur")}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Je suis un Transporteur
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingRole;
