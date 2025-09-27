import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // fetch from your "users" table
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error) {
          setUser(data);
        }
      }
      setLoading(false);
    };

    getUser();

    // listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) setUser(null);
        else getUser();
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ FIX: expose logout
  const logout = async () => {
    await supabase.auth.signOut(); // destroy session in Supabase
    setUser(null); // clear user from context
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
