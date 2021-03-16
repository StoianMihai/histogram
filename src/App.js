import "./App.css";
import { client } from "./api/posts";
import { ApolloProvider } from "@apollo/client";
import { BarGraph } from "./components/BarGraph";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Posts Published every month from 2019</h2>
        <BarGraph />
      </div>
    </ApolloProvider>
  );
}

export default App;