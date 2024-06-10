import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { GuestSlice, createGuestSlice } from "./guest.slice";
import { devtools } from "zustand/middleware";

type ShareState = PersonSlice & GuestSlice

export const useWeddingBoundStore = create<ShareState>()(
    devtools(
        (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a)
        })
    )
)