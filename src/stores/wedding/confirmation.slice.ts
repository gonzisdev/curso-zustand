import { StateCreator } from 'zustand';

export type ConfirmationSlice = {
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (set) => ({
  isConfirmed: false,
  setIsConfirmed: (value: boolean) => set({ isConfirmed: value })
})