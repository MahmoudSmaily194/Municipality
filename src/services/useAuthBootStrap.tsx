import { useEffect, useRef } from "react";
import axiosInstance from "./axiosInstance"; // Your axios instance
import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";

export const useAuthBootstrap = () => {
  // Avoid re-reading store state on every render — get stable callbacks
  const login = useAuthStore((state) => state.login);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const user = useAuthStore((state) => state.user);

  // Ref to ensure effect runs only once (on mount)
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    // If user already exists, just mark initialized
    if (user) {
      setInitialized();
      initializedRef.current = true;
      return;
    }

    const controller = new AbortController();

    const refresh = async () => {
      try {
        console.log("🔄 Refreshing token after reload");
        const res = await axiosInstance.post("/Auth/refresh-token", null, {
          signal: controller.signal,
        });

        // Call login with user data and new access token
        login(
          {
            name: res.data.fullName,
            role: res.data.role,
            email: res.data.email,
            profilePhoto: res.data.profilePhoto,
          },
          res.data.accessToken
        );
        console.log(res.data.profilePhoto);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("🚫 Request cancelled");
        } else if (error.name === "CanceledError") {
          // New axios uses CanceledError class for aborts
          useAuthStore.getState().logout();
          console.log("🚫 Request aborted");
        } else {
          console.warn("🔐 Refresh token failed:", error);
        }
      } finally {
        setInitialized();
        initializedRef.current = true;
      }
    };

    refresh();

    // Cleanup: abort request if component unmounts before request finishes
    return () => {
      controller.abort();
    };
  }, [login, setInitialized, user]);
};
