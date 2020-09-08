import { useState } from 'react';
import { useRouter } from 'next/router';
import cookies from 'react-cookies';
import {
  Box, Button, Heading, Flex, FormControl, FormLabel,
  Input, InputRightElement, InputGroup, Text, useToast,
} from '@chakra-ui/core';
import {
  Container, Layout, Nav
} from '../../components';
import { COOKIE_TOKEN, ADMIN_TOKEN } from '../../constants';

export default function Admin() {
  const router = useRouter();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handlePasswordVisibility = () => setShow(!show);

  const signin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (password === 'password') {
      cookies.save(COOKIE_TOKEN, ADMIN_TOKEN, {path: '/'});
      router.push('/admin/users');
    } else {
      setIsLoading(false);
      toast({
        title: "An error occurred.",
        description: "Invalid credentials. Try again",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true
      })
    }
  }

  return (
    <Layout>
      <Nav/>
      <Container>
        <Flex mt={50} justify="center">
            <Box boxShadow="md">
              <form className="form">
                <Heading textAlign="center" mb={2} fontSize="1.5rem" fontWeight="bold">
                  Welcome back
                </Heading>
                <Text textAlign="center" mb="2rem">
                  Enter your password to sign in
                </Text>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handlePasswordVisibility}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Flex justify="center" mt="1.2rem">
                  <Button
                    type="submit"
                    onClick={signin}
                    variantColor="blue"
                    borderRadius={7}
                    fontSize={14}
                    ml={1} mr={1}
                    isLoading={isLoading}
                    loadingText="Waiting..."
                  >
                    Sign in
                </Button>
                </Flex>
              </form>
            </Box>
        </Flex>
      </Container>
      <style jsx>{`
        .form {
          display: flex;
          flex-direction: column;
          background-color: #FFFFFF;
          min-height: 15rem;
          padding: 2rem;
          border-radius: 10px;
          color: #3E576A;
        }
      `}</style>
    </Layout>
  )
}

