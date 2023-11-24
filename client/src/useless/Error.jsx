import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function Error() {
  return (
    <section className="error-wrapper">
      <div className="container">
        <div id="scene" className="scene">
          <p className="p404">404</p>
          <p className="p404">404</p>
        </div>
        <div className="error-article mt-32 tablet:mt-44 flex flex-col items-center gap-5">
          <p className="font-main text-center text-slate-700 text-small-heading max-w-lg tablet:text-lg dark:text-slate-300">
            Sorry, the page you are looking for cannot be found !
          </p>
          <Button
            to="/"
            as={Link}
            color="primary"
            variant="solid"
            className="w-fit dark:text-white"
            startContent={<ArrowBackRoundedIcon />}
          >
            home
          </Button>
        </div>{" "}
      </div>
    </section>
  );
}
