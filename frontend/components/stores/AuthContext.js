import React, { Component } from "react";

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    userId: null,
    user: null,
    token: null
  };

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      this.setState({
        token: token,
        isLoggedIn: true
      })
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          setAuthToken: token => {
            localStorage.setItem("token", token);
            this.setState({
              isLoggedIn: true,
              token: token
            })
          },
          logIn: user =>
            this.setState({
              isLoggedIn: true,
              userId: user && user.id,
              user: user
            }),
          logOut: () => {
            localStorage.setItem("token", "");
            this.setState({
              isLoggedIn: false,
              userId: null,
              user: null,
              token: null
            })
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
export { AuthContext, AuthConsumer, AuthProvider };
