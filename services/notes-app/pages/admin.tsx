import Layout from '../components/Layout'
import UsersList from "../components/UsersList"
import {Box,Stack,Textarea,Button,Input,Text} from "@chakra-ui/core"
import React from 'react'
import {IUser} from "../components//UsersList"
import {IToken} from "../interfaces"

interface IState { 
  username:string;
  password:string;
  email:string;
  about:string;
  admin:boolean;
}
interface IAlert {
  error:string;
  submitting:boolean;
  success:string;
}
interface IData {
  error:string;
  data:IUser[]
}

const Admin = () => {
  const [auth,setAuth] = React.useState<IToken | null>(null)
  const [state,setState] = React.useState<IData>({
    error:"",
    data:[]
  })
  React.useEffect(() => {
    const token = window.localStorage.getItem("jwtToken")
    if(token){
      const jwt = JSON.parse(token)
      setAuth(jwt)
      async function apiCall(){
        const response = await fetch("/api/users",{
          headers:{
            Authorization:`Bearer ${(jwt as IToken).token}`
          }
        })
        const result = await response.json()
        if(!(result.message)){
          setState({...state,data:(result as unknown as IUser[])})
        }
      }
      apiCall()
    }
  },[])
  const [body,setBody] = React.useState<IState>({
    username:"",
    password:"",
    email:"",
    about:"",
    admin:false
  })
  const [alert,setAlert] = React.useState<IAlert>({
    error:"",
    success:"",
    submitting:false
  })
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setBody({...body,[e.target.name]:e.target.value})
  }

  const handleSubmit = async () => {
    setAlert({...alert,submitting:true})
    const response = await fetch("/api/users/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(body)
    })
    const result = await response.json()
    console.log("this is the result returned",result)
    const newData = [...state.data,result]
    setState({...state,data:newData})
    if(result.username == body.username){
      setBody({
        password:"",
        email:"",
        username:"",
        about:"",
        admin:false
      })
      setAlert({submitting:false,success:"Create User Successful",error:""})
    }else{
      setAlert({submitting:false,success:"",error:"Something went wrong"})  
    }
  }
  if(!auth){
    return <div>Please Login</div>
  }else if(auth.user.admin){
    return(
      <Layout title="About | Next.js + TypeScript Example">
        <Text>Welcome to the secure admin page</Text>
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
           <Text>Create New User</Text>
          <Input my={2} name="username" onChange={handleChange} value={body.username}
           variant="flushed" isRequired placeholder="Username" focusBorderColor="blue.100" />
          <Input my={2} name="email" onChange={handleChange} value={body.email}
           variant="flushed" isRequired placeholder="email" focusBorderColor="blue.100" />
          <Input my={2} name="password" onChange={handleChange} value={body.password}
           variant="flushed" isRequired placeholder="password" focusBorderColor="blue.500" />
          <Textarea name="about" onChange={handleChange} value={body.about} height={"10em"} />
          <Button isDisabled={alert.submitting} onClick={handleSubmit}>
            {alert.submitting ? "Creating new user" : "Submit"}
          </Button>
        </Stack>
        <Box>
          {state.error ? <div>Something went wrong</div> : 
          (state.data as IUser[]).length > 0 ? <UsersList user={(state.data as IUser[])} /> :
          <div>No User available</div>
        }
        </Box>
      </Layout>
    )
  }else{
    return <div>Protected Route</div>
  }
}

export default Admin