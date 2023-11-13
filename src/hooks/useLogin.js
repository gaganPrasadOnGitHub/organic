import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError, setLoading, setUser } from "../utils/storeSlices/authSlice";
import { auth } from "../utils/firebase/firebase";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    dispatch(setLoading(true));
    try {
      navigate("/");
      await auth.signOut();
      localStorage.removeItem("user");
      dispatch(setUser(null));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleSignOut,
  };
};
export default useLogin;
