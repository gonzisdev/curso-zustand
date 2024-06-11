import { StateCreator } from "zustand"
import { create } from "zustand"
import type { AuthStatus, User } from "../../types"
import { AuthService } from "../../services/auth.service"
import { devtools, persist } from "zustand/middleware"

export type AuthState = {
    status: AuthStatus
    token?: string
    user?: User
    loginUser: (email: string, password: string) => Promise<void>
    checkAuthStatus: () => Promise<void>
    logoutUser: () => void
}

const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'pending',
    token: undefined,
    user: undefined,
    loginUser: async (email, password) => {
        try {
            const { token, ...user } = await AuthService.login(email, password)
            set({status: 'authorized', token, user})
        } catch (error) {
            set({status: 'unauthorized', token: undefined, user: undefined})
            throw 'Unauthorized'
        }
    },
    checkAuthStatus: async () => {
        try {
            const { token, ...user } = await AuthService.checkStatus()
            set({status: 'authorized', token, user})
        } catch (error) {
            set({status: 'unauthorized', token: undefined, user: undefined})
        }
    },
    logoutUser: () => {
        set({token: undefined, user: undefined, status: 'unauthorized'})
    }
})

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi, {name: 'auth-storage'}
        )
    )
)
