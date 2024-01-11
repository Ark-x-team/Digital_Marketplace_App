// Importing necessary components and libraries
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

// Functional component for the PaymentFailed screen
const PaymentFailed = () => {
  // Initializing the translation hook
  const { t } = useTranslation();

  return (
    // Main container with flex layout, occupying full height and width
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      {/* Container for error message with icon */}
      <div className="flex flex-col items-center gap-2">
        {/* Displaying error icon */}
        <ErrorRoundedIcon
          style={{ height: "6rem", width: "6rem" }}
          className="text-danger"
        />

        {/* Displaying error message */}
        <p className="font-main text-center font-semibold text-danger text-small-heading max-w-lg tablet:text-lg ">
          {t("your payment was not successful, please try again")}
        </p>
      </div>

      {/* Button for navigating back to the home page */}
      <Button
        to="/"
        as={Link}
        color="primary"
        variant="solid"
        className="w-fit dark:text-white"
        startContent={<ArrowBackRoundedIcon />}
      >
        {/* Translation for the "home" button */}
        {t("home")}
      </Button>
    </div>
  );
};

// Exporting the PaymentFailed component as the default export
export default PaymentFailed;
