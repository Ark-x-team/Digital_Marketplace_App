import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

const PaymentFailed = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className=" flex flex-col items-center gap-2">
        <ErrorRoundedIcon
          style={{ height: "6rem", width: "6rem" }}
          className="text-danger"
        />

        <p className="font-main text-center font-semibold text-danger text-small-heading max-w-lg tablet:text-lg ">
          {t("your payment was not successful, please try again")}
        </p>
      </div>
      <Button
        to="/"
        as={Link}
        color="primary"
        variant="solid"
        className="w-fit dark:text-white"
        startContent={<ArrowBackRoundedIcon />}
      >
        {t("home")}
      </Button>
    </div>
  );
};

export default PaymentFailed;
