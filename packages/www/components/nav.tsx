import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Flex, Button } from '@chakra-ui/core';
import cookies from 'react-cookies';
import { COOKIE_USER, COOKIE_TOKEN } from '../constants';

interface NavProps {
  showLogin: boolean,
 }

const Nav: FunctionComponent = () => {
  const router = useRouter();
  const isUserLoggedIn = cookies.load(COOKIE_TOKEN);
  const username = cookies.load(COOKIE_USER);

  const logout = () => {
    cookies.remove(COOKIE_TOKEN, { path: '/' });
    cookies.remove(COOKIE_USER, { path: '/' });
    router.push('/');
  }

  const gotoNotes = () => router.push(`/users/${username}/notes`)

  return (
    <Flex w="100%" p={3} justify="center" boxShadow="md">
      <div className="block">
        <Link href="/">
            <a className="heading">Notes</a>
        </Link>
          {username ?
            <div className="login">
              <Button
                bg="transparent" onClick={gotoNotes} p={2}
                variant="outline" variantColor="#3E576A"
                leftIcon="chevron-left" rightIcon="chevron-right" 
              >
                Your notes
              </Button>
            </div>
            : null
          }
          {!isUserLoggedIn ?
            (
              <div className="login">
                <Link href="/login">
                  <a >Login</a>
                </Link>
              </div>
            ) :
            (
              <div className="login">
                <Button bg="transparent" onClick={logout}>
                  Logout
                </Button>
              </div>
            )
          }
      </div>
      <style jsx>{`
        .heading {
            font-size: 1rem;
            color: #3E576A;
            font-weight: bold;
            text-decoration: none;
            align-self: center
        }

        .block {
          display: flex;
          justify-content: space-between;
          width: 100%
        }

        .login {
          color: #3E576A;
          font-weight: bold;
          align-self: center
        }

        .login a:hover {
          text-decoration: underline
        }

        @media (min-width: 800px) {
          .block {
            width: 800px;
          }

          .heading {
            font-size: 2rem;
          }
        }
      `}</style>
    </Flex>
  );
}

export default Nav;
