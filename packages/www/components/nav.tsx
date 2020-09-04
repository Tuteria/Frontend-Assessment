import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Flex, Text } from '@chakra-ui/core';
import Login from './login';

interface NavProps {
  showLogin: boolean,
 }

const Nav: FunctionComponent = () => (
    <Flex w="100%" p={4} justify="center" boxShadow="md">
      <div className="block">
        <Link href="/">
            <a className="heading">Notes</a>
        </Link>
          <div className="login">
            <Link href="/login">
              <a >Login</a>
            </Link>
          </div>
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
          font-size: 1.2rem;
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

export default Nav;
