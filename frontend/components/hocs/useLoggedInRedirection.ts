import { useContext, useEffect } from "react";
import Router from "next/router";
import { AuthContext } from "../stores/AuthContext";

const useLoggedInRedirection = () => {
  const {
    state: { isInitialized, isLoggedIn }
  } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      Router.push("/account");
    }
  }, [isLoggedIn]);
};

export default useLoggedInRedirection;
