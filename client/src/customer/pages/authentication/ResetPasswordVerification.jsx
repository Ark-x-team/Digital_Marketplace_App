// Importing necessary components and libraries
import { useState } from "react";
import { Input, Button, Textarea, Progress } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import customerAuthStore from "../../../store/authentication/CustomerAuthStore";
import { useTranslation } from "react-i18next";

// ResetPasswordVerification component
function ResetPasswordVerification() {
  // State variables
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState(false);

  // Destructuring values from the authentication store
  const {
    verificationEmail,
    updateVerificationEmail,
    verificationEmailValidation,
    resetPasswordVerification,
    verificationEmailError,
  } = customerAuthStore();

  // Function to handle password reset verification
  const handleResetPasswordVerification = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await resetPasswordVerification();
      setLoading(false);
      setResetLink(true);
    } catch (error) {
      setLoading(false);
      setResetLink(false);
    }
  };

  // Translation hook
  const { t } = useTranslation();

  // Error message component
  const errorMessage = (
    <Textarea
      readOnly
      color="danger"
      minRows={1}
      placeholder={verificationEmailError}
    />
  );

  // Success message component
  const successMessage = (
    <Textarea
      readOnly
      color="success"
      defaultValue={t(
        "an email containing a link to reset your password has been sent to your email address. Please check your inbox"
      )}
      startContent={<MarkEmailReadRoundedIcon className="mr-2" />}
    />
  );

  // JSX for the reset password verification form
  const resetPasswordInputs = (
    <form
      onSubmit={handleResetPasswordVerification}
      className="flex flex-col gap-5 w-full lg:w-1/2"
    >
      {/* Email input */}
      <Input
        name="email"
        value={verificationEmail}
        onChange={updateVerificationEmail}
        type="email"
        placeholder="Email"
        startContent={
          <EmailRoundedIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      {/* Display verification email error message if there is one */}
      {verificationEmailError && errorMessage}
      {/* Display success message if reset link is sent successfully */}
      {resetLink && !loading && successMessage}
      {/* Buttons for getting link and navigating back to login */}
      <div className="mt-2 flex flex-col lg:flex-row-reverse gap-4">
        {/* Get link button */}
        <Button
          type="submit"
          isDisabled={!verificationEmailValidation}
          color="primary"
          variant="solid"
          endContent={<ForwardToInboxRoundedIcon />}
          className="capitalize grow"
        >
          {t("get link")}
        </Button>
        {/* Back to login button */}
        <Button
          as={Link}
          to="/login"
          color="primary"
          variant="flat"
          startContent={<ArrowBackRoundedIcon />}
          className="capitalize grow"
        >
          {t("back to login")}
        </Button>
      </div>
    </form>
  );

  // Cover image URL
  const coverImage =
    "https://images.pexels.com/photos/4048595/pexels-photo-4048595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  // Render the ResetPasswordVerification component

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
      <div
        className="h-screen relative after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0 
    "
      >
        <div className="h-full w-full relative after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
          <LazyLoadImage
            style={{ filter: "grayscale(30%)" }}
            src={coverImage}
            loading="lazy"
            alt="login cover image"
            className="absolute h-full w-full object-cover lg:object-center"
          />
          <div className="relative main-container px-3 pt-56 flex w-full justify-center">
            <div className="w-11/12 md:w-8/12 mx-auto lg:mr-auto lg:ml-0 z-10 flex flex-col items-center lg:items-start ">
              <h1 className="font-title capitalize text-4xl lg:text-5xl text-primary  dark:text-white dark:lg:text-primary text-center lg:text-start mb-2 md:mb-4 lg:mb-6 max-w-lg">
                {t("reset password")}
              </h1>
              <p className="dark:text-light text-center max-w-md lg:text-start mb-8 md:mb-10 lg:mb-12">
                {t(
                  "please enter the email address you&apos;d like your password reset information sent to"
                )}
              </p>
              {resetPasswordInputs}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetPasswordVerification;
