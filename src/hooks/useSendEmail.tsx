import type { ContactFormType } from "../types/ContactFormType";
import { SendEmail } from "../services/ContactService";
import { useMutation } from "@tanstack/react-query";

export const useSendEmail = () => {
  return useMutation<void, Error, ContactFormType>({
    mutationFn: SendEmail,
  });
};
