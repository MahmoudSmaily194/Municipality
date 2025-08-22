import { create } from "zustand";
import type { Service } from "../types/Service";

interface ServiceUIStore {
  selectedService: Service | null;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;

  selectService: (service: Service) => void;
  clearSelectedService: () => void;

  openEditModal: () => void;
  closeEditModal: () => void;

  openDeleteModal: () => void;
  closeDeleteModal: () => void;
}

export const useServiceUIStore = create<ServiceUIStore>((set) => ({
  selectedService: null,
  isEditModalOpen: false,
  isDeleteModalOpen: false,

  selectService: (service) => set({ selectedService: service }),
  clearSelectedService: () => set({ selectedService: null }),

  openEditModal: () => set({ isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false }),

  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
}));
