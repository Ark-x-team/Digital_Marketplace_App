import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Btn = (props) => {
  const { t } = useTranslation();
  return (
    <Button
      to={props.link}
      as={Link}
      color="primary"
      variant="light"
      className="w-fit capitalize"
      endContent={<ArrowForwardRoundedIcon />}
    >
      {t(props.btnText)}
    </Button>
  );
};

Btn.propTypes = {
  link: PropTypes.string,
  btnText: PropTypes.string,
};

const howItWorksData = [
  {
    title: "create account",
    description:
      "start your digital journey by effortlessly creating your account. Join our vibrant community, and access exclusive features designed to enhance your experience",
    link: <Btn link="/sign-up" btnText="create account" />,
    image:
      "https://images.pexels.com/photos/7242888/pexels-photo-7242888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Creating account image",
  },
  {
    title: "choose the perfect product",
    description:
      "dive into our extensive catalog showcasing top-tier digital products. Whether it's captivating designs, stunning photography, or powerful programming resources, discover the ideal solution for your needs",
    link: <Btn link="/store" btnText="discover store" />,
    image:
      "https://images.pexels.com/photos/1251844/pexels-photo-1251844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "choosing product image",
  },
  {
    title: "pay when you're satisfied",
    description:
      "enjoy peace of mind with our satisfaction guarantee. Only pay when you're completely satisfied with your chosen product, ensuring a risk-free and delightful shopping experience on our platform",
    image:
      "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Payment image",
  },
];
export default howItWorksData;
