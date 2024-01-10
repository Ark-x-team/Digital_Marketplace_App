import Footer from "../components/Footer";
import { Input, Textarea, Button } from "@nextui-org/react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useTranslation } from "react-i18next";

// Functional component for the Contact Us page
function ContactUs() {
  // Destructuring the translation function from react-i18next
  const { t } = useTranslation();

  // Form for user messages
  const messageForm = (
    <div className="flex flex-col gap-4 w-full md:w-1/2 xl:w-1/4">
      {/* Input field for the subject */}
      <Input key="inside 1" type="text" label={t("subject")} />
      {/* Textarea for the message */}
      <Textarea
        key="inside 2"
        label="Message"
        labelPlacement="outside"
        placeholder={t("enter your message")}
      />
      {/* Button for sending the message */}
      <Button
        color="primary"
        variant="flat"
        endContent={<SendRoundedIcon />}
        className="w-fit"
      >
        {t("send")}
      </Button>
    </div>
  );

  // URL for the cover image
  const coverImage =
    "https://images.pexels.com/photos/8867259/pexels-photo-8867259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <>
      {/* Cover section with gradient overlay */}
      <div
        className=" relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0 
    "
      >
        {/* Cover image */}
        <div className="h-64 md:h-80 lg:h-96 w-full relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
          <img
            src={coverImage}
            alt="cover image"
            loading="lazy"
            className="absolute h-full w-full object-cover lg:object-center"
          />
        </div>
        {/* Heading for the cover section */}
        <h1 className="w-full absolute top-3/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-10 font-title capitalize text-center text-3xl md:text-4xl lg:text-5xl text-primary ">
          {t("contact us")}
        </h1>
      </div>

      {/* Main content section */}
      <div className="main-container px-4 lg:px-4 my-12 md:my-16 lg:my-20 flex flex-col md:flex-row justify-center items-start gap-8 md:gap-14 lg:gap-20">
        {/* Heading for the main content */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl capitalize max-w-lg">
          {t("how can we help you")} ?
        </h1>
        {/* Render the message form */}
        {messageForm}
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
}

export default ContactUs;
