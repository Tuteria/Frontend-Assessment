import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookies from 'react-cookies';
import {
  Button, Flex, FormControl, FormLabel,
  Input, Textarea, useToast, Heading
} from '@chakra-ui/core';
import {
  Container, Layout, Nav
} from '../../../../components';
import { COOKIE_TOKEN } from '../../../../constants';

export const getServerSideProps = async ({params}) => {
  return {
    props: {
      username: params.username
    },
  }
}

export default function CreateUserNote({username}) {
  const router = useRouter();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [isEmptyDescription, setIsEmptyDescription] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleTitleChange = event =>{
    setTitle(event.target.value)
    setIsEmptyTitle(false);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
    setIsEmptyDescription(false);
  };
  
  const addNote = async(event) => {
    event.preventDefault();
    if (title.trim().length === 0) {
      setIsEmptyTitle(true);
      return;
    }
    if (description.trim().length === 0) {
      setIsEmptyDescription(!isEmptyDescription);
      return;
    }
    setIsSending(true);
    const token = cookies.load(COOKIE_TOKEN);
    try {
      const response = await axios.post(`/api/users/${username}/notes/create`, {
        title,
        description
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast({
        title: "Note added",
        description: "Note successfully added",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true
      });
      setTimeout(() => {
        router.push(`/users/${username}/notes`);
      }, 1500)
    } catch (err) {
      setIsSending(false);
      toast({
        title: "An error occurred.",
        description: "Something went wrong. Try again",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true
      })
    }
  }

  return (
    <Layout>
      <Nav/>
      <Container>
        <Heading textAlign="center" color="#3E576A" as="h3" size="lg" mt={2} mb={5}>
          Add a new note
        </Heading>

        <form>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter note title here"
              variant={isEmptyTitle ? "outline" : "unstyled"}
              value={title}
              onChange={handleTitleChange}
              isInvalid={isEmptyTitle}
            />
          </FormControl>
          <hr className="line"/>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter the note description here"
              variant={isEmptyDescription ? "outline" : "unstyled"}
              onChange={handleDescriptionChange}
              value={description}
              isInvalid={isEmptyDescription}
            />
          </FormControl>
          <Flex mt={4} mb={5} justify="flex-end">
            <Button
              type="submit"
              onClick={addNote}
              variantColor="blue"
              borderRadius={7}
              fontSize={14}
              ml={1} mr={1}
              isLoading={isSending}
              loadingText="Saving"
            >
              Add Note
            </Button>
          </Flex>
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
