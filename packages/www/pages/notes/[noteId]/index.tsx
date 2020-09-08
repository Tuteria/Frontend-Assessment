import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
  Button, Flex, FormControl,
  FormLabel, Input, Textarea, useToast
} from '@chakra-ui/core';
import {
  Container, Layout, Nav, DeleteNote
} from '../../../components';
import {  ERROR, SUCCESS } from '../../../constants';

export const getServerSideProps = async ({req, params}) => {
  const { origin } = absoluteUrl(req);

  try {
    const note = await axios.get(`${origin}/api/notes/${params.noteId}`)
    return {
      props: {
        status: SUCCESS,
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

export default function Note({status, note}) {
  const toast = useToast();
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [notEditable, setNotEditable] = useState(true);
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

  const edit = () => setNotEditable(!notEditable)
  
  const cancel = () => {
    setTitle(note.title);
    setDescription(note.description);
    setNotEditable(true);
  }
  
  const saveNote = async(event) => {
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
    try {
      const response = await axios.put(`/api/notes/${note.id}`, {
        title,
        description
      })
      toast({
        title: "Note updated",
        description: "Note successfully updated",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true
      })
      setTimeout(() => {
        router.reload();
      }, 2000)
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
        {notEditable ?
          (
            <Flex justify="flex-end" >
              <Button
                onClick={edit}
                leftIcon="edit"
                variantColor="teal"
                borderRadius={7}
                fontSize={14}
                ml={1} mr={1}
              >
                Edit
              </Button>
              <DeleteNote noteId={note.id} username={null}/>
            </Flex>
          ) : null
        }
        <form>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              isDisabled={notEditable}
              variant={notEditable ? "unstyled" : "outline"}
              value={title}
              onChange={handleTitleChange}
              isInvalid={isEmptyTitle}
            />
          </FormControl>
          <hr className="line"/>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              variant={notEditable ? "unstyled" : "outline"}
              isDisabled={notEditable}
              onChange={handleDescriptionChange}
              value={description}
              isInvalid={isEmptyDescription}
            />
          </FormControl>
          {!notEditable ? 
            (
              <Flex mt={4} mb={5} justify="flex-end">
                <Button
                  type="submit"
                  onClick={saveNote}
                  variantColor="blue"
                  borderRadius={7}
                  fontSize={14}
                  ml={1} mr={1}
                  isLoading={isSending}
                  loadingText="Saving"
                >
                  Save Note
                </Button>
                <Button
                  onClick={cancel}
                  variant="outline"
                  borderRadius={7}
                  fontSize={14}
                  isDisabled={isSending}
                >
                  Cancel
                </Button>
              </Flex>
            ) : null
          }
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
