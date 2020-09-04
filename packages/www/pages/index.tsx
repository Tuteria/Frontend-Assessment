import Head from 'next/head';
import axios from 'axios';
import { Button, Box, useToast } from '@chakra-ui/core';
import {
  Container, Layout, Nav, Note
} from '../components';
import { HOST_URL, ERROR, SUCCESS } from '../constants';

export const getServerSideProps = async () => {
  try {
  const res = await axios.get(`${HOST_URL}/api/notes`)
    return {
      props: {
        status: SUCCESS,
        notes: res.data.data,
      },
    }
  } catch(err) {
    return {
      props: {
        status: ERROR,
        notes: [],
      },
    }
  }

}

export default function Home({status, notes}) {
  const toast = useToast();
  return (
    <Layout>
      <Nav/>
      <Container>
      <Button
        leftIcon="add"
        variantColor="teal"
        marginBottom={4}
        borderRadius={7}
        fontSize={14}
        ml={2} mr={2}
      >
        <a href="/notes/create">Add Note</a>
      </Button>
      {status === ERROR ?
        toast({
          title: "An error occurred.",
          description: "Something went wrong. Try again",
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true
        }) : 
        notes.map(({id, title}) => (
          <Note key={id} id={id} title={title} />
        ))
      }
      <Box mb={10}></Box>
      </Container>
    </Layout>
  )
}
