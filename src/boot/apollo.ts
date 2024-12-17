import { ApolloClient /*, createHttpLink */ } from '@apollo/client/core';
import { provideApolloClients } from '@vue/apollo-composable';
import { getClientOptions } from 'src/apollo';

const options = getClientOptions();
const apolloClient = new ApolloClient(options);
let hasClientA = false;
provideApolloClients({ default: apolloClient });

const createNewClient = (accessToken: string) => {
  return new Promise<void>((resolve) => {
    if (hasClientA) {
      resolve();
    }
    const optionsA = getClientOptions({
      Authorization: `Bearer ${accessToken}`,
    });
    const apolloClientA = new ApolloClient(optionsA);

    provideApolloClients({
      default: apolloClient,
      clientA: apolloClientA,
    });
    hasClientA = true;
    resolve();
  });
};

export { apolloClient, createNewClient };
