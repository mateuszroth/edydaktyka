import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

interface ContextValues {
  state: State;
  setAuthToken: (token: string) => void;
  logIn: () => void;
  logOut: () => void;
}

const AuthContext = React.createContext<ContextValues>({
  state: null,
  setAuthToken: () => null,
  logIn: () => null,
  logOut: () => null
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

interface User {
  firstName: string;
  lastName: string;
  album: number;
  groups: any[];
}

interface State {
  isLoggedIn: boolean;
  album?: number;
  user?: User;
  token?: string;
}

interface AuthProviderProps {
  onLogout: () => void,
  onLogin: () => void,
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, onLogout, onLogin }) => {
  const initState: State = {
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
    }
  }, []);

  useEffect(() => {
    if (state && state.token && state.isLoggedIn && !state.user) {
      getCurrentUser();
    }
  }, [state]);

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
          onLogin();
          localStorage.setItem("token", token);
          setState({
            ...state,
            isLoggedIn: true,
            token: token
          });
        },
        logIn: () =>
          setState({
            ...state,
            isLoggedIn: true
          }),
        logOut: () => {
          onLogout();
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
