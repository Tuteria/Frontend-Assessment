import { FunctionComponent, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import cookies from 'react-cookies';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Box, Heading, useToast, Text } from '@chakra-ui/core';
import {
  Container, Layout, Nav, Note
} from '../../../../components';
import { HOST_URL, ERROR, SUCCESS } from '../../../../constants';
import retrieveToken from '../../../../utils/retrieveToken';

type Note = {
  id: string
  title: string
  description: string
  user_id: null
}

export interface UserNotesProps {
  status: string,
  message?: string,
  username?: string,
  notes: Note[]
}

export const getServerSideProps:GetServerSideProps = async ({req, params}) => {
  const token = retrieveToken(req);
  if (!token) {
    return {
      props: {
        status: "error",
        message: 'You are not logged in',
        notes: [],
      },
    }
  }
  try {
    const res = await axios.get(`${HOST_URL}/api/users/${params.username}/notes`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    const notes = res.data.data.sort((a, b) => b.id - a.id)
    return {
      props: {
        status: SUCCESS,
        username: params.username,
        notes: notes,
      },
    }
  } catch(err) {
    return {
      props: {
        status: ERROR,
        message: 'Something went wrong. Try again',
        notes: [],
      },
    }
  }

}

const UserNotes: FunctionComponent<UserNotesProps> = ({status, message, username, notes}) => {
  const toast = useToast();
  const router = useRouter();
  const isLoggedIn = cookies.load('token');
  const isAdmin = isLoggedIn === process.env.NEXT_PUBLIC_ADMIN_TOKEN
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  })

  return (
    <Layout>
      <Nav/>
      <Container>
      {!isAdmin && 
        <Button
          leftIcon="add"
          variantColor="teal"
          borderRadius={7}
          fontSize={14}
          ml={2} mr={2} mb={3}
        >
          <a href={`/users/${username}/notes/create`}>Add Note</a>
        </Button>
      }
      {status === ERROR ?
        toast({
          title: "An error occurred.",
          description: `${message}`,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true
        }) : notes.length === 0 ?

          <Text fontSize={18} textAlign="center">
            {isAdmin ? 'No notes' :' You have not created any note. Start adding notes.'}
          </Text> :
          <Box>
            <Heading textAlign="center" color="#3E576A" as="h3" size="lg" mt={1} mb={2}>
              {isAdmin ? `${username}'s notes` : 'My Notes'}
            </Heading>
            {notes.map(({id, title}) => (
              <Note key={id} id={id} title={title} username={username}/>
            ))}
          </Box>
      }
      <Box mb={10}></Box>
      </Container>
    </Layout>
  )
}

export default UserNotes;
