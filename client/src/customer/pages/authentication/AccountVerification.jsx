import { Spinner, Textarea } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import customerAuthStore from "../../../store/authentication/customerAuthStore";
import { useTranslation } from "react-i18next";

function EmailVerification() {
  const { AccountVerification } = customerAuthStore();
  const [verificationError, setVerificationError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      AccountVerification();
      navigate("/");
    } catch (error) {
      setVerificationError(true);
    }
  }, []);

  const { t } = useTranslation();

  const errorMessage = (
    <Textarea
      readOnly
      color="danger"
      maxRows={1}
      placeholder={t("can't verify your account")}
      className="max-w-xs"
    />
  );

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {verificationError == null ? (
        <Spinner size="md" />
      ) : !verificationError ? (
        errorMessage
      ) : (
        ""
      )}
    </div>
  );
}

export default EmailVerification;
