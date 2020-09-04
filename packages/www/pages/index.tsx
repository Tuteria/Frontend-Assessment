import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Button, Box, useToast } from '@chakra-ui/core';
import {
  Container, Layout, Nav, Note
} from '../components';
import { HOST_URL, ERROR, SUCCESS } from '../constants';
import { FunctionComponent } from 'react';

type Note = {
  id: string
  title: string
  description: string
  user_id: null
}

export interface HomeProps {
  status: string,
  notes: Note[]
}

export const getServerSideProps:GetServerSideProps = async () => {
  try {
    const res = await axios.get(`${HOST_URL}/api/notes`)
    const notes = res.data.data.sort((a, b) => b.id - a.id)
    return {
      props: {
        status: SUCCESS,
        notes: notes,
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

const Home: FunctionComponent<HomeProps> = ({status, notes}) => {
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

export default Home;
