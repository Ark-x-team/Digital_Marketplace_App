import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import cartStore from "../../../store/cartStore";

const PaymentSuccess = () => {
  const { downloadProduct } = cartStore();
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className=" flex flex-col items-center gap-2">
        <CheckCircleRoundedIcon
          style={{ height: "6rem", width: "6rem" }}
          className="text-success"
        />
        <p className="font-main font-semibold text-center text-success text-small-heading max-w-lg tablet:text-lg ">
          {t("your payment was successful")}
        </p>
      </div>
      <Button
        onClick={() => downloadProduct()}
        color="primary"
        variant="solid"
        className="w-fit dark:text-white"
        startContent={<DownloadRoundedIcon />}
      >
        {t("download product")}
      </Button>
    </div>
  );
};

export default PaymentSuccess;
