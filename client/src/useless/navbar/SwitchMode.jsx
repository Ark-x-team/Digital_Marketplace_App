import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useEffect } from "react";
import mainStore from "../../store/mainStore";
import { Button } from "@nextui-org/react";

const SwitchMode = () => {
  const { mode, handleSwitchMode } = mainStore();

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <Button
      isIconOnly
      aria-label="switch appearance"
      className="bg-white bg-opacity-50 dark:bg-dark dark:bg-opacity-30"
      onClick={handleSwitchMode}
    >
      {mode === "dark" ? (
        <LightModeRoundedIcon className="text-white" />
      ) : (
        <DarkModeRoundedIcon className="text-primary" />
      )}
    </Button>
  );
};

export default SwitchMode;
