import { useContext, useEffect } from "react";
import Router from "next/router";
import { AuthContext } from "../stores/AuthContext";

const useLoggedInRedirection = () => {
  const {
    state: { isLoggedIn }
  } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      Router.push("/account");
    }
  }, []);
};

export default useLoggedInRedirection;
