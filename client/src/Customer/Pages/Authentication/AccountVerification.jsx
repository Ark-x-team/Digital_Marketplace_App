// Importing necessary dependencies and components
import { Spinner, Textarea } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomerAuthStore from "../../../Store/Authentication/CustomerAuthStore";
import { useTranslation } from "react-i18next";

// Defining the EmailVerification component
function EmailVerification() {
  // Extracting necessary functions and state from CustomerAuthStore
  const { AccountVerification } = CustomerAuthStore();

  // State to manage verification error
  const [verificationError, setVerificationError] = useState(null);

  // Navigate function for redirecting after verification
  const navigate = useNavigate();

  // Effect to initiate the email verification process on component mount
  useEffect(() => {
    try {
      // Triggering the account verification process
      AccountVerification();

      // Navigating to the home page after successful verification
      navigate("/");
    } catch (error) {
      // Handling verification error
      setVerificationError(true);
    }
  }, []);

  // Accessing translation function for error message
  const { t } = useTranslation();

  // Rendering the EmailVerification component
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {verificationError == null ? (
        // Displaying a spinner while waiting for verification
        <Spinner size="md" />
      ) : !verificationError ? (
        // Displaying an error message if verification fails
        <Textarea
          readOnly
          color="danger"
          maxRows={1}
          placeholder={t("can't verify your account")}
          className="max-w-xs"
        />
      ) : (
        // Rendering nothing when verification is successful
        ""
      )}
    </div>
  );
}

// Exporting the EmailVerification component as the default export
export default EmailVerification;
