import React, { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function OnboardingRole() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSelectRole = async (role) => {
    setLoading(true);
    setErrorMsg("");

    try {
      // Récupérer le user connecté
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setErrorMsg("Utilisateur introuvable.");
        setLoading(false);
        return;
      }

      // Mettre à jour le rôle
      const { error: updateError } = await supabase
        .from("users")
        .update({ role })
        .eq("id", user.id);

      if (updateError) {
        setErrorMsg(updateError.message);
        setLoading(false);
        return;
      }

      // Redirection selon rôle
      if (role === "expediteur") {
        navigate("/onboarding/profil");
      } else if (role === "transporteur") {
        navigate("/onboarding/finish");
      } else {
        navigate("/dashboard/client");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-bold mb-6">Choisis ton rôle</h1>

      {errorMsg && (
        <p className="text-red-500 mb-4 text-center">{errorMsg}</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => handleSelectRole("expediteur")}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Expéditeur
        </button>
        <button
          onClick={() => handleSelectRole("transporteur")}
          disabled={loading}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Transporteur
        </button>
        <button
          onClick={() => handleSelectRole("client")}
          disabled={loading}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Client
        </button>
      </div>
    </div>
  );
}
