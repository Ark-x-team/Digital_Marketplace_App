// Importing required React hooks, components, and utility functions
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SwitchMode from "./SwitchMode";
import SwitchLang from "./SwitchLang";
import AccountDropdown from "./AccountDropdown";
import mainStore from "../../store/MainStore";
import customerAuthStore from "../../store/authentication/CustomerAuthStore";

import PropTypes from "prop-types";
import { memo } from "react";
import CartDropdown from "./CartDropdown";

// React functional component for the Navbar
function Navbar({ menuItems, endButton }) {
  // Destructuring required functions and objects from main store
  const { navOpen, handleNav, handleNavButton } = mainStore();

  // useEffect to handle overflow hidden when the navigation is open
  useEffect(() => {
    navOpen
      ? document.documentElement.classList.add("overflow-hidden")
      : document.documentElement.classList.remove("overflow-hidden");
  }, [navOpen]);

  // Destructuring required function from customer authentication store
  const { loggedIn } = customerAuthStore();

  // JSX for the navigation menu
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

  // Main rendering of the Navbar component
  return (
    <div
      className={`
        fixed z-50 w-full bg-white dark:bg-dark bg-opacity-40 dark:bg-opacity-30 backdrop-blur-xl overflow-hidden ${
          navOpen ? "h-screen nav-h duration-300" : "nav-h nav-open duration-50"
        } `}
    >
      <div className="main-container p-4 flex items-center justify-between">
        {/* Logo and home link */}
        <Link
          to="/"
          onClick={() => handleNavButton("home")}
          className="cursor-pointer"
        >
          <img src="/logo.svg" alt="Markstone logo" className="w-12 lg:w-14" />
        </Link>

        {/* Navigation menu for larger screens */}
        <div className="hidden w-full lg:flex justify-between pl-10">
          {navMenu}
        </div>

        {/* Navigation icon for smaller screens */}
        <div
          className={`lg:hidden nav-icon ${navOpen ? "open" : ""}`}
          onClick={handleNav}
        >
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Responsive navigation menu for smaller screens */}
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

// PropTypes for type checking of Navbar component props
Navbar.propTypes = {
  menuItems: PropTypes.array,
  endButton: PropTypes.object,
};

// Memoizing the Navbar component for performance optimization
const MemoizedNavbar = memo(Navbar);

// Exporting the MemoizedNavbar as the default export
export default MemoizedNavbar;
