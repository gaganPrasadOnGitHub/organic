import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase/firebase";
import { setError, setLoading, setUser } from "../utils/storeSlices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import closeIcon from "../assets/closeIcon.svg";
import { translations } from "../utils/lang/translations";
import LoginForm from "./LoginForm";
import useEscKey from "../hooks/useEscKey";

const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedLanguage = useSelector((state) => state.language);
  useEscKey(onClose);

  const handleSignIn = async (email, password) => {
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
        <LoginForm handleSignIn={handleSignIn} />
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
