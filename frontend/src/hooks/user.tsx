import { getUser } from "@/api/auth";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { PortfolioData } from "./portfolio";
import { toast } from "sonner";
import api from "@/api";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  portfolios: Partial<
    PortfolioData & { selectedTemplate: string; _id: string }
  >[];
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    console.log("getting user");

    setLoading(true);
    setError(null);
    try {
      const data = await getUser();
      console.log("fetched user", { user: data });
      setUser(data);
    } catch (err: any) {
      console.log({ err });
      setError(err.message);
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);
  const handleLogout = async () => {
    try {
      // Clear localStorage or context state if used
      console.log(localStorage.getItem("token"));
      await api.post("/auth/signout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        refetchUser: fetchUser,
        setUser,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
