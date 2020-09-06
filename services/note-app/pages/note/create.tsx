import React, { useState } from 'react'
import axios from 'axios'
import { FormControl, FormLabel, Textarea, Button, Input, useToast} from "@chakra-ui/core";
import Layout from '../../components/Layout'
import { useRouter } from "next/router";
import jwtDecode from 'jwt-decode'


export default function Home() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const createNote = async () => {
    let username
    const payload = { title, description }
    const token = localStorage.getItem("isLoggedIn");
    if(token) {
      const decode = jwtDecode(token)
      payload['user'] = decode.username;
      username = decode.username;
    }
    try {
      setIsLoading(true)
      const res = await axios.post('/api/notes/create', payload);
      toast({
        position: "top-right",
        title: "Create Note",
        description: res.data.message,
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

  return (
    <Layout>
      <div style={{boxShadow: '0px 1px 8px 5px #e6dddd', padding: '2%', borderRadius: '10px', width: '30%', margin: '5% auto'}}>
        <h3 style={{fontSize: '30px'}}>Create Notes</h3> <br></br>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              type="text"
              id="title"
              value={title}
              placeholder='Title'
              aria-describedby="email-helper-text"
              onChange={(e: any) => setTitle(e.target.value)} 
            />
        </FormControl><br/>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea 
             value={description}
             onChange={(e: any) => setDescription(e.target.value)} 
             size="sm"
            id="description" 
            placeholder='Description' 
            aria-describedby="email-helper-text" />
        </FormControl><br/>
        <FormControl>
        {
            isLoading === true ?
              <Button isLoading loadingText="Creating note..." variantColor="teal">Create Note</Button>
            :
              <Button loadingText="Creating note..." onClick={createNote} variantColor="teal">Create Note</Button>
          }
        </FormControl>
      </div>
    </Layout>
  )
}
