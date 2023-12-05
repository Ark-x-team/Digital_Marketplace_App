import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const userAuthStore = create((set) => ({
  // ********************************** Recaptcha **********************************
  recaptchaValue: null,
  setRecaptchaValue: (value) => set({ recaptchaValue: value }),

  // ********************************** Login **********************************
  // ? Login form validation
  loginForm: {
    email: "",
    password: "",
  },
  loginValidation: false,
  loginError: "",
  networkError: "",

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
  loggedIn: null,
  setLoggedIn: (isLogin) => {
    set({
      loggedIn: isLogin,
    });
  },
  role: null,
  login: async () => {
    const { recaptchaValue } = userAuthStore.getState();
    try {
      const {
        loginForm: { email, password },
        setLoggedIn,
      } = userAuthStore.getState();
      const response = await axios.post(
        "http://localhost:8081/users/login",
        {
          email,
          password,
          recaptchaValue,
        },
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response.headers["access_token"];
      setLoggedIn(accessToken);
      const refreshToken = response.headers["refresh_token"];
      Cookies.set("refresh_token", refreshToken, { expires: 30 });
      setLoggedIn(true);
      set({
        loginError: false,
        loginValidation: false,
        loginForm: {
          email: "",
          password: "",
        },
      });
      console.log(response.data.user.role);
    } catch (error) {
      console.log(error);
      const { setLoggedIn } = userAuthStore.getState();
      setLoggedIn(false);
      if (error.response) {
        set({ loginError: error.response.data.message });
      } else
        set({
          loginError: `Bad network, Please check your internet connection`,
        });
      return Promise.reject(error);
    }
  },

  // ********************************** Logout **********************************
  // ? Logout
  logout: async () => {
    try {
      const { setLoggedIn } = userAuthStore.getState();
      await axios.get("http://localhost:8081/customers/logout", {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      });
      setLoggedIn(false);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // ****************************** Reset password ******************************
  // ? Reset password verification
  verificationEmail: "",
  verificationEmailError: false,
  verificationEmailValidation: false,
  checkVerificationEmailValidation: () => {
    const { verificationEmail } = userAuthStore.getState();
    set({ verificationEmailValidation: verificationEmail !== "" });
  },
  updateVerificationEmail: (e) => {
    const { value } = e.target;
    set({ verificationEmail: value });
    const { checkVerificationEmailValidation } = userAuthStore.getState();
    checkVerificationEmailValidation();
  },
  resetPasswordVerification: async () => {
    try {
      const { verificationEmail } = userAuthStore.getState();
      await axios.post(
        "http://localhost:8081/customers/reset-password-verification",
        { email: verificationEmail },
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );
      set({ verificationEmail: "" });
    } catch (error) {
      if (error.response) {
        set({ verificationEmailError: error.response.data.message });
      } else
        set({
          loginError: `Bad network, Please check your internet connection`,
        });
      return Promise.reject(error);
    }
  },

  // ? Reset password
  resetPasswordForm: {
    password: "",
    confirmPassword: "",
  },
  confirmPasswordValidation: {
    state: true,
    message: "",
  },
  resetPasswordValidation: false,
  resetPasswordError: false,
  checkResetPasswordErrors: () => {
    const {
      passwordValidation,
      confirmPasswordValidation,
      resetPasswordForm: { password, confirmPassword },
    } = userAuthStore.getState();
    set({
      resetPasswordValidation:
        passwordValidation.state &&
        confirmPasswordValidation.state &&
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword,
    });
  },
  updateResetPasswordForm: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        resetPasswordForm: {
          ...state.resetPasswordForm,
          [name]: value,
        },
      };
    });
    const { validation, checkResetPasswordErrors } = userAuthStore.getState();
    validation(name, value);
    checkResetPasswordErrors();
  },
  resetPassword: async () => {
    try {
      // Get the token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      const { resetPasswordForm } = userAuthStore.getState();
      await axios.post(
        `http://localhost:8081/customers/reset-password?token=${token}`,
        { newPassword: resetPasswordForm.password },
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );
      set({
        resetPasswordForm: {
          password: "",
          confirmPassword: "",
        },
        confirmPasswordValidation: {
          state: true,
          message: "",
        },
        resetPasswordError: false,
        resetPasswordValidation: false,
      });
    } catch (error) {
      if (error.response) {
        set({ resetPasswordError: error.response.data.message });
      } else
        set({
          resetPasswordError: `Bad network, Please check your internet connection`,
        });
      return Promise.reject(error);
    }
  },
}));

export default userAuthStore;
