import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Button, FormControl, FormLabel, Input, InputGroup,
  InputRightElement, Heading, Flex, useToast 
} from '@chakra-ui/core';
import {
  Container, Layout, Nav
} from '../../../components'

export default function CreateUser() {
  const router = useRouter();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const handleClick = () => setShow(!show);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setIsUsernameValid(false);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(false);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(false);
  }

  const validateInput = () => {
    const regExp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    let isUsernameValid = true;
    let isPasswordValid = true;
    let isEmailValid = true;
    if (username.trim().length === 0) {
      setIsUsernameValid(true);
      isUsernameValid = false;
    }
    if (password.trim().length === 0) {
      setIsPasswordValid(true);
      isPasswordValid = false;
    }
    if (!email.match(regExp)) {
      setIsEmailValid(true);
      isEmailValid = false
    }
    
    return isUsernameValid && isPasswordValid && isEmailValid;
  }

  const submit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if(!validateInput()) {
      setIsLoading(false)
    }
    
    try {
      const response = await axios.post(`/api/users/create`, {
        username,
        email,
        password
      })
      setUserCreated(true);
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "An error occurred.",
        description: `Something went wromg. Try again`,
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
        {userCreated && router.push('/admin/users') && toast({
          title: "User created",
          description: "User successfully created",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true
        })}
        <div style={{display: "flex", justifyContent:"center"}}>
        <form className="form">
          <Heading textAlign="center" color="#3E576A" as="h3" size="lg"  mb={5}>
              Create User
          </Heading>
          <FormControl isRequired mb={2}>
            <FormLabel htmlFor="username">First name</FormLabel>
            <Input
              id="username" placeholder="Username" isInvalid={isUsernameValid}
              value={username} onChange={handleUsernameChange}
              />
          </FormControl>
          <FormControl isRequired mb={2}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email" placeholder="Email" isInvalid={isEmailValid}
              value={email} onChange={handleEmailChange}
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
              loadingText="Submitting"
            >
              Submit
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
            width: 600px;
          }
        }
      `}</style>
    </Layout>
  )
}

