import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../../../components/Loader'
import Layout from '../../../components/Layout'
import { Heading, Text, Box } from "@chakra-ui/core";


const fetcher = async (url) => {
  const response = await fetch(url);
  return await response.json();
};


export default function Notes() {
  const router = useRouter()
  const { noteId } = router.query
  const { data, error } = useSWR(`/api/notes/${noteId}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader label='Loading...' />

  return (
    <Layout>
      <div style={{width: '30%', margin: '5% auto'}}>
        <Box p={4} shadow="md" borderWidth="1px" flex="1" rounded="md">
          <Heading as="h1" size="lg" letterSpacing={".3rem"} fontSize="lg">{data.data.title}</Heading>
          <Text mt={4}>{data.data.description}</Text>
          <i>
            <br/>
          {
            data.data?.user ? 
            <>
          By - &nbsp;
           <Link href='/users/[username]/notes' as={`/users/${data.data?.user}/notes`}>
             {data.data?.user}
          </Link>
          </>
          : 'By -  Anonymous'
          }
          </i>
        </Box>
      </div>
    </Layout>
      
  )
}
