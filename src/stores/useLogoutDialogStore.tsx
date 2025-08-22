import { create } from "zustand";

type LogoutStoreType = {
  logoutDialog: boolean;
  setLogoutDialog: (l: boolean) => void;
    onConfirm: (() => void) | null;
  setOnConfirm: (callback: () => void) => void;
};

const useLogoutDialogStore = create<LogoutStoreType>((set) => ({
  logoutDialog: false,
  setLogoutDialog: (l) => set({ logoutDialog: l }),
   onConfirm: null,
  setOnConfirm: (callback) => set({ onConfirm: callback }),
}));

export default useLogoutDialogStore;
