import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useMutationRequest } from '../hooks/useMutationRequest';
import { toast } from 'react-toastify';
import { IUser } from '../models/interfaces/IUser';
import { useNavigate } from 'react-router-dom';
import { useLsState } from 'react-reactive-storage';

const LOCAL_STORAGE_USER_KEY = import.meta.env.LOCAL_STORAGE_USER_KEY || 'auth_user';

interface AuthContextType {
  user: IUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  
  const [user, setUser] = useLsState<IUser | null>(LOCAL_STORAGE_USER_KEY, null);

  const signInMutation = useMutationRequest<{ data: IUser }>('/auth/signin', 'POST', {
    onSuccess: (response) => {
      setUser(response.data);
      toast.success('Signed in successfully!');
    },
    onError: (error: unknown) => {
      setUser(null);
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    },
  });

  const signUpMutation = useMutationRequest<IUser>('/auth/signup', 'POST', {
    onSuccess: () => {
      toast.success('Account created successfully!');
      navigate('/signin');
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    },
  });

  const signOutMutation = useMutationRequest('/auth/signout', 'POST', {
    onSuccess: () => {
      setUser(null);
      toast.success('Signed out successfully!');
    },
  });

  const signIn = useCallback(async (email: string, password: string) => {
    await signInMutation.mutateAsync({ email, password });
  }, [signInMutation]);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    await signUpMutation.mutateAsync({ name, email, password });
  }, [signUpMutation]);

  const signOut = useCallback(async () => {
    await signOutMutation.mutateAsync({});
  }, [signOutMutation]);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
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