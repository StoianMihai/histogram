import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

//conecting to API
export const client = new ApolloClient({
    uri: "https://fakerql.stephix.uk/graphql",
    cache: new InMemoryCache(),
});

export function getPosts(count) {
    return gql`
    query GetPosts {
      allPosts(count: ${count}) {
        id
        published
        createdAt
      }
    }
  `;
}
