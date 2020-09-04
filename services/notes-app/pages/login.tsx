import Layout from '../components/Layout'
import {Box,Stack,Button,Input,Text} from "@chakra-ui/core"
import {useRouter} from "next/router"
import React from 'react'
import saveToken from "../auth-helpers/saveToLocal"


interface IState { 
  password:string;
  email:string;
}
interface IAlert {
  error:string;
  submitting:boolean;
  success:string;
}
                    


const Login = () => {
  const [body,setBody] = React.useState<IState>({
    email:"",
    password:""
  })
  const [alert,setAlert] = React.useState<IAlert>({
    error:"",
    success:"",
    submitting:false
  })
  const router = useRouter()

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setBody({...body,[e.target.name]:e.target.value})
  }
  const handleSubmit = async () => {
    setAlert({...alert,submitting:true})
    const response = await fetch("/api/users/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(body)
    })
    const result = await response.json()
    console.log("This is the result",result)
    if(result.message.indexOf("Successful") > 1){
      router.push("/")
      saveToken({
        token:result.token,
        user:result.user
      })
      setBody({
        password:"",
        email:""
      })
      setAlert({submitting:false,success:"Login Successful",error:""})
    }else{
      setAlert({submitting:false,success:"",error:"Something went wrong"})  
    }
  }
  

  return(
    <Layout>
      <Text>Please Login</Text>
        {
          alert.error.length > 3 &&
        <Box width={"75%"} background="red" color="black" >
          <Text textAlign="center" fontSize="1.9em">
            {alert.error}
          </Text>
        </Box>
        }
        {
          alert.success.length > 3 &&
        <Box width={"75%"} background="blue" color="whitesmoke" >
          <Text textAlign="center" fontSize="1.9em">
            {alert.success}
          </Text>
        </Box>
        }
        <Stack display="flex" justifyContent="center" alignItems="center"
        margin="auto"
        flexDirection="column" width={"75%"} >
          <Text>Login To Your Account</Text>
          <Input my={2} name="email" onChange={handleChange} value={body.email}
          variant="flushed" isRequired placeholder="email" focusBorderColor="blue.100" />
          <Input my={2} name="password" onChange={handleChange} value={body.password}
          variant="flushed" isRequired placeholder="password" focusBorderColor="blue.500" />
          <Button isDisabled={alert.submitting} onClick={handleSubmit}>
            {alert.submitting ? `Login ${body.email}` : "Submit"}
          </Button>
        </Stack>
    </Layout>

  )
}

export default Login