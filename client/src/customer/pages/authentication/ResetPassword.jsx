import { Input, Button, Textarea, Tooltip } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const resetPasswordForm = (
    <div className="flex flex-col gap-5 lg:w-10/12 xl:w-8/12">
      <Input
        type={isVisible ? "text" : "password"}
        placeholder="New Password"
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
        endContent={
          <Tooltip
            showArrow
            placement="top"
            content="Generate password"
            classNames={{
              base: ["before:bg-white dark:before:bg-dark "],
              content: [
                "py-2 px-4 shadow-xl capitalize",
                "text-black dark:text-white bg-gradient-to-r from-gray-50 dark:from-neutral-900 to-gray-200 dark:to-black",
              ],
            }}
          >
            <button
              className="focus:outline-none "
              type="button"
              // onClick={toggleVisibility}
            >
              <AutorenewRoundedIcon className="text-2xl text-default-400 pointer-events-none" />
            </button>
          </Tooltip>
        }
      />
      <Input
        type={isVisible ? "text" : "password"}
        placeholder="Confirm Password"
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
      <div className="mt-2 flex flex-col lg:flex-row-reverse gap-4">
        <Button
          color="primary"
          variant="solid"
          endContent={<ForwardToInboxRoundedIcon />}
          className="capitalize grow"
        >
          Get link
        </Button>
        <Button
          as={Link}
          to="/login"
          color="primary"
          variant="flat"
          startContent={<ArrowBackRoundedIcon />}
          className="capitalize grow"
        >
          back to login
        </Button>
      </div>
    </div>
  );
  const successMessage = (
    <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
      <Textarea
        readOnly
        color="success"
        defaultValue="Your password has been updated successfully"
        startContent={<DoneRoundedIcon className="mr-4" />}
        className="max-w-xs "
      />
      <Button
        as={Link}
        to="/login"
        color="primary"
        variant="solid"
        startContent={<ArrowBackRoundedIcon />}
        className="capitalize w-fit"
      >
        back to login
      </Button>
    </div>
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
              update password
            </h1>

            {passwordUpdated ? successMessage : resetPasswordForm}
          </div>
        </div>
      </div>
    </div>
  );
}
