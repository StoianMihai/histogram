import "./App.css";
import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";
import moment from 'moment';

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

function getDate(date) {
  const a = +date;
  const dateConv = new Date(a);
  return dateConv.toLocaleDateString();
}

function Posts() {
  const { loading, error, data } = useQuery(getPosts(100));

  if (loading) return <p>Loading...</p>;
  if (error) return console.log(error);
  return data.allPosts.map((post) => (

    post.published &&
    <div key={post.id}>
      <p>{post.id}</p>
      <p>{post.published && "Published"}</p>
      <p>Created at: {getDate(post.createdAt)}</p>
      <hr />
    </div >

  ));
}


function GetYearPosts() {
  const { loading, error, data } = useQuery(getPosts(100));
  if (loading) return <p>Loading...</p>;
  if (error) return console.log(error);

  return data.allPosts.map((post) => console.log(moment(post.createdAt)))
}
const BarGraph = () => {

  const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest }) => (
    <Histogram
      width={parentWidth}
      height={parentHeight}
      {...rest}
    />
  ))

  const rawData = Array(100).fill().map(Math.random);
  return (
    <ResponsiveHistogram
      ariaLabel="My histogram of ..."
      orientation="vertical"
      cumulative={false}
      normalized={false}
      binCount={25}
      valueAccessor={datum => datum}
      binType="numeric"
      renderTooltip={({ event, datum, data, color }) => (
        <div>
          <div><strong>count </strong>{datum.count}</div>
        </div>
      )}
    >
      <BarSeries
        animated={false}
        rawData={rawData /* or binnedData={...} */}

      />
      <XAxis
        label="Months"
      />
      <YAxis
        label="Number of posts" />
    </ResponsiveHistogram>
  );

}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Posts Published every month from 2019</h2>
        <BarGraph />
        <Posts />

      </div>
    </ApolloProvider>
  );
}

export default App;
