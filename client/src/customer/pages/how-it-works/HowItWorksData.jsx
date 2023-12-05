import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PropTypes from "prop-types";

const Btn = (props) => (
  <Button
    to={props.link}
    as={Link}
    color="primary"
    variant="light"
    className="w-fit"
    endContent={<ArrowForwardRoundedIcon />}
  >
    {props.btnText}
  </Button>
);
Btn.propTypes = {
  link: PropTypes.string,
  btnText: PropTypes.string,
};

const howItWorksData = [
  {
    title: "create account",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas non vel nobis soluta porro itaque, velit ullam tenetur veniam voluptatibus neque sit voluptatum sint saepe temporibus velit ullam tenetur veniam voluptatibus neque sit voluptatum sint saepe temporibus",
    link: <Btn link="/sign-up" btnText="Create account" />,
    image:
      "https://images.pexels.com/photos/7242888/pexels-photo-7242888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Creating account image",
  },
  {
    title: "choose the perfect product",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas non vel nobis soluta porro itaque, velit ullam tenetur veniam velit ullam tenetur veniam",
    link: <Btn link="/store" btnText="Discover store" />,
    image:
      "https://images.pexels.com/photos/1251844/pexels-photo-1251844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "choosing product image",
  },
  {
    title: "pay when you're satisfied",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas non vel nobis soluta porro itaque, velit ullam tenetur veniam voluptatibus neque sit voluptatum sint saepe temporibus debitis cumque aliquid unde. velit ullam tenetur veniam voluptatibus neque sit voluptatum sint saepe temporibus debitis cumque aliquid unde.",
    image:
      "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Payment image",
  },
];
export default howItWorksData;
