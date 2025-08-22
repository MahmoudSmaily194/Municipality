import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance"; // <- use this!
import { useAuthStore } from "../stores/useAuthStore";
import { isAxiosError } from "axios";

interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  role: "Admin" | "User";
  fullName: string;
  email: string;
  profilePhoto: string;
}

const AuthService = () => {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const res = await axiosInstance.post<LoginResponse>(
        "/Auth/login", // relative path
        credentials
      );
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      login(
        {
          name: data.fullName,
          role: data.role,
          email: data.email,
          profilePhoto: data.profilePhoto,
        },
        data.accessToken
      );
    },
  });
};

export default AuthService;

export const updateProfilePhoto = async (formData: FormData): Promise<void> => {
  try {
    const res = await axiosInstance.put("/Auth/update_profile_photo", formData);
    return res.data;
  } catch (err) {
    console.error("geterror: delete complaint err", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const useUpdateProfilePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
