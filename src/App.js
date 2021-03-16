import "./App.css";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";

//conecting to API
const client = new ApolloClient({
  uri: "https://fakerql.stephix.uk/graphql",
  cache: new InMemoryCache(),
});

function getPosts(count) {
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

function Posts() {
  const { loading, error, data } = useQuery(getPosts(100));

  if (loading) return <p>Loading...</p>;
  if (error) return console.log(error);
  return data.allPosts.map((post) => (
    <div key={post.id} >
      <p>{post.id}</p>
      <p>{post.published && "Published"}</p>
      <p>Created at:{post.createdAt}</p>
      <hr />
    </div >
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <Posts />
      </div>
    </ApolloProvider>
  );
}

export default App;
