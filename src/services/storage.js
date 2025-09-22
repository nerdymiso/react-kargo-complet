// src/services/storage.js
import { supabase } from "./supabase"; // adjust path if needed

// Upload file
export async function uploadTransporteurDoc(file) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("User not logged in");

  const filePath = `${user.id}/${file.name}`;

  const { data, error } = await supabase.storage
    .from("transporteur_docs")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;
  return filePath;
}

// List user files
export async function listUserDocs() {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return [];

  const { data, error } = await supabase.storage
    .from("transporteur_docs")
    .list(user.id);

  if (error) throw error;
  return data;
}

// Get public URL
export function getFileUrl(path) {
  const { data } = supabase.storage
    .from("transporteur_docs")
    .getPublicUrl(path);
  return data.publicUrl;
}
