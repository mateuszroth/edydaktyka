import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import withApollo from "next-with-apollo";

const GRAPHQL_URL = "http://localhost:4000"; // TODO: get from env
const httpLink = createHttpLink({ uri: GRAPHQL_URL });
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  };
});

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {})
    })
);