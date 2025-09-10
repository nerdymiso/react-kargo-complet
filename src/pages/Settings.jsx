// src/pages/Settings.jsx
import { useState } from "react";

function Settings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Mot de passe changé:", { password, newPassword });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Paramètres du Compte</h1>
      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 shadow-lg rounded-xl">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Mot de passe actuel"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Nouveau mot de passe"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

export default Settings;
