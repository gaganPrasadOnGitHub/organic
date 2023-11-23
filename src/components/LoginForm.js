// LoginForm.js
import React, { useState } from "react";
import InputField from "./InputField";
import { translations } from "../utils/lang/translations";
import { useSelector } from "react-redux";
import { selectError } from "../utils/storeSlices/authSlice";

const LoginForm = ({ handleSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const authError = useSelector(selectError);
  const selectedLanguage = useSelector((state) => state.language);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    setEmailError(emailValidationResult);
    setPasswordError(passwordValidationResult);

    if (emailValidationResult || passwordValidationResult) {
      return;
    }

    handleSignIn(email, password);
  };

  return (
    <form className="login_form" onSubmit={handleSubmit}>
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
  );
};

export default LoginForm;
