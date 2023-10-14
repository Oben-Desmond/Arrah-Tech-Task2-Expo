import { ApolloClient, InMemoryCache } from '@apollo/client';

const apoloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql', // Replace with your GraphQL endpoint
    cache: new InMemoryCache(),
});

export default apoloClient;