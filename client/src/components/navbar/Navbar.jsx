import { useEffect } from "react";
import { Link } from "react-router-dom";
import SwitchMode from "./SwitchMode";
import SwitchLang from "./SwitchLang";
import AccountDropdown from "./AccountDropdown";
import mainStore from "../../store/mainStore";
import customerAuthStore from "../../store/authentication/customerAuthStore";

import PropTypes from "prop-types";
import { memo } from "react";
import CartDropdown from "./CartDropdown";

function Navbar({ menuItems, endButton }) {
  const { navOpen, handleNav, handleNavButton } = mainStore();

  useEffect(() => {
    navOpen
      ? document.documentElement.classList.add("overflow-hidden")
      : document.documentElement.classList.remove("overflow-hidden");
  }, [navOpen]);

  const { loggedIn } = customerAuthStore();

  const navMenu = (
    <>
      <ul className="nav-menu flex flex-col lg:flex-row items-center gap-6 lg:gap-2">
        {menuItems}
      </ul>
      <ul className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-8 lg:gap-4 px-32 lg:px-0">
        <SwitchMode />
        <SwitchLang />
        {loggedIn ? (
          <>
            <CartDropdown /> <AccountDropdown />
          </>
        ) : (
          endButton
        )}
      </ul>
    </>
  );
  return (
    <div
      className={`
        fixed z-50 w-full bg-white dark:bg-dark bg-opacity-40 dark:bg-opacity-30 backdrop-blur-xl overflow-hidden ${
          navOpen ? "h-screen nav-h duration-300" : "nav-h nav-open duration-50"
        } `}
    >
      <div className="main-container p-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => handleNavButton("home")}
          className="cursor-pointer"
        >
          <img src="/logo.svg" alt="Markstone logo" className="w-12 lg:w-14" />
        </Link>

        <div className="hidden w-full lg:flex justify-between pl-10">
          {navMenu}
        </div>
        <div
          className={`lg:hidden nav-icon ${navOpen ? "open" : ""}`}
          onClick={handleNav}
        >
          <span></span>
          <span></span>
        </div>
      </div>
      {navOpen ? (
        <div
          className={`flex flex-col items-center gap-12 lg:hidden duration-200 ${
            navOpen ? "pt-24" : "pt-4 "
          }`}
        >
          {navMenu}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
Navbar.propTypes = {
  menuItems: PropTypes.array,
  endButton: PropTypes.object,
};

const MemoizedNavbar = memo(Navbar);
export default MemoizedNavbar;
