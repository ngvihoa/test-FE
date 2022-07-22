import create from 'zustand';
import { persist } from 'zustand/middleware';
type AuthStateType = {
    user: {
        accessToken: string;
    } | null;
    loginUser: (accessToken: string) => void;
    logoutUser: () => void;
};

const useAuthStore = create(
    persist<AuthStateType>(
        (set, get) => ({
            user: null,
            loginUser: (accessToken) => set({ user: { accessToken } }),
            logoutUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
            getStorage: () => {
                return localStorage;
            },
        },
    ),
);

export default useAuthStore;