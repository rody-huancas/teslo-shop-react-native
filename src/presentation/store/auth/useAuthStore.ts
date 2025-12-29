import { create } from 'zustand';
import { User } from '../../../domain/entities/user';
import { authLogin } from '../../../actions/auth/auth';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { StorageAdapter } from '../../../config/adapters/storage-adapter';

export interface AuthState {
  status : AuthStatus;
  token ?: string;
  user  ?: User;

  login: (email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token : undefined,
  user  : undefined,
  login : async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    if (!resp) {
      set({ status: 'unauthenticated', user: undefined, token: undefined });
      return false;
    }

    // TODO: guardar en el token en el storage

    await StorageAdapter.setItem('token', resp.token);

    const storeToken = await StorageAdapter.getItem('token');

    console.log(storeToken)

    set({ status: 'authenticated', token: resp.token, user: resp.user });

    return true;
  },
}));
