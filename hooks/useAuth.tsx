import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import axios from "@/lib/axios.config";
import { useToast } from "react-native-toast-notifications";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  initialLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    let isMounted = true;

    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser && isMounted) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.log("Failed to load user from AsyncStorage:", err);
      } finally {
        if (isMounted) {
          setInitialLoading(false);
        }
      }
    };

    loadUserFromStorage();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get("/users", {
        params: {
          username: username.toLowerCase().trim(),
        },
      });

      const foundUser = data.find((user: User) =>
        user.username?.toLowerCase().trim() === username.toLowerCase().trim()
      );

      if (!foundUser) {
        const errorMessage = "Invalid username or password";
        setError(errorMessage);
        toast.show(errorMessage, { type: "error" });
        return; // Exit early instead of throwing
      }

      if (foundUser.password !== password) {
        const errorMessage = "Invalid email or password";
        setError(errorMessage);
        toast.show(errorMessage, { type: "error" });
        return; // Exit early instead of throwing
      }

      // Success case - credentials are valid
      const { password: _, ...userWithoutPassword } = foundUser;

      setUser(userWithoutPassword);
      await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));

      toast.show("Login Successful", { type: "success" });
      router.replace("/(root)/(tabs)/expenses");

    } catch (err: any) {
      // This catch block now only handles network/server errors
      let message = "Login failed";

      if (err.response?.status === 404) {
        message = "Invalid email or password";
      } else if (err.response?.status >= 500) {
        message = "Server error. Please try again later.";
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
      toast.show(message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user");

      toast.show("Logout Successful", { type: "success" });
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.log("Logout error:", err);
      router.replace("/(auth)/sign-in");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, error, initialLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}