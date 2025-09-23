import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function useUserRole() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Cherche dans la table profiles
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setRole(data.role);
        }
      }
      setLoading(false);
    }

    fetchRole();
  }, []);

  return { role, loading };
}
