import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/storeSlices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase/firebase";

export function useAuth() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserState(parsedUser);
      dispatch(setUser(parsedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUserState(authUser);

      if (authUser) {
        const { uid, email } = authUser;
        dispatch(setUser({ uid, email }));
      } else {
        dispatch(setUser(null));
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return { isLoading, user };
}
