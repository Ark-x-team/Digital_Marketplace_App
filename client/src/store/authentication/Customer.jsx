import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const customerAuthStore = create((set) => ({
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
  emailError: false,

  validation: (name, value) => {
    const usernameRegex = /^[a-zA-Z]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
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
    const {
      signUpForm: { username, email },
      validation,
      checkSignupFormErrors,
    } = customerAuthStore.getState();
    set({
      signUpForm: {
        username,
        email,
        password: generatedPassword,
      },
    });
    validation("password", generatedPassword);
    checkSignupFormErrors();
  },

  // ********************************** Login **********************************
  // ? Login form validation
  loginForm: {
    email: "",
    password: "",
  },
  loginValidation: false,
  loginError: "",
  loggedIn: null,

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

  // ? Login
  login: async () => {
    try {
      const { loginForm } = customerAuthStore.getState();
      const res = await axios.post(
        "http://localhost:8080/customers/login",
        loginForm,
        { withCredentials: true }
      );
      set({
        loggedIn: true,
        loginError: false,
        loginValidation: false,
        loginForm: {
          email: "",
          password: "",
        },
      });
      const { loggedIn, loginError } = customerAuthStore.getState();
      console.log(res.data, loggedIn);
    } catch (error) {
      set({ loginError: error.response.data.message });
    }
  },
}));

export default customerAuthStore;
