// In Login.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  setError,
  setLoading,
  setUser,
} from "../utils/storeSlices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputField from "./InputField";
import closeIcon from "../assets/closeIcon.svg";
import { translations } from "../utils/lang/translations";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector(selectError);

  const selectedLanguage = useSelector((state) => state.language);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
      ? ""
      : translations[selectedLanguage].invalidEmail;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password)
      ? ""
      : translations[selectedLanguage].password;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    setEmailError(emailValidationResult);
    setPasswordError(passwordValidationResult);

    if (emailValidationResult || passwordValidationResult) {
      return;
    }

    dispatch(setLoading(true));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      dispatch(setUser(user));
      onClose();
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="overlay">
      <div className="login_form__container">
        <img
          className="icon close_icon"
          onClick={onClose}
          src={closeIcon}
          alt="close"
        />
        <form className="login_form" onSubmit={handleSignIn}>
          <InputField
            type="email"
            name="email"
            label={translations[selectedLanguage].email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            required
          />
          <InputField
            type="password"
            name="password"
            label={translations[selectedLanguage].password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            required
          />
          {authError && <small className="error_message">{authError}</small>}
          <button className="form_login_button" type="submit">
            {translations[selectedLanguage].login}
            <div className="login_icon"></div>
          </button>
        </form>
        <div className="login_access_info">
          <small>
            <a
              href="https://www.linkedin.com/in/gagan-prasad/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translations[selectedLanguage].loginAccess}{" "}
              <span className="underline">LinkedIn</span>
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
