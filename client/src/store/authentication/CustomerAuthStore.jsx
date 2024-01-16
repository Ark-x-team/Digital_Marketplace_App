import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const customerAuthStore = create((set) => ({
  // ********************************** Recaptcha **********************************
  recaptchaValue: null,
  setRecaptchaValue: (value) => set({ recaptchaValue: value }),

  // ********************************** Sign up **********************************
  // ? Sign up form validation

  signUpForm: {
    username: "",
    email: "",
    password: "",
  },
  usernameValidation: {
    state: true,
    message: "",
  },
  emailValidation: {
    state: true,
    message: "",
  },
  passwordValidation: {
    state: true,
    message: "",
  },
  signUpValidation: false,
  signUpError: false,
  signUpSuccess: false,

  validation: (name, value) => {
    const usernameRegex = /^[a-zA-Z]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    const {
      resetPasswordForm: { password },
    } = customerAuthStore.getState();
    switch (name) {
      case "username":
        usernameRegex.test(value) || value == ""
          ? set({
              usernameValidation: {
                state: true,
                message: "",
              },
            })
          : set({
              usernameValidation: {
                state: false,
                message: "Your username must contain at least 8 letters.",
              },
            });
        break;
      case "email":
        emailRegex.test(value) || value == ""
          ? set({
              emailValidation: {
                state: true,
                message: "",
              },
            })
          : set({
              emailValidation: {
                state: false,
                message: "Your email is invalid.",
              },
            });
        break;
      case "password":
        passwordRegex.test(value) || value == ""
          ? set({
              passwordValidation: {
                state: true,
                message: "",
              },
            })
          : set({
              passwordValidation: {
                state: false,
                message: "your password is not strong enough",
              },
            });
        break;
      case "confirmPassword":
        value == password || value == ""
          ? set({
              confirmPasswordValidation: {
                state: true,
                message: "",
              },
            })
          : set({
              confirmPasswordValidation: {
                state: false,
                message:
                  "The confirmation password does not match the original password",
              },
            });
        break;
    }
  },

  checkSignupFormErrors: () => {
    const {
      usernameValidation,
      emailValidation,
      passwordValidation,
      signUpForm: { username, email, password },
    } = customerAuthStore.getState();
    set({
      signUpValidation:
        usernameValidation.state &&
        emailValidation.state &&
        passwordValidation.state &&
        username !== "" &&
        email !== "" &&
        password !== "",
    });
  },
  updateSignUpForm: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        signUpForm: {
          ...state.signUpForm,
          [name]: value,
        },
      };
    });
    const { validation, checkSignupFormErrors } = customerAuthStore.getState();
    validation(name, value);
    checkSignupFormErrors();
  },

  // ? Sign up
  generatePassword: async () => {
    const passwordGeneratorApi = "https://www.dinopass.com/password/strong";
    const res = await fetch(passwordGeneratorApi);
    const generatedPassword = await res.text();
    const { signUpForm, validation, checkSignupFormErrors } =
      customerAuthStore.getState();
    set({
      signUpForm: {
        ...signUpForm,
        password: generatedPassword,
      },
    });
    validation("password", generatedPassword);
    checkSignupFormErrors();
  },
  signUp: async () => {
    try {
      const {
        signUpForm: { username, email, password },
        recaptchaValue,
      } = customerAuthStore.getState();
      const res = await axios.post(
        "/customers/signup",
        { username, email, password, recaptchaValue },
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );
      set({
        signUpSuccess: res.data.message,
        signUpError: false,
        signUpValidation: false,
        signUpForm: {
          username: "",
          email: "",
          password: "",
        },
      });
    } catch (error) {
      if (error.response) {
        set({ signUpError: error.response.data.message });
      } else
        set({
          signUpError: `Bad network, Please check your internet connection`,
        });
      return Promise.reject(error);
    }
  },

  AccountVerification: async () => {
    try {
      const { setLoggedIn } = customerAuthStore.getState();
      // Get the token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      await axios.post(
        `/customers/email-verification?token=${token}`,
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );
      Cookies.set("token", token, { expires: 1 });
      setLoggedIn(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },
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
    } = customerAuthStore.getState();
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
    const { checkLoginErrors } = customerAuthStore.getState();
    checkLoginErrors();
  },

  // ? OAuth google
  googleLoggedIn: false,
  googleLogin: async (credentialResponse) => {
    try {
      const { setLoggedIn } = customerAuthStore.getState();
      const credential = credentialResponse.credential;
      const response = await axios.post(
        "/customers/google-login",
        { credential },
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response.headers["access_token"];
      Cookies.set("token", accessToken, { expires: 7 });
      setLoggedIn(true);
      set({ googleLoggedIn: true });
    } catch (error) {
      const { setLoggedIn } = customerAuthStore.getState();
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

  // ? Login
  loggedIn: Cookies.get("token") || null,
  setLoggedIn: (isLogin) => {
    set({
      loggedIn: isLogin,
    });
  },
  login: async () => {
    const { recaptchaValue } = customerAuthStore.getState();
    try {
      const {
        loginForm: { email, password },
        setLoggedIn,
      } = customerAuthStore.getState();
      const response = await axios.post(
        "/customers/login",
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
      Cookies.set("token", accessToken, { expires: 7 });
      setLoggedIn(true);
      set({
        loginError: false,
        loginValidation: false,
        loginForm: {
          email: "",
          password: "",
        },
      });
    } catch (error) {
      const { setLoggedIn } = customerAuthStore.getState();
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
      const { setLoggedIn } = customerAuthStore.getState();
      await axios.get("/customers/logout", {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      });
      Cookies.remove("token");
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
    const { verificationEmail } = customerAuthStore.getState();
    set({ verificationEmailValidation: verificationEmail !== "" });
  },
  updateVerificationEmail: (e) => {
    const { value } = e.target;
    set({ verificationEmail: value });
    const { checkVerificationEmailValidation } = customerAuthStore.getState();
    checkVerificationEmailValidation();
  },
  resetPasswordVerification: async () => {
    try {
      const { verificationEmail } = customerAuthStore.getState();
      await axios.post(
        "/customers/reset-password-verification",
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
    } = customerAuthStore.getState();
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
    const { validation, checkResetPasswordErrors } =
      customerAuthStore.getState();
    validation(name, value);
    checkResetPasswordErrors();
  },
  resetPassword: async () => {
    try {
      // Get the token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      const { resetPasswordForm } = customerAuthStore.getState();
      await axios.post(
        `/customers/reset-password?token=${token}`,
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

  // ******************************* Check auth *******************************
  customer: "",
  customerId: "",
  checkAuth: async () => {
    try {
      const response = await axios.get(
        "/customers/check-auth",
        {
          headers: {
            "content-type": "application/json",
            Authorization: Cookies.get("token"),
          },
          withCredentials: true,
        }
      );
      set({
        customer: response.data.customer,
        customerId: response.data.customer._id,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
}));

export default customerAuthStore;
