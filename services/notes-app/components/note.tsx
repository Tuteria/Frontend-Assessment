import React from "react";
import {Box,Button,Skeleton} from "@chakra-ui/core" 

interface INote { 
  handleDelete:() => {};
  note:{
    title:string;
    description:string;
    author?:string;
  }
}
interface IState {
  token:string;
  user:{
    [key:string]:string
  }
}

const Note:React.SFC<INote> = ({note,handleDelete}) => {
  const [ auth,setAuth ] = React.useState<IState| null>(null)

  React.useEffect(() => {
    const token = window.localStorage.getItem("jwtToken")
    if(token !== null){
      setAuth(JSON.parse(token))
    }
  },[])

  

  if(note){
    return (
      // <Link className="linkContainer" style={{cursor:"pointer"}} href={`/users/${props.username}/notes`} >
      <>
        <Box mx={2} my={5} background="brown" width={"50%"} px={3} py={5}
          textAlign="center" fontSize="1em" color="whitesmoke" borderRadius={".5em"} >
        <Box fontSize="1.5em" display={"block"}>{note.title}</Box>
        <em>{note.description}</em> - {note.author}
        {auth && auth.user.username === note.author && 
          <Button onClick={handleDelete} variantColor="teal" variant="solid" size="md" >
            Delete
          </Button>}
      </Box>
        <style jsx>{
          `
          .linkContainer{
            cursor:pointer;
            box-shadow:15px 15px 15px rgba(0,0,0,6)
            display:none
          }
          `
        }</style>
      </>
      // </Link>
    )
  }else{
    return(
      <Skeleton colorStart="whitesmoke" width="60%" my={3} mx={2} colorEnd="black" height="60px" />
    )
  }
}


export default Note