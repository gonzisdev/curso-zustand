import { type StateCreator, create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { customSessionStorage } from "../storages/session-storage.storage"

type PersonState = {
    firstName: string
    lastName: string
    setFirstName: (value: string) => void
    setLastName: (value: string) => void
}

const storeAPI: StateCreator<PersonState> = (set) => ({
    firstName: '',
    lastName: '',
    setFirstName: (value) => (set({
        firstName: value
    })),
    setLastName: (value) => (set({
        lastName: value
    }))
})

export const usePersonStore = create<PersonState>()(
    devtools(
        persist(
            storeAPI, { name: 'person-storage', storage: customSessionStorage}
        )
    ) 
)