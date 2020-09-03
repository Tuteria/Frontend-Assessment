// import { GetServerSideProps,InferGetServerSidePropsType } from 'next'
import Layout from '../../components/Layout'
import {NoteList} from "../../components/notelist"
import {Box,Stack,Textarea,Button,Input,Text} from "@chakra-ui/core"
import React from 'react'

interface IData {
  title:string;
  description:string
  author_id:number
}

interface IProps {
  user?:{
    username:string;
    email:string;
    about:string;
  }
  data:IData[]
}
interface IState { 
  title:string;
  description:string;
}
interface IAlert {
  error:string;
  submitting:boolean;
  success:string;
}


const User:React.SFC<IProps> = (props) => {
  const nullArr = new Array(10).fill(null)
  const [body,setBody] = React.useState<IState>({
    title:"",
    description:""
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
    const response = await fetch("/api/notes/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(body)
    })
    const result = await response.json()
    if(result.title == body.title){
      setBody({
        title:"",
        description:""
      })
      setAlert({submitting:false,success:"Created Note successfull",error:""})
    }else{
      setAlert({submitting:false,success:"",error:"Something went wrong"})  
    }
  }
  const handleDelete = async (notesId:number) => {
    setAlert({...alert,submitting:true})
    const response = await fetch(`/api/notes/${notesId}`,{
      method:"DELETE",
      headers:{
        "Accept":"applcation/json"
      }
    })
    const result = await response.json()
    if(result.message.indexOf("Successful")){
      setAlert({submitting:false,success:"Note successfully deleted",error:""})
    }else{
      setAlert({submitting:false,success:"",error:"Action was not successful"})
    }
  }
  

  console.log(props)
  return(
    <Layout>
        <Stack display="flex" justifyContent="center" alignItems="center"
          margin="auto"
        flexDirection="column" width={"75%"} >
          <Text>Create New Note</Text>
          <Input my={2} name="username" onChange={handleChange} value={body.title}
            variant="flushed" isRequired placeholder="Username" focusBorderColor="blue.100" />
          <Textarea name="about" onChange={handleChange} value={body.description} height={"10em"} />
          <Button isDisabled={alert.submitting} onClick={handleSubmit}>
            {alert.submitting ? "Creating new user" : "Submit"}
          </Button>
        </Stack>  
        <NoteList notes={props.data || nullArr} />
    </Layout>
  )
}

export async function getServerSideProps(context: { params: { username: any } }) {
  // Fetch data from external API
  if(context.params.username){
    console.log(context.params.username)
    const res = await fetch(`http://localhost:3001/api/users/${context.params.username}/notes`,{
      method:'GET',
      headers:{
        "Accept":"application/json"
      }
    })
    const data:IData = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
}

export default User
