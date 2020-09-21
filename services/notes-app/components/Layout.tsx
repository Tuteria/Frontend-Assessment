import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {useRouter} from "next/router"
import {Box,Button} from "@chakra-ui/core"
import removeToken from "../auth-helpers/removeToken"

type Props = {
  children?: ReactNode
  title?: string
}
interface IToken {
  token:string;
  user:{
    username:string;
    email:string;
    id:string;
    admin:boolean;
  }
}



const Layout = ({ children, title = 'This is the default title' }: Props) => {

  const [auth,setAuth ] = React.useState<IToken| null>(null)
  const router = useRouter()
  const handleLogout = () => {
    removeToken()
    router.push("/")
  }
  React.useEffect(() => {
    const token = window.localStorage.getItem("jwtToken")
    if(token !== null){
      setAuth(JSON.parse(token))
    }
  },[])
  console.log(auth?.user.id)
  return(
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box bg="whitesmoke" color="black" width="100%"
       height="40px" display="flex" justifyContent="space-between"
        alignItems="center" >
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
            <Link href="/login">
              <a>Login</a> 
            </Link>
          {
            auth?.user.admin &&
            <>
              |{' '}
              <Link href="/admin">
                <a>Admin</a>
              </Link>
            </>
          }
          {auth &&
          <>
          |{' '}
          <Link style={{marginRight:"auto"}} href={`/user/${auth.user.username}`}>
            Profile
          </Link>
          <Button ml="auto" style={{
            position:"absolute",
            right:"10px",
            top:0
          }} backgroundColor="tomato" onClick={handleLogout} >
            <Link href="/">
              Logout
            </Link>
          </Button>
          </>
           }
        </nav>
      </Box>
      {children}
    </div>
  )  
}
export default Layout
