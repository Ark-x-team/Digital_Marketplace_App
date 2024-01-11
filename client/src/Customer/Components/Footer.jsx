// Importing the useTranslation hook from react-i18next
import { useTranslation } from "react-i18next";

// React functional component for the website footer
function Footer() {
  // Destructuring the t function from useTranslation
  const { t } = useTranslation();

  // Getting the current year for dynamic copyright text
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // Rendering the Footer component with logo and copyright information
  return (
    <div className="main-container px-3 md:px-0 py-16 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-10">
      {/* Logo image */}
      <img
        src="/logo.svg"
        alt="Markstone logo"
        className="w-16 grayscale opacity-30 dark:opacity-100"
      />
      {/* Copyright text */}
      <p className="text-neutral-500 capitalize">
        &copy; {year} Markstone. {t("all rights reserved")}.
      </p>
    </div>
  );
}

// Exporting the Footer component as the default export
export default Footer;
