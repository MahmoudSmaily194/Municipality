// stores/DeleteDialogStore.ts
import { create } from "zustand";

type DeleteDialogStore = {
  isOpen: boolean;
  itemId: string | null;
  onConfirm: (() => void) | null;
  openDialog: (itemId: string, onConfirm: () => void) => void;
  closeDialog: () => void;
};

export const useDeleteDialogStore = create<DeleteDialogStore>((set) => ({
  isOpen: false,
  itemId: null,
  onConfirm: null,
  openDialog: (itemId, onConfirm) =>
    set({ isOpen: true, itemId, onConfirm }),
  closeDialog: () =>
    set({ isOpen: false, itemId: null, onConfirm: null }),
}));
