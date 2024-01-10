import Navbar from "../../components/navbar/Navbar";
import { Input, Button, Progress, Textarea } from "@nextui-org/react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import userAuthStore from "../../store/authentication/UserAuthStore";

function UserLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);

  const {
    login,
    loginForm,
    updateLoginForm,
    loginValidation,
    loginError,
    setRecaptchaValue,
    accessToken,
  } = userAuthStore();

  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const captchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    setRecaptchaValue(captchaToken);

    setLoading(true);

    try {
      await login();
      const { role } = userAuthStore.getState();
      navigate(`/${role}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const errorMessage = (
    <Textarea readOnly color="danger" minRows={1} placeholder={loginError} />
  );

  return (
    <>
      {loading ? (
        <Progress
          style={{ zIndex: "9999" }}
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="absolute top-0 left-0 w-full"
        />
      ) : (
        ""
      )}
      <Navbar />
      <div className="h-screen main-container px-3 flex w-full justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 w-full max-w-md md:w-2/4"
        >
          <h1 className="font-title capitalize text-center text-3xl lg:text-4xl text-primary  dark:text-white dark:lg:text-primary mb-6 md:mb-8 lg:mb-10">
            Login{" "}
          </h1>

          <Input
            name="email"
            value={loginForm.email}
            onChange={updateLoginForm}
            type="email"
            placeholder="Email"
            startContent={
              <EmailRoundedIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />

          <Input
            name="password"
            value={loginForm.password}
            onChange={updateLoginForm}
            type={isVisible ? "text" : "password"}
            placeholder="Password"
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
          <Link
            to="/user/reset-password-verify"
            className="capitalize text-primary hover:brightness-125 duration-500 w-fit"
          >
            forgot password ?
          </Link>
          {loginError && errorMessage}
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_SITE_KEY}
            size="invisible"
            ref={recaptchaRef}
          />
          <Button
            type="submit"
            isDisabled={!loginValidation}
            color="primary"
            variant="solid"
            endContent={<LoginRoundedIcon />}
            className="capitalize grow"
          >
            login
          </Button>
        </form>
      </div>
    </>
  );
}
export default UserLogin;
