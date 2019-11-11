import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

interface Group {
  id: string;
  courseName: string;
}

interface ContextValues {
  state: State;
  setAuthToken: (token: string) => void;
  getCurrentUser: () => void;
  currentGroup?: Group;
  setCurrentGroup: (group: Group) => void;
  logIn: () => void;
  logOut: () => void;
}

const AuthContext = React.createContext<ContextValues>({
  state: null,
  setAuthToken: () => null,
  getCurrentUser: () => null,
  setCurrentGroup: group => null,
  logIn: () => null,
  logOut: () => null
});

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      album
      firstName
      lastName
      email
      isAdmin
      photo
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
  email: string;
  isAdmin: boolean;
  photo: string;
}

interface State {
  isLoggedIn: boolean;
  album?: number;
  user?: User;
  token?: string;
  isInitialized: boolean;
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
    token: null,
    isInitialized: false
  };
  const [state, setState] = useState(initState);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [getCurrentUser, { data }] = useLazyQuery(CURRENT_USER, { fetchPolicy: 'network-only' });

  const handleSetCurrentGroup = (group: Group) => {
    localStorage.setItem("currentGroup", JSON.stringify(group));
    setCurrentGroup(group);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const currentGroup = localStorage.getItem("currentGroup");
      if (currentGroup) {
        setCurrentGroup(JSON.parse(currentGroup));
      }
      return setState({
        ...state,
        token: token,
        isLoggedIn: true,
        isInitialized: true
      });
    }

    setState({
      ...state,
      isInitialized: true
    })
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
        getCurrentUser,
        currentGroup,
        setCurrentGroup: handleSetCurrentGroup,
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
          localStorage.setItem("currentGroup", "");
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
