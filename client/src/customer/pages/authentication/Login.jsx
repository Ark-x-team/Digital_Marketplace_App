// Importing necessary components and libraries
import { useState, useRef } from "react";
import { Input, Button, Textarea, Progress } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import customerAuthStore from "../../../store/authentication/CustomerAuthStore";

// Login component
function Login() {
  // State variables
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Destructuring values from the authentication store
  const {
    login,
    loginError,
    loginForm,
    updateLoginForm,
    loginValidation,
    setRecaptchaValue,
    googleLogin,
  } = customerAuthStore();

  // React Router navigation
  const navigate = useNavigate();

  // Reference for ReCAPTCHA
  const recaptchaRef = useRef(null);

  // Toggle password visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Execute ReCAPTCHA and reset it
    const captchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    setRecaptchaValue(captchaToken);

    // Set loading to true during login attempt
    setLoading(true);

    try {
      // Attempt login
      await login();
      setLoading(false);
      // Redirect upon successful login
      navigate("/");
    } catch (error) {
      // Handle login error
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    try {
      await googleLogin(credentialResponse);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  // Translation hook
  const { t } = useTranslation();

  // Error message component
  const errorMessage = (
    <Textarea readOnly color="danger" minRows={1} placeholder={loginError} />
  );

  // Login form JSX
  const loginInputs = (
    <form onSubmit={handleLogin} className="flex flex-col gap-5 lg:w-1/2">
      {/* Email input */}
      <Input
        name="email"
        value={loginForm.email}
        onChange={updateLoginForm}
        type="email"
        placeholder="email"
        startContent={
          <EmailRoundedIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      {/* Password input */}
      <Input
        name="password"
        value={loginForm.password}
        onChange={updateLoginForm}
        type={isVisible ? "text" : "password"}
        placeholder={t("password")}
        startContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <VisibilityRoundedIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <VisibilityOffRoundedIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      {/* Forgot password link */}
      <Link
        to="/reset-password-verify"
        className="capitalize text-primary hover:brightness-125 duration-500 w-fit"
      >
        {t("forgot password ?")}
      </Link>
      {/* Display error message if there is one */}
      {loginError && errorMessage}
      {/* ReCAPTCHA */}
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_SITE_KEY}
        size="invisible"
        ref={recaptchaRef}
      />
      {/* Google login button */}
      <span className="rounded-full w-fit overflow-hidden">
        <GoogleLogin
          style={{ marginTop: "100px" }}
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
          text="signin_with"
          theme="filled_blue"
          size="large"
          shape="pill"
          width="100%"
          containerProps={{
            style: {
              width: "100% !important",
            },
          }}
        />
      </span>
      {/* Submit and sign up buttons */}
      <div className="mt-2 flex flex-col lg:flex-row-reverse gap-4">
        {/* Login button */}
        <Button
          type="submit"
          isDisabled={!loginValidation}
          color="primary"
          variant="solid"
          endContent={<LoginRoundedIcon />}
          className="capitalize grow"
        >
          {t("login")}
        </Button>
        {/* Sign up button */}
        <Button
          as={Link}
          to="/sign-up"
          color="primary"
          variant="flat"
          endContent={<PersonAddRoundedIcon />}
          className="capitalize grow"
        >
          {t("sign up")}
        </Button>
      </div>
    </form>
  );

  // Cover image URL
  const coverImage =
    "https://images.pexels.com/photos/4048595/pexels-photo-4048595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  // Render the Login component
  return (
    <>
      {loading ? (
        <Progress
          style={{ zIndex: "9999" }}
          size="sm"
          isIndeterminate
          aria-label="loading"
          className="absolute top-0 left-0 w-full"
        />
      ) : (
        ""
      )}
      <div
        className="h-screen relative after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0
      "
      >
        <div className="h-full w-full relative after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
          <LazyLoadImage
            style={{ filter: "grayscale(30%)" }}
            src={coverImage}
            alt="login cover image"
            loading="lazy"
            className="absolute h-full w-full object-cover lg:object-center"
          />
          <div className="relative main-container px-3 pt-48 flex w-full justify-center">
            <div className="w-11/12 md:w-8/12 mx-auto lg:mr-auto lg:ml-0 z-10">
              <h1 className="font-title capitalize text-4xl lg:text-5xl text-primary  dark:text-white dark:lg:text-primary text-center lg:text-start mb-8 md:mb-10 lg:mb-12">
                {t("welcome back")}
              </h1>
              {loginInputs}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
