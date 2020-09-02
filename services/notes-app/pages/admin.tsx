import Layout from '../components/Layout'
import UsersList from "../components/UsersList"
import useSwr from "swr"
import {Box} from "@chakra-ui/core"
import React from 'react'


const fetcher = (url:string) => fetch(url)
                    .then((res: { json: () => any }) => res.json())

// interface INotes {
//   body:string;
//   description:string;
//   author:string
// }

interface IUser {
  username:string;
  password:string;
  about:string;
  email:string;
  notes?:any
}

const Admin = () => {
  const {error,data} = useSwr("/api/users",fetcher)

  return(
    <Layout title="About | Next.js + TypeScript Example">
      <h3>Welcome to the secure admin page</h3>
      <Box>
        {error ? <div>Something went wrong</div> : 
        data && data.length > 1 ? <UsersList user={data} /> :
        <div>No User available</div>
      }
      </Box>
    </Layout>
  )
}

export default Admin