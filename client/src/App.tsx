import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your deployed GraphQL endpoint
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
