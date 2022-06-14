import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";

function App() {
  const { data: queryData } = useQuery(gql`
    query Token {
      token
    }
  `);

  const { data: subscriptionData } = useSubscription(gql`
    subscription Countdown {
      countdown
    }
  `);

  return (
    <main>
      <p>Query Data:</p>
      <pre>{JSON.stringify(queryData, null, 2)}</pre>
      <p>Subscription Data:</p>
      <pre>{JSON.stringify(subscriptionData, null, 2)}</pre>
    </main>
  );
}

export default App;
