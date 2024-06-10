import { StateCreator } from "zustand"

export type PersonSlice = {
    firstName: string
    lastName: string
    setFirstName: (firstName: string) => void
    setLastName: (lastName: string) => void
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
    firstName: '',
    lastName: '',
    setFirstName: (firstName) => ({firstName}),
    setLastName: (lastName) => ({lastName})
})