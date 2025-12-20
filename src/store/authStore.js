import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("adminToken"),
  isAuthenticated: !!localStorage.getItem("adminToken"),

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("adminToken", res.data.token);
    set({ token: res.data.token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("adminToken");
    set({ token: null, isAuthenticated: false });
  }
}));

export default useAuthStore;
