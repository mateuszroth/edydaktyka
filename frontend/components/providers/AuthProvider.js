import React, { Component } from "react";

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    loggedIn: false,
    userId: null,
    user: null
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          logIn: user =>
            this.setState({
              loggedIn: true,
              userId: user & user.id,
              user: user
            }),
          logOut: () =>
            this.setState({
              loggedIn: false,
              userId: null,
              user: null
            })
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export default AuthProvider;
export { AuthConsumer };
