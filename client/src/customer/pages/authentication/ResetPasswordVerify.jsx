import { Input, Button, Textarea } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ResetPasswordVerify() {
  const [resetLink, setResetLink] = useState(false);

  const resetPasswordForm = (
    <div className="flex flex-col gap-5 lg:w-10/12 xl:w-8/12">
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
    <Textarea
      readOnly
      color="success"
      defaultValue="An email containing a link to reset your password has been sent to your email address. Please check your inbox"
      startContent={<MarkEmailReadRoundedIcon className="mr-2" />}
      className="max-w-xs "
    />
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
            <h1 className="font-title capitalize text-4xl lg:text-5xl text-primary  dark:text-white dark:lg:text-primary text-center lg:text-start mb-2 md:mb-4 lg:mb-6">
              reset password
            </h1>
            <p className="dark:text-light text-center max-w-md lg:text-start mb-8 md:mb-10 lg:mb-12">
              Please enter the email address you&apos;d like your password reset
              information sent to
            </p>
            {resetLink ? successMessage : resetPasswordForm}
          </div>
        </div>
      </div>
    </div>
  );
}
