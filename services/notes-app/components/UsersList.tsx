import React from "react"
import Link from "next/link"
import {Box,Skeleton,Text,Checkbox} from "@chakra-ui/core"
import NoteList from "./notelist"
import {IToken} from "../interfaces/"

interface INote {
  title:string;
  description:string;
  id:number;
  author?:string
}

export interface IUser {
  username:string;
  about:string;
  email:string;
  admin:boolean;
  notes:INote[] | null[]
}

interface IUserList {
  user:IUser[];
}


const UserList:React.SFC<IUserList> = ({user}) => {
  const [alert,setAlert] = React.useState({
    success:"",
    error:""
  })
  console.log(user.length)
  const [jwt,setJwt] = React.useState<IToken| null >(null)
  const [userDetail,setUserDetail] = React.useState(user)

  React.useEffect(() => {
    setUserDetail(user)
  },[user])
  
  React.useEffect(() => {
    const token = window.localStorage.getItem("jwtToken")
    if(token){
      const auth = JSON.parse(token)
      setJwt(auth)
      }
  },[])
  
  const handleAdminToggle = (username:string) => async () => {
    const newUserDetail = userDetail.map((user) => {
      if(user.username === username){
        const curAdminValue = user.admin
        user.admin = !curAdminValue
      } 
      return user
    })
    setUserDetail(newUserDetail)
    try{
      const response = await fetch(`/api/users/${username}/admin`,{
        method:"PUT",
        headers:{
          "Accept":"application/json",
          "Authorization":`Bearer ${jwt!.token}`
        }
      })
      const result = await response.json()
      if(result.message.indexOf("S") > 0){
        setAlert({...alert,success:`${username} admin status is now ${result.data.admin}`})
      }else{
        setAlert({...alert,error:"Something went wrong unable to complete admin update"})
      }
      setTimeout(() => {
        setAlert({success:"",error:""})
      },2500)
    }catch(err){
      console.log(err)
    }
  }

  return(
    <Box display="flex" alignItems="center"
      flexDirection="column" justifyContent="center" >
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
        
        {userDetail.map((user,idx) => (
          <Skeleton key={idx} isLoaded={Boolean(user.username)} >
            <Box my="20px" mx="10px" borderRadius="10px" border="2px solid grey" width="40em" display="flex" alignItems="center"
            flexDirection="column" justifyContent="center" key={idx} >
              <Link href={`/user/${user.username}`} >
                <Box fontSize="1.3em"  >
                  {user.username} - <strong>{user.email}</strong>
                </Box>
              </Link>
              <Box display="flex" justifyContent="center" alignItems="center" >
                <span style={{marginRight:"10px"}} >Admin ?</span>
                <Checkbox onChange={handleAdminToggle(user.username)}
                 isChecked={user.admin} />
              </Box>
              {/* {user.notes && user.notes.map((note,idx) => (
                <Note note={note} handleDelete={} key={idx} />
              ))} */}
              <NoteList notes={user.notes} />
              { user.notes && user.notes.length < 1 && <Text>No Notes yet from this user</Text>}
            </Box>
        </Skeleton>
        ))}
      </Box>
  )
}


export default UserList