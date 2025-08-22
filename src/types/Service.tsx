export type Service = {
  id: string;
  title: string;
  categoryName?: string;
  description?: string;
  imageUrl?: string;
  status?: number;
  categoryId?: string;
  // Add other fields as needed
};

export type UpdateServicePayload = {
  id: string;
  updatedData: Partial<Omit<Service, "id">>;
};
