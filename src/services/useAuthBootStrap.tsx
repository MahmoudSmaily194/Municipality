import { useEffect, useRef } from "react";
import axiosInstance from "./axiosInstance"; // Your axios instance with 401 interceptor
import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Use ReturnType<typeof setTimeout> for browser compatibility
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

type JwtPayload = {
  exp: number; // expiration timestamp in seconds
  [key: string]: any; // allow extra claims
};

const scheduleTokenRefresh = (accessToken: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);
    if (!decoded?.exp) return;

    const expiryTime = decoded.exp * 1000; // convert to ms
    const now = Date.now();

    // Refresh 1 minute before expiry
    const refreshTime = expiryTime - now - 60 * 1000;

    if (refreshTimeout) clearTimeout(refreshTimeout);
    if (refreshTime <= 0) return;

    refreshTimeout = setTimeout(async () => {
      // Only refresh if tab is active
      if (document.visibilityState === "visible") {
        try {
          console.log("🔄 Auto refreshing token before expiry");
          const res = await axiosInstance.post("/Auth/refresh-token", null, {
            withCredentials: true,
          });

          const { accessToken } = res.data;

          // Update Zustand store with fresh user info + token
          useAuthStore.getState().login(
            {
              name: res.data.fullName,
              role: res.data.role,
              email: res.data.email,
              profilePhoto: res.data.profilePhoto,
            },
            accessToken
          );

          // Reschedule next refresh
          scheduleTokenRefresh(accessToken);
        } catch (err) {
          console.warn("❌ Auto refresh failed, logging out", err);
          useAuthStore.getState().logout();
        }
      }
    }, refreshTime);
  } catch (err) {
    console.error("❌ Failed to decode JWT", err);
  }
};

export const useAuthBootstrap = () => {
  const login = useAuthStore((state) => state.login);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const user = useAuthStore((state) => state.user);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    if (user) {
      // If user already in store, reschedule auto-refresh
      if (useAuthStore.getState().accessToken) {
        scheduleTokenRefresh(useAuthStore.getState().accessToken!);
      }
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
          withCredentials: true,
        });

        const { accessToken } = res.data;

        login(
          {
            name: res.data.fullName,
            role: res.data.role,
            email: res.data.email,
            profilePhoto: res.data.profilePhoto,
          },
          accessToken
        );

        // Schedule auto-refresh for new token
        scheduleTokenRefresh(accessToken);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("🚫 Request cancelled");
        } else if (error.name === "CanceledError") {
          console.log("🚫 Request aborted");
          useAuthStore.getState().logout();
        } else {
          console.warn("🔐 Refresh token failed:", error);
          useAuthStore.getState().logout();
        }
      } finally {
        setInitialized();
        initializedRef.current = true;
      }
    };

    refresh();

    return () => {
      controller.abort();
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, [login, setInitialized, user]);
};
