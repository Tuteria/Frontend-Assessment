import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Button, Flex, FormControl, FormLabel,
  Input, Textarea, useToast
} from '@chakra-ui/core';
import {
  Container, Layout, Nav, DeleteNote
} from '../../../../../components';
import { HOST_URL, ERROR, SUCCESS } from '../../../../../constants';

export const getServerSideProps = async ({params}) => {
  try {
    const {username, noteId} = params;
    const note = await axios.get(`${HOST_URL}/api/users/${username}/notes/${noteId}`)
    return {
      props: {
        status: SUCCESS,
        username: params.username,
        note: note.data.data,
      },
    }
  } catch (err) {
    return {
      props: {
        status: ERROR,
        note: [],
      },
    }
  }
}

export default function UserNote({status, note, username}) {
  const router = useRouter();
  const toast = useToast();

  if (status === ERROR) {
    return (
      <>
        {toast({
          title: "An error occurred.",
          description: "Something went wrong. Try again",
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true
        })}
      </>
    )
  }

  return (
    <Layout>
      <Nav/>
      <Container>
        <form>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              isDisabled
              variant="unstyled"
              value={note.title}
            />
          </FormControl>
          <hr className="line"/>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              variant="unstyled"
              isDisabled          
              value={note.description}
            />
          </FormControl>
        </form>
      </Container>
      <style jsx>{`
        .line {
          height: 2px;
          background-color: #3E576A;
          margin-top: 10px;
      }
      `}</style>
    </Layout>
  )
}
