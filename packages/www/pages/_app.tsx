import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import cookies from 'react-cookies';
import isAdminUser from '../utils/isAdminUser';
import { Redirect } from '../components';
import { COOKIE_USER } from "../constants";

/**
 * Extracts username from route path
 * @param - route path
 * @return - username
 */
function extractUsername(path: string): string {
  const rootUsersRoute = '/users'
  return path.substring(
    path.indexOf('/') + rootUsersRoute.length + 1,
    path.indexOf('/', rootUsersRoute.length + 1)
  )
}

function App({ Component, pageProps }: AppProps): React.ReactNode {
  const router = useRouter();
  const isAdmin = isAdminUser();
  const loggedInUser = cookies.load(COOKIE_USER)

  let allow = true;
  let path = '/';

  if (router.pathname.startsWith("/admin/users")) {
    if(!isAdmin) {
      allow = false;
      path = '/admin';
    }
  }
  
  if (router.pathname.startsWith(`/users`)) {
    const usernameInRoutePath = extractUsername(router.asPath);
    const authorizedUser = loggedInUser === usernameInRoutePath;
    if (!(isAdmin || authorizedUser)) {
      allow = false;
      path = '/login'
    }
  }

  return (
    <ThemeProvider>
      <CSSReset />
      {allow ?
        <Component {...pageProps} /> :
        <Redirect redirectPath={path}  {...pageProps}/>
      }
    </ThemeProvider>
  );
}

export default App;
