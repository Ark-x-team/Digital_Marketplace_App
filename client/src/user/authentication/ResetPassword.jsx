import { Input, Button, Textarea, Tooltip } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";

function UserResetPassword() {
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const resetPasswordForm = (
    <>
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
          to="/user/login"
          color="primary"
          variant="flat"
          startContent={<ArrowBackRoundedIcon />}
          className="capitalize grow"
        >
          back to login
        </Button>
      </div>
    </>
  );
  const successMessage = (
    <div className="flex flex-col items-center gap-2 md:gap-4 lg:gap-6">
      <Textarea
        readOnly
        color="success"
        defaultValue="Your password has been updated successfully"
        startContent={<DoneRoundedIcon className="mr-4" />}
        className="max-w-xs "
      />
      <Button
        as={Link}
        to="/user/login"
        color="primary"
        variant="solid"
        startContent={<ArrowBackRoundedIcon />}
        className="capitalize w-fit"
      >
        back to login
      </Button>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="h-screen main-container px-3 flex w-full justify-center items-center">
        <div className="flex flex-col gap-5 text-center max-w-md md:w-2/4">
          <h1 className="font-title capitalize text-3xl lg:text-4xl text-primary dark:text-white dark:lg:text-primary ">
            update password
          </h1>
          <p className="dark:text-light max-w-md mb-6 md:mb-8 lg:mb-10">
            Please enter the email address you&apos;d like your password reset
            information sent to
          </p>
          {passwordUpdated ? successMessage : resetPasswordForm}
        </div>
      </div>
    </>
  );
}
export default UserResetPassword;
