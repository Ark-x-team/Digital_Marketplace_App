import { create } from "zustand";
import Cookies from "js-cookie";

const mainStore = create((set) => ({
  // ******************************* Navbar *******************************
  navOpen: false,
  handleNav: () => {
    const { navOpen } = mainStore.getState();
    set({ navOpen: !navOpen });
  },
  closeNav: () => {
    set({ navOpen: false });
  },
  activeButton: "",
  handleNavButton: (button) => {
    const { closeNav } = mainStore.getState();
    set({ activeButton: button });
    closeNav();
  },

  // ************************** Dark & Light Mode **************************
  mode: Cookies.get("appearance") || "dark",
  cookieExpiration: { expires: 365 }, // One year
  handleSwitchMode: () => {
    const { mode, cookieExpiration } = mainStore.getState();
    // Set the appearance mode in the cookie
    const appearance = mode === "light" ? "dark" : "light";
    Cookies.set("appearance", appearance, cookieExpiration);
    set({ mode: appearance, navOpen: false });
  },

  // ******************************* language *******************************
  languages: [
    {
      lang: "english",
      flag: "https://flagcdn.com/gb.svg",
    },
    {
      lang: "francais",
      flag: "https://flagcdn.com/fr.svg",
    },
  ],
  selectedLang: {
    lang: Cookies.get("lang") || "english",
    flag: Cookies.get("flag") || "https://flagcdn.com/gb.svg",
  },
  handleLangSwitch: (item) => {
    const { cookieExpiration } = mainStore.getState();
    // Set the selected language in the cookie
    Cookies.set("lang", item.lang, cookieExpiration);
    Cookies.set("flag", item.flag, cookieExpiration);

    set({ selectedLang: item, navOpen: false });
  },
}));

export default mainStore;
