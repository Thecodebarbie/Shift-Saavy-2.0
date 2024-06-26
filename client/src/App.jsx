import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import { NotificationProvider } from './context/NotificationContext';
import { useEffect } from 'react';
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  
  useEffect(()=>{


  })
  let location = useLocation().pathname
  console.log(location)
  function renderNavbar() {
    if (location === '/' || location === '/login' || location === '/signup') {
      document.head.innerHTML=` <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">

      <link rel="stylesheet" href="/css/login.css">
      <link rel="stylesheet" href="/css/register.css">
      <link rel="stylesheet" href="/css/twoFactorAuth.css">
      
      <link id="landing" rel="stylesheet" href="/css/landing.css">
  `
      return <Navbar />
    }
    else {
      document.head.innerHTML=` <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
      <link rel="stylesheet" href="/css/schedule.css">
      
      <link id="dashboard" rel="stylesheet" href="/css/dashboard.css">
      <link rel="stylesheet" href="/css/callOff.css">
      <link rel="stylesheet" href="/css/notification.css">
  `
    }
  }
  return (
    <>
    
      <ApolloProvider client={client}>
      <NotificationProvider>
        
          <header >
            {
              renderNavbar()
            }
            <Outlet />
          </header>
          </NotificationProvider>
      </ApolloProvider>
      
    </>
  );
}

export default App;
