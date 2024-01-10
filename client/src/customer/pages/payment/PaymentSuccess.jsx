// Importing necessary components and libraries
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import cartStore from "../../../store/CartStore";

// Functional component for the PaymentSuccess screen
const PaymentSuccess = () => {
  // Extracting the 'downloadProduct' function from the cart store
  const { downloadProduct } = cartStore();
  // Initializing the translation hook
  const { t } = useTranslation();

  return (
    // Main container with flex layout, occupying full height and width
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      {/* Container for success message with icon */}
      <div className="flex flex-col items-center gap-2">
        {/* Displaying success icon */}
        <CheckCircleRoundedIcon
          style={{ height: "6rem", width: "6rem" }}
          className="text-success"
        />

        {/* Displaying success message */}
        <p className="font-main font-semibold text-center text-success text-small-heading max-w-lg tablet:text-lg ">
          {t("your payment was successful")}
        </p>
      </div>

      {/* Button for triggering the downloadProduct function */}
      <Button
        onClick={() => downloadProduct()}
        color="primary"
        variant="solid"
        className="w-fit dark:text-white"
        startContent={<DownloadRoundedIcon />}
      >
        {/* Translation for the "download product" button */}
        {t("download product")}
      </Button>
    </div>
  );
};

// Exporting the PaymentSuccess component as the default export
export default PaymentSuccess;
