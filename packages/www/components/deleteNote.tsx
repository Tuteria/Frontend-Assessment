import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter, useDisclosure,
  useToast
} from '@chakra-ui/core';

export interface DeleteNoteProps {
  noteId: string,
  username: string
}

const DeleteNote: FunctionComponent<DeleteNoteProps> = ({noteId, username}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter()

  let requestUrl = `/api/notes/${noteId}`
  let redirectUrl = '/';
  if (username) {
    requestUrl = `/api/users/${username}/notes/${noteId}`;
    redirectUrl = `/users/${username}/notes`
  }

  const deleteNote = async () => {
    onClose()
    
    try {
      const response = await axios.delete(requestUrl)
      toast({
        title: "Note deleted",
        description: "Note successfully deleted",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true
      })
      setTimeout(() => {
        router.push(redirectUrl);
      }, 1500)
    } catch (err) {
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
    <>
      <Button
        onClick={onOpen}
        leftIcon="delete"
        variantColor="red"
        borderRadius={7}
        fontSize={14}
        ml={1} mr={1}
      >
        Delete
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent borderRadius={10}>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this note?
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
                variantColor="blue"
                borderRadius={7}
                fontSize={14}
                mr={3}
                onClick={deleteNote}
              >
                Yes
            </Button>
            <Button
              variantColor="red"
              onClick={onClose}
              borderRadius={7}
              fontSize={14}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteNote;
