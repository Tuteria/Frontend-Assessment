import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heading, Text, Box, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import Layout from '../../../components/Layout'
import jwtDecode from 'jwt-decode'


export default function Feature({ id, title, desc, isAdminOrMine, ...rest }) {
  const router = useRouter();
  let [auth, setAuth] = useState({username: ''});

  useEffect(() => {
    const token = localStorage.getItem("isLoggedIn");
    if(token) {
      const decode = jwtDecode(token)
      setAuth(decode)
    } else {
      router.push('/')
    }
  }, [])

  return (
    <Layout>
      <div style={{width: '30%', margin: '5% auto'}}>
        <Box p={4} shadow="md" borderWidth="1px" flex="1" rounded="md" {...rest}>
          <Heading style={{ textAlign: 'center'}} fontSize="xl">Are you sure you want to delete this note? </Heading>
          <br />
          <div style={{ textAlign: 'center'}}>
            <Link href="/users/[username]/notes" as={`/users/${auth.username}/notes`}>
            <Button variantColor="teal" variant="outline">
              No&nbsp;
            </Button>
            </Link>
            &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <Button variantColor="red" variant="outline">
              Yes
            </Button>
          </div>
        </Box>
      </div>
    </Layout>
  );
}