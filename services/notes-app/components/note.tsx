import React from "react";
import {Box,Button,Skeleton} from "@chakra-ui/core" 
import {useRouter} from "next/router"
import Link from "next/link"

interface INote { 
  handleDelete(arg:any):Promise<any>;
  note:{
    title:string;
    description:string;
    author?:string;
    id:string
  }
}
interface IState {
  token:string;
  user:{
    [key:string]:string
  }
}

const Note:React.FC<INote> = ({note,handleDelete}) => {
  const [ auth,setAuth ] = React.useState<IState| null>(null)
  const router = useRouter()
  const atHome = router.pathname === "/"
  React.useEffect(() => {
    const token = window.localStorage.getItem("jwtToken")
    if(token !== null){
      setAuth(JSON.parse(token))
    }
  },[])

  

  if(note){
    return (
      <Link className="linkContainer" style={{cursor:"pointer"}} href={`/notes/${note.id}`} >
        <Box mx={2} my={5} background="brown" width={"50%"} px={3} py={5}
          textAlign="center" fontSize="1em" color="whitesmoke" borderRadius={".5em"} >
          <Box fontSize="1.5em" display={"block"}>
            {note.title}
          </Box>
          <Box>
            {!atHome ?
              <Box>
              <em>{note.description}</em> {note.author && ` - ${note.author}`}
              </Box> : 
              <Box>{note.author}</Box>
            }
            {auth?.user.username === note.author && 
              <Button display="block" mx="auto" mt="10px" onClick={handleDelete} variantColor="teal" variant="solid" size="md" >
                Delete
              </Button>}
          </Box>
      </Box>
      </Link>
    )
  }else{
    return(
      <Skeleton colorStart="whitesmoke" width="60%" my={3} mx={2} colorEnd="black" height="60px" />
    )
  }
}


export default Note