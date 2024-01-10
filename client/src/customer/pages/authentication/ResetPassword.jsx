// Importing necessary components and libraries
import { useState } from "react";
import { Input, Button, Textarea, Progress } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import customerAuthStore from "../../../store/authentication/customerAuthStore";
import { useTranslation } from "react-i18next";

// ResetPassword component
function ResetPassword() {
  // State variables
  const [isVisible, setIsVisible] = useState(true);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Destructuring values from the authentication store
  const {
    resetPassword,
    resetPasswordForm,
    updateResetPasswordForm,
    passwordValidation,
    confirmPasswordValidation,
    resetPasswordValidation,
    resetPasswordError,
  } = customerAuthStore();

  // Function to toggle password visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Function to handle password reset
  const handleResetPassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await resetPassword();
      setPasswordUpdated(true);
      setLoading(false);
    } catch (error) {
      setPasswordUpdated(false);
      setLoading(false);
    }
  };

  // Translation hook
  const { t } = useTranslation();

  // Success message component
  const successMessage = (
    <Textarea
      readOnly
      color="success"
      defaultValue={t("your password has been updated successfully")}
      startContent={<DoneRoundedIcon className="mr-4" />}
      className="max-w-xs "
    />
  );

  // Error message component
  const errorMessage = (
    <Textarea
      readOnly
      color="danger"
      minRows={1}
      placeholder={resetPasswordError}
    />
  );

  // JSX for the reset password form
  const resetPasswordInputs = (
    <form
      onSubmit={handleResetPassword}
      className="flex flex-col gap-5 w-full lg:w-1/2"
    >
      {/* New password input */}
      <Input
        name="password"
        value={resetPasswordForm.password}
        onChange={updateResetPasswordForm}
        errorMessage={!passwordValidation.state && passwordValidation.message}
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
      />
      {/* Confirm password input */}
      <Input
        name="confirmPassword"
        value={resetPasswordForm.confirmPassword}
        onChange={updateResetPasswordForm}
        errorMessage={
          !confirmPasswordValidation.state && confirmPasswordValidation.message
        }
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
      {/* Display reset password error message if there is one */}
      {resetPasswordError && !loading && errorMessage}
      {/* Display success message if password is updated successfully */}
      {passwordUpdated && !loading && successMessage}

      {/* Buttons for updating and navigating back to login */}
      <div className="mt-2 flex flex-col lg:flex-row-reverse gap-4">
        {/* Update button */}
        <Button
          type="submit"
          isDisabled={!resetPasswordValidation}
          color="primary"
          variant="solid"
          endContent={<ForwardToInboxRoundedIcon />}
          className="capitalize grow"
        >
          {t("update")}
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

  // Render the ResetPassword component
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
              <h1 className="font-title capitalize text-4xl lg:text-5xl text-primary  dark:text-white dark:lg:text-primary text-center lg:text-start mb-8 md:mb-10 lg:mb-12">
                update password
              </h1>
              {resetPasswordInputs}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
