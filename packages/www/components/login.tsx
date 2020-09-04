import React, {FunctionComponent} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/core";

function login() {
  const initialRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  function submit() {
    onClose()
  }
  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        variantColor="teal"
        borderRadius={7}
        fontSize={20}
        color="#3E576A"
        p={2}
      >
        Login
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg="blue">
          <Box bg="#F3EEE9" borderRadius={7}>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input ref={initialRef} placeholder="username" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input placeholder="Password" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button 
                variantColor="blue"
                mr={3}
                borderRadius={7}
                onClick={submit}
              >
                Login
              </Button>
              <Button onClick={onClose} borderRadius={7} >Cancel</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default login;
