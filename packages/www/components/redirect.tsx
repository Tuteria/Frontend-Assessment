import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from "next/router";
import { Text } from '@chakra-ui/core';
import { Container, Nav, Layout } from '../components';

interface RedirectProps {
  redirectPath: string
}

/**
 * Redirect to the provided redirect route
 */
const Redirect: FunctionComponent<RedirectProps> = ({redirectPath}) => {
  const router = useRouter();

  useEffect(() => {
    router.push(redirectPath)
  })

  return (
    <Layout>
      <Nav/>
      <Container>
        <Text textAlign="center" mt={4}>
          Redirecting....
        </Text>
      </Container>
    </Layout>
  );
}

export default Redirect;
