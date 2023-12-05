import { Input, Button, Textarea } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

function UserResetPasswordVerify() {
  const [resetLink, setResetLink] = useState(false);

  const resetPasswordForm = (
    <>
      <Input
        type="email"
        placeholder="Email"
        startContent={
          <EmailRoundedIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
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
    <Textarea
      readOnly
      color="success"
      defaultValue="An email containing a link to reset your password has been sent to your email address. Please check your inbox"
      startContent={<MarkEmailReadRoundedIcon className="mr-2" />}
      className="max-w-xs mx-auto"
    />
  );
  return (
    <>
      <Navbar />
      <div className="h-screen main-container px-3 flex w-full justify-center items-center">
        <div className="flex flex-col gap-5 text-center max-w-md md:w-2/4">
          <h1 className="font-title capitalize text-3xl lg:text-4xl text-primary dark:text-white dark:lg:text-primary ">
            reset password
          </h1>
          <p className="dark:text-light max-w-md mb-6 md:mb-8 lg:mb-10">
            Please enter the email address you&apos;d like your password reset
            information sent to
          </p>
          {resetLink ? successMessage : resetPasswordForm}
        </div>
      </div>
    </>
  );
}
export default UserResetPasswordVerify;
