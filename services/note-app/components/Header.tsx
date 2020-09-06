import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link'
import { Box, Heading, Flex, Text, Icon, useToast, Button} from "@chakra-ui/core";
import jwtDecode from 'jwt-decode'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  let [auth, setAuth] = useState({role: ''});
  const router = useRouter();
  const toast = useToast();

  
  useEffect(() => {
    const token = localStorage.getItem("isLoggedIn");
    if(token) {
      const decode = jwtDecode(token)
      if (decode.role.toLowerCase() !== 'admin'){
      }
      setAuth(decode)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
        position: "top-right",
        title: "Logout Notice",
        description: 'You are not logged out!',
        status: "warning",
        duration: 6000,
        isClosable: true,
      })
    router.push('/')
  }
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Notes App
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        width={{ sm: "full", md: "auto" }}
        mt={{ base: 8, md: 0 }}
      >
        <Link href="/" as={`/`}>Home</Link>
        &nbsp; &nbsp; &nbsp;&nbsp;

        <Link href="/note/create" as={`/note/create`}>+Notes</Link>
        &nbsp; &nbsp; &nbsp;&nbsp;

        {
          auth.role.toLowerCase() === 'admin' ? <Link href="/users/create" as={`/users/create`}>+Create users</Link> : ''
        }
        &nbsp; &nbsp; &nbsp;&nbsp;

        {
          auth.role.toLowerCase() === 'admin' ? <Link href="/users" as={`/users`}>View users</Link> : ''
        }
        &nbsp; &nbsp; &nbsp;&nbsp;

        {
          auth.role ? <Button variantColor="white.500" variant="link" onClick={() => logout()}>Logout</Button> 
          : <Link href="/login" as={`/login`}>Login</Link>
        }
        &nbsp; &nbsp; &nbsp;&nbsp;
      </Box>
    </Flex>
  );
};

export default Header;
