import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // supabase user object
  const [profile, setProfile] = useState(null); // row in "users" table
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserAndProfile() {
      setLoading(true);

      // get auth user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // get profile from your "users" table
        const { data, error } = await supabase
          .from("users")
          .select("*") // not just "role" → fetch all columns
          .eq("id", user.id)
          .single();

        if (!error) setProfile(data);
      }

      setLoading(false);
    }

    fetchUserAndProfile();

    // listen to auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUserAndProfile();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, loading, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}

// custom hook to use it anywhere
export function useUser() {
  return useContext(UserContext);
}
