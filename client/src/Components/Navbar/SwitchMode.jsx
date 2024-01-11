// Importing required icons and components from Material-UI and NextUI libraries
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useEffect } from "react";
import MainStore from "../../Store/MainStore";
import { Button } from "@nextui-org/react";

// React functional component for switching between light and dark modes
function SwitchMode() {
  // Destructuring required functions and objects from main store
  const { mode, handleSwitchMode } = MainStore();

  // useEffect to add or remove "dark" class from the HTML element based on the mode
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  // Rendering the button to switch between light and dark modes
  return (
    <Button
      isIconOnly
      aria-label="switch appearance"
      className="bg-white bg-opacity-50 dark:bg-dark dark:bg-opacity-30"
      onClick={handleSwitchMode}
    >
      {/* Conditional rendering of icon based on the current mode */}
      {mode === "dark" ? (
        <LightModeRoundedIcon className="text-white" />
      ) : (
        <DarkModeRoundedIcon className="text-primary" />
      )}
    </Button>
  );
}

// Exporting the SwitchMode component as the default export
export default SwitchMode;
