import { useContext, useEffect } from "react";
import Router from "next/router";
import { AuthContext } from "../stores/AuthContext";

const useNotLoggedInRedirection = () => {
  const {
    state: { isLoggedIn }
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/login");
    }
  }, []);
};

export default useNotLoggedInRedirection;
