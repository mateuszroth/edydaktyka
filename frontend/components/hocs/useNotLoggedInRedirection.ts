import { useContext, useEffect } from "react";
import Router from "next/router";
import { AuthContext } from "../stores/AuthContext";

const useNotLoggedInRedirection = () => {
  const {
    state: { isInitialized, isLoggedIn }
  } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      Router.push("/login");
    }
  }, [isLoggedIn]);
};

export default useNotLoggedInRedirection;
