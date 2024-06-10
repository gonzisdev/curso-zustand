import { StateCreator } from "zustand"

export type GuestSlice = {
    guestCount: number
    setGuestCount: (guestCount: number) => void
}

export const createGuestSlice: StateCreator<GuestSlice> = ((set) => ({
    guestCount: 0,
    setGuestCount: (guestCount) => (set((state) => ({
        guestCount: guestCount > 0 ? guestCount : 0
    })))
}))