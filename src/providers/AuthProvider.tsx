import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

type LocalAccount = { id: string; fullName: string; email: string; password: string };
export type LocalSession = { user: { id: string; email: string } };

type AuthContextValue = {
  session: LocalSession | null;
  profile: LocalAccount | null;
  loading: boolean;
  savedIds: string[];
  register: (fullName: string, email: string, password: string) => string | null;
  signIn: (email: string, password: string) => string | null;
  signOut: () => void;
  toggleSaved: (sessionId: string) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [account, setAccount] = useState<LocalAccount | null>(null);
  const [session, setSession] = useState<LocalSession | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    profile: account,
    loading: false,
    savedIds,
    register: (fullName, email, password) => {
      const nextAccount = { id: String(Date.now()), fullName, email, password };
      setAccount(nextAccount);
      setSession(null);
      return null;
    },
    signIn: (email, password) => {
      if (!account || account.email !== email || account.password !== password) return 'El correo o la contraseña no coinciden.';
      setSession({ user: { id: account.id, email: account.email } });
      return null;
    },
    signOut: () => setSession(null),
    toggleSaved: (sessionId) => setSavedIds((current) => current.includes(sessionId) ? current.filter((id) => id !== sessionId) : [...current, sessionId]),
  }), [account, savedIds, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider.');
  return context;
}
