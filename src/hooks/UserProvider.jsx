import { createContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase";

// Création du contexte
const UserContext = createContext(null);

// Provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupération user au montage
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          // Cherche le profil associé
          const { data: dbUser } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authUser.id)
            .single();

          setUser(dbUser || authUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("❌ Erreur récupération utilisateur:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Écoute des changements d’état auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setUser(null);
      else getUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Déconnexion
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// Export aussi le contexte brut si jamais tu veux l'utiliser ailleurs
export { UserContext };
