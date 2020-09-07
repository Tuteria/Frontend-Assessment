import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Flex, Button } from '@chakra-ui/core';
import cookies from 'react-cookies';

interface NavProps {
  showLogin: boolean,
 }

const Nav: FunctionComponent = () => {
  const router = useRouter();
  const isUserLoggedIn = cookies.load('token');

  const logout = () => {
    cookies.remove('token', { path: '/' });
    router.push('/');
  }

  return (
    <Flex w="100%" p={4} justify="center" boxShadow="md">
      <div className="block">
        <Link href="/">
            <a className="heading">Notes</a>
        </Link>
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
            font-size: 2rem;
            color: #3E576A;
            font-weight: bold;
            text-decoration: none;
        }

        .block {
          display: flex;
          justify-content: space-between;
          width: 100%
        }

        .login {
          padding-top: 1rem;
          color: #3E576A;
          font-weight: bold
        }

        .login a:hover {
          text-decoration: underline
        }

        @media (min-width: 800px) {
          .block {
            width: 800px;
          }
        }
      `}</style>
    </Flex>
  );
}

export default Nav;
