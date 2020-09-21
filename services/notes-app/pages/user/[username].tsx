import Layout from '../../components/Layout'
import NoteList from "../../components/notelist"
import {Stack,Textarea,Button,Input,Text} from "@chakra-ui/core"
import React from 'react'
import {IToken,INote} from "../../interfaces"

interface IProps {
  data:INote[];
  username:string;
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


const User:React.FC<IProps> = (props) => {
  const nullArr = new Array(10).fill(null)
  const [body,setBody] = React.useState<IState>({
    title:"",
    description:""
  })
  const [note,setNote] = React.useState(props.data)
  const [auth,setAuth] = React.useState<IToken>()
  const [alert,setAlert] = React.useState<IAlert>({
    error:"",
    success:"",
    submitting:false
  })

  React.useEffect(() => {
    const token = window.localStorage.getItem("jwtToken")
    if(token !== null){
      setAuth(JSON.parse(token))
    }
  },[])


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setBody({...body,[e.target.name]:e.target.value})
  }
  console.log(props.data)
  const handleSubmit = async () => {
    setAlert({...alert,submitting:true})
    const response = await fetch("/api/notes/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify({...body,...(auth !== null && {author:(auth as IToken).user.username})})
    })
    const result = await response.json()
    console.log("this is the result",result)
    if(result.title == body.title){
      const newNote = [...note,result]
      setNote(newNote)
      setBody({
        title:"",
        description:""
      })
      setAlert({submitting:false,success:"Created Note successfull",error:""})
    }else{
      setAlert({submitting:false,success:"",error:"Something went wrong"})  
    }
  }
  return(
    <Layout>
        {(auth as IToken)?.user.username == props.username &&(
          <Stack display="flex" justifyContent="center" alignItems="center"
          margin="auto"
          flexDirection="column" width={"75%"} >
          <Text>Create New Note for {props.username} </Text>
          <Input my={2} name="title" onChange={handleChange} value={body.title}
            variant="flushed" isRequired placeholder="Create Title for Note" focusBorderColor="blue.100" />
          <Textarea name="description" onChange={handleChange} value={body.description} height={"10em"} />
          <Button isDisabled={alert.submitting} onClick={handleSubmit}>
            {alert.submitting ? `Creating new note for ${props.username}` : "Submit"}
          </Button>
        </Stack>  
        )}
        {note.length > 0 && <NoteList notes={(note as INote[]) || nullArr} />}
    </Layout>
  )
}

export async function getServerSideProps(context: { params: { username: any } }) {
  // Fetch data from external API
  if(context.params.username){
    const res = await fetch(`http://localhost:3001/api/users/${context.params.username}/notes`,{
      method:'GET',
      headers:{
        "Accept":"application/json"
      }
    })
    const data:INote = await res.json()  
    // Pass data to the page via props
    return { props: { data,username:context.params.username } }
  }
}

export default User
