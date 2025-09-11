// src/pages/Profile.jsx
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { User as UserIcon } from "lucide-react";


function Profile() {
  const [user, setUser] = useState({
    firstName: "Ahmed",
    lastName: "Benali",
    email: "ahmed@example.com",
    phone: "+213 555 555 555",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Profil mis à jour:", user);
  };

  return (
    <DashboardLayout>
     <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
         <UserIcon className="w-6 h-6 text-orange-500" /> Mon Profil</h1>
         <form onSubmit={handleSave} className="space-y-4 bg-white p-6 shadow-lg rounded-xl">
           <input
             type="text"
             name="firstName"
             value={user.firstName}
             onChange={handleChange}
             className="w-full px-4 py-2 border rounded-lg"
             placeholder="Prénom"
           /> 
          <input
           type="text"
           name="lastName"
           value={user.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Nom"
          />
          <input
            type="email"
            name="email"
           value={user.email}
           onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
           placeholder="Email"
          />
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Téléphone"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Sauvegarder
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
}

export default Profile;
