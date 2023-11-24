import { Input, Button, Textarea } from "@nextui-org/react";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import customerAuthStore from "../../../store/authentication/Customer";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    login,
    loggedIn,
    loginError,
    loginForm,
    updateLoginForm,
    loginValidation,
  } = customerAuthStore();

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login();
      if (customerAuthStore.getState().loggedIn) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loginErrorMessage = (
    <Textarea readOnly color="danger" maxRows={1} placeholder={loginError} />
  );
  const loginComponent = (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-5 lg:w-10/12 xl:w-8/12"
    >
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
        to="/reset-password-verify"
        className="capitalize text-primary hover:brightness-125 duration-500 w-fit"
      >
        forgot password ?
      </Link>
      {loginError && loginErrorMessage}
      <div className="mt-2 flex flex-col lg:flex-row-reverse gap-4">
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
        <Button
          as={Link}
          to="/sign-up"
          color="primary"
          variant="flat"
          endContent={<PersonAddRoundedIcon />}
          className="capitalize grow"
        >
          sign up
        </Button>
      </div>
    </form>
  );
  const coverImage =
    "https://images.pexels.com/photos/4048595/pexels-photo-4048595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <div
      className="h-screen relative after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0 
    "
    >
      <div className="h-full w-full relative after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
        <img
          style={{ filter: "grayscale(30%)" }}
          src={coverImage}
          alt="login cover image"
          className="absolute h-full w-full object-cover lg:object-center"
        />
        <div className="relative main-container px-3 pt-56 flex w-full justify-center">
          <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto lg:mr-auto lg:ml-0 z-10">
            <h1 className="font-title capitalize text-4xl lg:text-5xl text-primary  dark:text-white dark:lg:text-primary text-center lg:text-start mb-8 md:mb-10 lg:mb-12">
              welcome back
            </h1>
            {loginComponent}
          </div>
        </div>
      </div>
    </div>
  );
}
