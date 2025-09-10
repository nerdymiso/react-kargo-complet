// src/pages/NewOrder.jsx
import { useState } from "react";

function NewOrder() {
  const [order, setOrder] = useState({
    type: "",
    weight: "",
    volume: "",
    packaging: "",
    vehicle: "",
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvelle commande:", order);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nouvelle Commande</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-xl p-6">
        <input
          type="text"
          name="type"
          value={order.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Type de marchandise"
        />
        <input
          type="text"
          name="weight"
          value={order.weight}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Poids (kg)"
        />
        <input
          type="text"
          name="volume"
          value={order.volume}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Volume (m³)"
        />
        <input
          type="text"
          name="packaging"
          value={order.packaging}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Conditionnement"
        />
        <select
          name="vehicle"
          value={order.vehicle}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Choisir un véhicule</option>
          <option value="van">Camionnette</option>
          <option value="truck">Camion</option>
          <option value="pickup">Pickup</option>
        </select>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Créer la commande
        </button>
      </form>
    </div>
  );
}

export default NewOrder;
