import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import useSWR from 'swr'
import { FormControl, FormLabel, Textarea, Button, Input, useToast } from "@chakra-ui/core";
import Layout from '../../../components/Layout'
import Loader from '../../../components/Loader'
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
  const { data, error } = useSWR(`/api/notes/${noteId}`, fetcher)

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [isLoading, setIsLoading] = useState(false);
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
        <Link href="/users/[username]/notes" as={`/users/${auth.username}/notes`}>
          <Button variantColor="teal"  variant="link">
            {`<< Back`}
          </Button>
        </Link>
        <br /><br />
        <h3 style={{fontSize: '30px'}}>Edit Notes</h3> <br></br>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              type="text"
              id="title"
              defaultValue={title || data.data.title}
              placeholder='Title'
              aria-describedby="email-helper-text"
              onChange={(e: any) => setTitle(e.target.value)} 
            />
        </FormControl><br/>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea 
             defaultValue={description || data.data.description}
             onChange={(e: any) => setDescription(e.target.value)} 
             size="lg"
             id="description" 
             placeholder='Description' 
             aria-describedby="email-helper-text" />
        </FormControl><br/>
        <FormControl>
        {
            isLoading === true ?
              <Button isLoading loadingText="Creating note..." variantColor="teal">Edit Note</Button>
            :
              <Button loadingText="Creating note..." onClick={editNote} variantColor="teal">Edit Note</Button>
          }
        </FormControl>
      </div>
    </Layout>
  )
}
