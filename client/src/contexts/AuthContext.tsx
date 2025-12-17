import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';

type UserRole = 'gestor' | 'operacional';

interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isOperacional: boolean;
  isGestor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Recuperar sessão do localStorage ao carregar
    const storedUser = localStorage.getItem('sai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string) => {
    let role: UserRole = 'gestor';
    let name = 'Gestor';

    // Regra de negócio solicitada: email específico para operacional
    if (email.toLowerCase() === 'cardumecozinha@gmail.com') {
      role = 'operacional';
      name = 'Equipe Cozinha';
    } else if (email.toLowerCase() === 'cdm@cardumecozinha.com') {
      role = 'gestor';
      name = 'Gestor';
    }

    const newUser = { email, name, role };
    setUser(newUser);
    localStorage.setItem('sai_user', JSON.stringify(newUser));
    setLocation('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sai_user');
    setLocation('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isOperacional: user?.role === 'operacional',
      isGestor: user?.role === 'gestor'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
