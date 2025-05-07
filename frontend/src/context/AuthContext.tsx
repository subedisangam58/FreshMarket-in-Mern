"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    name: string;
    role: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    refreshUser: () => void;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/users/check-auth", {
                credentials: "include",
            });
            const data = await res.json();
            setUser(data.success ? data.user : null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
        window.addEventListener("focus", checkAuth);
        return () => window.removeEventListener("focus", checkAuth);
    }, []);

    const logout = async () => {
        await fetch("http://localhost:8000/api/users/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, refreshUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
