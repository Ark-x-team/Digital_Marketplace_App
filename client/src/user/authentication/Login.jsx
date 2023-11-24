import { Input, Button } from "@nextui-org/react";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../useless/navbar/Navbar";

export default function UserLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Navbar />
      <div className="h-screen main-container px-3 flex w-full justify-center items-center">
        <div className="flex flex-col gap-5 w-full max-w-md md:w-2/4">
          <h1 className="font-title capitalize text-center text-3xl lg:text-4xl text-primary  dark:text-white dark:lg:text-primary mb-6 md:mb-8 lg:mb-10">
            login
          </h1>
          <Input
            type="email"
            placeholder="Email"
            startContent={
              <EmailRoundedIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />

          <Input
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

          <Button
            color="primary"
            variant="solid"
            endContent={<LoginRoundedIcon />}
            className="capitalize grow"
          >
            login
          </Button>
        </div>
      </div>
    </>
  );
}
