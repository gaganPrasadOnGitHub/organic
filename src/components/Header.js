import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import useLogin from "../hooks/useLogin";
import LanguageSelector from "./LanguageSelector";
import menuIcon from "../assets/menuIcon.svg";
import useClickOutside from "../hooks/useClickOutside";
import { selectUser } from "../utils/storeSlices/authSlice";
import { translations } from "../utils/lang/translations";

const Header = () => {
  const LoggedUser = useSelector(selectUser);
  const { handleSignOut } = useLogin();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
          <LanguageSelector closeMobileMenu={closeMobileMenu} />

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
