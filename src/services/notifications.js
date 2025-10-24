import { supabase } from "./supabase";

/**
 * ✅ Créer une notification
 * @param {Object} data - Données de la notification
 * @param {string} data.user_id - ID de l'utilisateur concerné
 * @param {string} data.title - Titre de la notif
 * @param {string} [data.message] - Message complémentaire
 * @param {string} [data.type] - 'info', 'warning', 'success', 'error'
 * @param {string} [data.related_shipment_id] - Optionnel
 * @param {string} [data.related_transporter_id] - Optionnel
 * @param {string} [data.related_party_id] - Optionnel
 */
export async function createNotification(data) {
  const { error } = await supabase.from("notifications").insert([data]);
  if (error) {
    console.error("❌ Erreur lors de la création de la notification:", error.message);
    throw error;
  }
  console.log("✅ Notification enregistrée:", data.title);
}
