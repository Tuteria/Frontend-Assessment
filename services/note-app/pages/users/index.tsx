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
  const { data, error } = useSWR(`/api/users`, fetcher)

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [auth, setAuth] = useState({username: ''});


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
    } else {
      router.push('/')
    }
  }, [])

  const editNote = async () => {
    let username
    const payload = { title, description }
    payload['user'] = auth.username;
    username = auth.username;

    try {
      setIsLoading(true)
      const res = await axios.put(`/api/notes/${noteId}`, payload);
      toast({
        position: "top-right",
        title: "Edit Note",
        description: 'Note edited succesfully!',
        status: "success",
        duration: 9000,
        isClosable: true,
      })

      router.push(`/users/${username}/notes`);

    } catch(err) {
      toast({
        position: "top-right",
        title: "Login Error",
        description: err.response.data.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      setIsLoading(false)
    }
  }

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader label='Loading...' />

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
        

      <List spacing={3}>
        {
          data.data.map(user => {
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
        }
      </List>
      </div>
    </Layout>
  )
}
