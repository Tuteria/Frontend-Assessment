import React, { useState } from 'react'
import axios from 'axios'
import { FormControl, FormLabel, useToast, Button, Input} from "@chakra-ui/core";
import Layout from '../components/Layout'
import { useRouter } from "next/router";

export default function Home() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  let loginForm = async () => {
    const payload = { email, password }
    
    try {
      setIsLoading(true)

      const res = await axios.post('/api/users/auth', payload);

      setEmail("");
      setPassword("");
      setIsLoading(false);
      localStorage.setItem("isLoggedIn", res.data.token);
      toast({
        position: "top-right",
        title: "Login Succesful",
        description: res.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      router.push("/note/create");
    
    } catch(error) {
      toast({
        position: "top-right",
        title: "Login Error",
        description: error.response.data.error,
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
        <h3 style={{fontSize: '30px'}}>Login</h3> <br></br>
        <FormControl isRequired>
          <FormLabel  htmlFor="email">Email</FormLabel>
            <Input
              isRequired={true}
              value={email}
              onChange={(e: any) => setEmail(e.target.value)} 
              type="email" 
              id="email" 
              placeholder='Email'  
              aria-describedby="email-helper-text" />
        </FormControl><br/>
        <FormControl isRequired>
          <FormLabel htmlFor="pass">Password</FormLabel>
            <Input
              isRequired={true}
              type="password"
              id="pass"
              placeholder='Password'
              aria-describedby="email-helper-text"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              />
        </FormControl><br/>
        <FormControl>
          {
            isLoading === true ?
              <Button isLoading loadingText="Submitting" variantColor="teal">Login</Button>
            :
              <Button loadingText="Submitting" onClick={loginForm} variantColor="teal">Login</Button>
          }
        </FormControl>
      </div>
    </Layout>
  )
}
