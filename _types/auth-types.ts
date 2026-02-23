export interface AuthUser {
  uid: string;
  email?: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  refreshUser: () => Promise<void>;
  clearUser: () => void;
}
