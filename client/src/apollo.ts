import { Kind, OperationTypeNode } from "graphql";
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  ServerError,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: {
      token: "connectionParams/token",
      headers: {
        token: "connectionParams/headers/token",
      },
    },
  })
);

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  headers: {
    token: "http/headers/token",
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  wsLink,
  httpLink
);

const link = from([splitLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
