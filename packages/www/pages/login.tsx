import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookies from 'react-cookies';
import {
  Button, FormControl, FormLabel, Input, InputGroup,
  InputRightElement, Heading, Flex, useToast 
} from '@chakra-ui/core';
import {
  Container, Layout, Nav
} from '../components';
import { COOKIE_TOKEN, COOKIE_USER } from '../constants';

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleClick = () => setShow(!show);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setIsUsernameValid(false);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(false);
  }

  const validateInput = () => {
    let isUsernameValid = true;
    let isPasswordValid = true;
    if (username.length === 0) {
      setIsUsernameValid(true);
      isUsernameValid = false;
    }
    if (password.length === 0) {
      setIsPasswordValid(true);
      isPasswordValid = false;
    }
    return isUsernameValid && isPasswordValid;
  }

  const submit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setUsername(username.trim());
    setPassword(password.trim());

    if(!validateInput()) {
      setIsLoading(false)
      return;
    }
    
    try {
      const response = await axios.post(`/api/auth/login`, {
        username,
        password
      })
      const token = response.data.data.token;
      const loggedInUsername = response.data.data.username;
      cookies.save(COOKIE_TOKEN, token, { path: '/' });
      cookies.save(COOKIE_USER, loggedInUsername, { path: '/' });
      router.push(`/users/${loggedInUsername}/notes`)
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "An error occurred.",
        description: `Invalid credentials. Try again`,
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
        <div style={{display: "flex", justifyContent:"center"}}>
        <form className="form">
          <Heading textAlign="center" color="#3E576A" as="h3" size="lg"  mb={5}>
              Login
          </Heading>
          <FormControl isRequired mb={2}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username" placeholder="Username" isInvalid={isUsernameValid}
              value={username} onChange={handleUsernameChange}
              />
          </FormControl>
          <FormControl isRequired mb={2}>
            <FormLabel htmlFor="email">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Password" isInvalid={isPasswordValid}
                value={password} onChange={handlePasswordChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Flex justify="center" mt="1.2rem">
            <Button
              type="submit"
              onClick={submit}
              variantColor="blue"
              borderRadius={7}
              fontSize={14}
              ml={1} mr={1}
              isLoading={isLoading}
              loadingText="Loggin in"
            >
              Login
            </Button>
          </Flex>
        </form>
        </div>



      </Container>
      <style jsx>{`
        .form {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          background-color: #FFFFFF;
          border-radius: 10px;
          padding: 2rem;
          color: #3E576A;
          width: 100%
        }

        @media (min-width: 800px) {
          .form {
            width: 500px;
          }
        }
      `}</style>
    </Layout>
  )
}

