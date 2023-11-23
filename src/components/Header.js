import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import LanguageSelector from "./LanguageSelector";
import menuIcon from "../assets/menuIcon.svg";
import useClickOutside from "../hooks/useClickOutside";
import { selectUser } from "../utils/storeSlices/authSlice";
import { translations } from "../utils/lang/translations";
import useNightMode from "../hooks/useNightMode";
import useSignOut from "../hooks/useSignOut";

const Header = () => {
  const LoggedUser = useSelector(selectUser);
  const { handleSignOut } = useSignOut();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useNightMode();

  useClickOutside(menuRef, () => {
    closeMobileMenu();
  });

  const openLoginModal = () => {
    closeMobileMenu();
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const selectedLanguage = useSelector((state) => state.language);

  const toggleNightModeHandler = () => {
    document.body.classList.toggle("dark-mode");
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="header">
      <div>
        <NavLink to="/">
          <p className="header_logo">
            {translations[selectedLanguage].organic}
          </p>
        </NavLink>
      </div>

      <div ref={menuRef}>
        <img
          className="icon menu_icon"
          onClick={toggleMobileMenu}
          src={menuIcon}
          alt="menu"
        />

        <div
          className={`header__nav ${
            isMobileMenuOpen ? "mobile_menu_open" : ""
          }`}
        >
          <div className="nav_item w-100" onClick={toggleNightModeHandler}>
            <p id="night-mode-icon"></p>
          </div>

          <LanguageSelector closeMobileMenu={closeMobileMenu} />

          <NavLink to="/fruits" className="nav_item" onClick={closeMobileMenu}>
            <p>{translations[selectedLanguage].explore}</p>
          </NavLink>

          {LoggedUser && (
            <NavLink
              to="/update"
              className="nav_item"
              onClick={closeMobileMenu}
            >
              <p>{translations[selectedLanguage].update}</p>
            </NavLink>
          )}

          {!LoggedUser ? (
            <p className="nav_item" onClick={openLoginModal}>
              {translations[selectedLanguage].login}
            </p>
          ) : (
            <p
              className="nav_item"
              onClick={() => {
                handleSignOut();
                closeMobileMenu();
              }}
            >
              {translations[selectedLanguage].logout}
            </p>
          )}
        </div>

        {isLoginModalOpen && <Login onClose={closeLoginModal} />}
      </div>
    </div>
  );
};

export default Header;
