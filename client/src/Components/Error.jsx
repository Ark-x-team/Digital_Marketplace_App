// Importing required components and icons from libraries
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useTranslation } from "react-i18next";

// React functional component for displaying a 404 error page
function Error() {
  // Initializing the useTranslation hook
  const { t } = useTranslation();

  // Rendering the error section
  return (
    <section className="error-wrapper">
      <div className="container">
        {/* Animated 404 scene */}
        <div id="scene" className="scene font-title">
          <p className="p404">404</p>
          <p className="p404">404</p>
        </div>

        {/* Error message and back to home button */}
        <div className="error-article mt-32 tablet:mt-44 flex flex-col items-center gap-5">
          {/* Error message */}
          <p className="font-main text-center text-slate-700 text-small-heading max-w-lg tablet:text-lg dark:text-slate-300">
            {t("sorry, the page you are looking for cannot be found !")}
          </p>

          {/* Back to home button */}
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
      </div>
    </section>
  );
}

// Exporting the Error component as the default export
export default Error;
