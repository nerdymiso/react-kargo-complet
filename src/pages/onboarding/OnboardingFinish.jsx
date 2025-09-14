// src/pages/onboarding/Finish.jsx
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function OnboardingFinish() {
  const navigate = useNavigate();

  const handleGoDashboard = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (data.role === "client") navigate("/dashboard/client");
    else if (data.role === "expediteur") navigate("/dashboard/client"); // tu peux changer vers un dashboard dédié
    else if (data.role === "transporteur") navigate("/dashboard/driver");
    else navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Bienvenue 🎉</h1>
      <p className="text-gray-600 mb-6">Votre compte est maintenant prêt !</p>
      <button
        onClick={handleGoDashboard}
        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
      >
        Accéder à mon tableau de bord
      </button>
    </div>
  );
}

export default OnboardingFinish;
