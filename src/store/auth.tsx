import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type UserProfile = {
  id: string;
  email: string;
  password: string;
  displayName: string;
  phone: string;
  stylePreference: string;
  avatarInitials: string;
  createdAt: string;
};

type SignupInput = {
  email: string;
  password: string;
  displayName: string;
  phone: string;
  stylePreference: string;
};

type AuthContextValue = {
  user: UserProfile | null;
  users: UserProfile[];
  isAuthenticated: boolean;
  signup: (input: SignupInput) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function initials(name: string, email: string) {
  const source = name.trim() || email.split("@")[0] || "Z";
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  const user = useMemo(
    () => users.find((u) => u.email.toLowerCase() === sessionEmail?.toLowerCase()) ?? null,
    [users, sessionEmail],
  );

  const signup = useCallback<AuthContextValue["signup"]>(async (input) => {
    const email = input.email.trim().toLowerCase();
    if (!email || !email.includes("@")) throw new Error("Enter a valid email address.");
    if (!input.password.trim()) throw new Error("Password is required.");
    if (!input.displayName.trim()) throw new Error("Display name is required.");
    setUsers((prev) => {
      if (prev.some((u) => u.email.toLowerCase() === email)) {
        throw new Error("This email is already signed up. Please log in.");
      }
      const profile: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        password: input.password,
        displayName: input.displayName.trim(),
        phone: input.phone.trim(),
        stylePreference: input.stylePreference,
        avatarInitials: initials(input.displayName, email),
        createdAt: new Date().toISOString(),
      };
      return [...prev, profile];
    });
    setSessionEmail(email);
  }, []);

  const login = useCallback<AuthContextValue["login"]>(async (emailInput, passwordInput) => {
    const email = emailInput.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === email);
    if (!found) throw new Error("No account found. Please sign up first.");
    if (found.password !== passwordInput) throw new Error("Incorrect password for this account.");
    setSessionEmail(found.email);
  }, [users]);

  const logout = useCallback(() => {
    setSessionEmail(null);
  }, []);

  const value: AuthContextValue = {
    user,
    users,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
