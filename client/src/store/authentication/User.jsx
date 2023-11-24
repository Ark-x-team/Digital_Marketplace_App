import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const userAuthStore = create((set) => ({
  // ********************************** Login **********************************
  // ? Login form validation
  loginForm: {
    email: "",
    password: "",
  },
  loginValidation: false,

  checkLoginErrors: () => {
    const {
      loginForm: { email, password },
    } = userAuthStore.getState();
    set({
      loginValidation: email !== "" && password !== "",
    });
  },
  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
    const { checkLoginErrors } = userAuthStore.getState();
    checkLoginErrors();
  },

  // ? Login
  login: async () => {
    try {
      const {
        loginForm: { loginEmail, loginPassword },
      } = userAuthStore.getState();
      const loginData = {
        email: loginEmail,
        password: loginPassword,
      };
      const res = await axios.post("/login", loginData, {
        withCredentials: true,
      });
      console.log(res);
      set({
        loginForm: {
          loginEmail: "",
          loginPassword: "",
        },
        loggedIn: true,
        loginError: false,
      });
    } catch (error) {
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
        ? set({ loginError: true })
        : set({ loginError: false });
    }
    sessionStorage.removeItem("loginEmail");
    sessionStorage.removeItem("loginPassword");
  },
}));

export default userAuthStore;
