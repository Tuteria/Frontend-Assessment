import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import useSWR from 'swr'
import { Button, useToast, List, ListItem, ListIcon, Heading } from "@chakra-ui/core";
import Layout from '../../components/Layout'
import Loader from '../../components/Loader'
import { useRouter } from "next/router";
import jwtDecode from 'jwt-decode'


const fetcher = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

export default function Home() {
  const toast = useToast();
  const router = useRouter()
  const { noteId } = router.query
  
  
  let [token, setToken] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [auth, setAuth] = useState({username: ''});

  const { data, error } = useSWR(`/api/users?token=${token}`, fetcher)

  useEffect(() => {
    const token = localStorage.getItem("isLoggedIn");
    if(token) {
      const decode = jwtDecode(token)
      if (decode.role.toLowerCase() !== 'admin'){
        toast({
          position: "top-right",
          title: "Create Note",
          description: 'Please Login to continue.',
          status: "warning",
          duration: 6000,
          isClosable: true,
        })
        router.push('/login')
      }
      setAuth(decode)
      setToken(token)
    } else {
      router.push('/')
    }
  }, [])

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader label='Loading...' />

  const usersList = (
    data.data?.map(user => {
      return (
        <Link href="/users/[username]/notes" as={`/users/${user.username}/notes`}>
          <span style={{cursor: 'pointer'}}>
          <ListItem>
            <ListIcon icon="check-circle" color="green.500" />
            {user.username ? user.username : 'null'}
          </ListItem>
          <br />
          </span>
        </Link>
      )
    })
  )
  return (
    <Layout>
      <div style={{boxShadow: '0px 1px 8px 5px #e6dddd', padding: '2%', borderRadius: '10px', width: '30%', margin: '5% auto'}}>
      <Link href="/users/create" as={`/users/create`}>
          <Button variantColor="teal"  variant="link">
            Create User
          </Button>
        </Link>
        <br />
        <br />

        <Heading style={{textDecoration: 'underline'}} size='md'>Users</Heading>
        <br/>
        

     
        {
          data.data?.length > 0 ?  <List spacing={3}> {usersList}  </List>: 'No Users yet'
        }
     
      </div>
    </Layout>
  )
}
