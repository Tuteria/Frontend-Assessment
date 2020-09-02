import React from "react"
import {Box} from "@chakra-ui/core"
import Note from "./note"


interface INote {
  title:string;
  description:string;
}

interface IUser {
  username:string;
  about:string;
  email:string;
  notes?:INote[]
}

interface IUserList {
  user:IUser[];
}


const UserList:React.SFC<IUserList> = (props) => {
  console.log(props)
  return(
    <Box display="flex" alignItems="center"
     flexDirection="column" justifyContent="center" >
      {props.user.map((user,idx) => (
        <Box my="20px" mx="10px" borderRadius="10px" border="2px solid grey" width="40em" display="flex" alignItems="center"
        flexDirection="column" justifyContent="center" key={idx} >
          <Box fontSize="1.3em"  >
            {user.username} - <strong>{user.email}</strong>
          </Box>
          {user.notes && user.notes.map((note,idx) => (
            <Note {...note} key={idx} />
          ))}
        </Box>
      ))}
    </Box>
  )
}


export default UserList