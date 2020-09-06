import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FormControl, FormLabel, Select, Button, Input, useToast} from "@chakra-ui/core";
import Layout from '../../components/Layout'
import { useRouter } from "next/router";
import jwtDecode from 'jwt-decode'


export default function Home() {
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");
  let [role, setRole] = useState("");
  let [password, setPassword] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [auth, setAuth] = useState({});

  const toast = useToast();
  const router = useRouter();

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

  const createNote = async () => {
    const token = localStorage.getItem("isLoggedIn");
    const payload = { username, email, role, password, token }
  
    try {
      setIsLoading(true)
      const res = await axios.post('/api/users/create', payload);
      toast({
        position: "top-right",
        title: "Create Note",
        description: res.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      router.push(`/users`);

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
        <h3 style={{fontSize: '30px'}}>Create User</h3> <br></br>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              placeholder='Email'
              aria-describedby="email-helper-text"
              onChange={(e: any) => setEmail(e.target.value)} 
            />
        </FormControl><br/>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              id="username"
              value={username}
              placeholder='Username'
              aria-describedby="email-helper-text"
              onChange={(e: any) => setUsername(e.target.value)} 
            />
        </FormControl><br/>
        <FormControl>
          <FormLabel htmlFor="pass">Password</FormLabel>
            <Input
              type="password"
              id="pass"
              value={password}
              placeholder='Password'
              aria-describedby="email-helper-text"
              onChange={(e: any) => setPassword(e.target.value)} 
            />
        </FormControl><br/>
        <FormControl>
          <FormLabel htmlFor="pass">Role</FormLabel>
          <Select placeholder="Select Role" onChange={(e: any) => setRole(e.target.value)} >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
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
