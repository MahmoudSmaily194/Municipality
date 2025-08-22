import { create } from "zustand";

type AlertDialogStore = {
  isOpen: boolean;
  actionText: string | null;
  setActionText: (text: string | null) => void;
  setIsOpen: (open: boolean) => void;
};

export const useAlertDialogStore = create<AlertDialogStore>((set) => ({
  isOpen: false,
  actionText: null,
  setActionText: (text) => set({ actionText: text }),
  setIsOpen: (open) => set({ isOpen: open }),
}));
