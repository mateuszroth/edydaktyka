import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { ApolloLink, split } from 'apollo-link';

const localStorage = process.browser ? window.localStorage : { getItem: () => null, setItem: () => null };

const GRAPHQL_URL = process.env.GRAPHQL_URL;

const httpLink = createHttpLink({ uri: GRAPHQL_URL });
const uploadLink = createUploadLink({ uri: GRAPHQL_URL });
// https://github.com/jaydenseric/apollo-upload-client/issues/63#issuecomment-392501449
const isFile = value =>
    (typeof File !== 'undefined' && value instanceof File) || (typeof Blob !== 'undefined' && value instanceof Blob);
const isUpload = ({ variables }) => Object.values(variables).some(isFile);
const requestLink = split(isUpload, uploadLink, httpLink);

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

export default withApollo(
    ({ ctx, headers, initialState }) =>
        new ApolloClient({
            link: authLink.concat(requestLink),
            cache: new InMemoryCache().restore(initialState || {}),
        }),
);
