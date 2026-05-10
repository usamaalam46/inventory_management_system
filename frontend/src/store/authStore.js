import { create } from "zustand";

const useAuthStore = create((set) => ({

  user:
    JSON.parse(
      localStorage.getItem("user")
    ) || null,

  token:
    localStorage.getItem("token") || null,

  // LOGIN
  login: (token, user) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    set({
      token,
      user,
    });
  },

  // LOGOUT
  logout: () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    set({
      token: null,
      user: null,
    });
  },
}));

export default useAuthStore;