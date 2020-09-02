import React from "react";
import Link from "next/link"
import {Box} from "@chakra-ui/core" 
import {Skeleton} from "@chakra-ui/core"

interface INote { 
  [key:string]:string | number
}

const Note:React.SFC<INote> = ({title,description,...props}) => {
  if(title !== undefined){
    return (
      <Link className="linkContainer" style={{cursor:"pointer"}} href={`/users/${props.username}/notes`} >
      <>
        <Box mx={2} my={5} background="brown" width={"50%"} px={3} py={5}
          textAlign="center" fontSize="1em" color="whitesmoke" borderRadius={".5em"} >
        <Box fontSize="1.5em" display={"block"}>{title}</Box>
        <em>{description}</em> - {props.author_id && props.author_id}
      </Box>
        <style jsx>{
          `
          .linkContainer{
            cursor:pointer;
            box-shadow:15px 15px 15px rgba(0,0,0,6)
          }
          `
        }</style>
      </>
      </Link>
    )
  }else{
    return(
      <Skeleton colorStart="whitesmoke" width="60%" my={3} mx={2} colorEnd="black" height="60px" />
    )
  }
}


export default Note