import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://wordpress.carevita.co.za/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
