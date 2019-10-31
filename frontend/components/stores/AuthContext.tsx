import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

const AuthContext = React.createContext({
  state: null,
  setAuthToken: null,
  logIn: null,
  logOut: null
});

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      album
      firstName
      lastName
      groups {
        id
        modeOfStudy
        fieldOfStudy
        groupNumber
        groupHalf
        courseName
        link
        description
        isActive
      }
    }
  }
`;

const AuthProvider: React.FC<{}> = ({ children }) => {
  const initState = {
    isLoggedIn: false,
    album: null,
    user: null,
    token: null
  };
  const [state, setState] = useState(initState);
  const [getCurrentUser, { data }] = useLazyQuery(CURRENT_USER);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setState({
        ...state,
        token: token,
        isLoggedIn: true
      });
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (data && data.currentUser) {
      setState({
        ...state,
        user: data.currentUser,
        album: data.currentUser.album
      });
    }
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        state,
        setAuthToken: token => {
          localStorage.setItem("token", token);
          setState({
            ...state,
            isLoggedIn: true,
            token: token
          });
        },
        logIn: user =>
          setState({
            ...state,
            isLoggedIn: true
          }),
        logOut: () => {
          localStorage.setItem("token", "");
          setState({
            ...state,
            isLoggedIn: false,
            album: null,
            user: null,
            token: null
          });
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
export { AuthContext, AuthConsumer, AuthProvider };
