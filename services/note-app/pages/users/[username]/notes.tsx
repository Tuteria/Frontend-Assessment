import React, { useEffect, useState } from 'react'
import { SimpleGrid, Heading } from "@chakra-ui/core";
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../../../components/Loader'
import Card from '../../../components/Card'
import Layout from '../../../components/Layout'
import jwtDecode from 'jwt-decode'


const fetcher = async (url) => {
  const response = await fetch(url);
  return await response.json();
};


export default function Notes() {
  const router = useRouter()
  let [auth, setAuth] = useState(false);
  const { username } = router.query
  const { data, error } = useSWR(`/api/users/${username}/notes`, fetcher)

  useEffect(() => {
      const token = localStorage.getItem("isLoggedIn");
      if(token) {
        const decode = jwtDecode(token)
        if (decode.username == username || decode.role.toLowerCase() === 'admin')
          setAuth(true);
      }
    }
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader label='Loading...' />

  return (
    <Layout>
      <div style={{padding:  '5%', width: '80%', margin: '0 auto'}} >
        <Heading as="h3" size="lg" style={{textDecoration: 'underline'}}>{data.data.username}'s notes</Heading><br />
      <SimpleGrid columns={[1, null, 4]} spacing="40px" >
        {
          data.data.notes.map(d => {
            return (
              <Card
                key={d.id}
                id={d.id}
                title={d.title}
                desc={d.description.substring(0, 50) + '...'}
                isAdminOrMine={auth}
              />
            )
          })
        }
      </SimpleGrid>
      
      </div>
    </Layout>
      
  )
}
