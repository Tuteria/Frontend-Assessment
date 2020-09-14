import {mutate} from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
	Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Modal, ModalBody,
	ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast
} from "@chakra-ui/core";
import React, {useContext, useState} from "react";
import {Header} from "@tuteria/components/src/ui-elements/header/header";
import {UserForm} from "@tuteria/components/src/ui-elements/userForm/userForm";

import styles from './layout.module.css';
import {NoteForm} from "@tuteria/components/src/ui-elements/noteForm/noteForm";
import {LoginForm} from "@tuteria/components/src/ui-elements/loginForm/loginForm";
import AuthContext, {setAuthToken, decodeToken, saveUserData, removeAuthToken} from "../../utils/auth";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);


export default function Layout({noteList, isAdminPage=false, userList}) {
	const router = useRouter();
	const toast = useToast();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditingNote, setIsEditingNote] = useState(false)
	const [formType, setFormType] = useState(null)
	const [noteProps, setNoteProps] = useState({})
	const [drawerHeader, setDrawerHeader] = useState('')
	const [notesDataList, setNotesDataList] = useState([])

	const {
		isAdmin, authenticatedUsername
	} = useContext(AuthContext);

	const onAddNewUserBtnSelect = () => {
		setIsDrawerOpen(true)
		setDrawerHeader('Create a new user')
		setFormType('user')
	}

	const onAddNewNoteBtnSelect = () => {
		setNoteProps({id: null, title: "", content: ""})
		setIsDrawerOpen(true)
		setDrawerHeader('Create a new note')
		setFormType('note')
	}

	const onEditNoteBtnSelect = (id, title, description) => {
		setNoteProps({id, title: title, content: description})
		setIsDrawerOpen(true)
		setDrawerHeader('Edit Note')
		setFormType('note')
		setIsEditingNote(true)
	}

	const onLoginBtnSelect = () => {
		setIsModalOpen(true)
	}

	const redirectOnLogin = (username, isAdministrator) => {
		if(isAdministrator) {
			router.push("/admin", '/admin', {
				shallow: true,
			});
		} else {
			router.push("/[username]", `/${username}`, {
				shallow: true,
			});
		}
	}
	const loginUser = async (username: any, password: any) => {
		try {

			const response = await axios.post('/api/users/login', {username, password})
			mutate('/api/notes', response);
			console.log(response.data)
			await setAuthToken(response.data.token);
			const decodedUser = decodeToken(response.data.token);
			await saveUserData(decodedUser['username'], decodedUser['is_admin']);
			redirectOnLogin(username, decodedUser['is_admin']);
			toast({
				title: `Welcome ${username}`,
				status: "success",
				position: "top",
				duration: 9000,
				isClosable: true
			});
			setIsModalOpen(false)

		} catch (err) {
			toast({
				title: "An error occurred.",
				description: "Unable to login user.",
				status: "error",
				position: "top",
				duration: 9000,
				isClosable: true
			})
		}
	}

	const onLogout = () => {
		removeAuthToken();
		router.push("/");
	}

	const onDeleteNoteBtnSelect = async (id) => {
		try {

			mutate('/api/notes', await axios.delete(`/api/notes/${id}`))
			toast({
				title: "Note deleted",
				description: "Note is deleted",
				status: "success",
				position: "top",
				duration: 9000,
				isClosable: true
			})

		} catch (err) {
			toast({
				title: "An error occurred.",
				description: "Note failed to delete",
				status: "error",
				position: "top",
				duration: 9000,
				isClosable: true
			})
		}
	}

	const createNewNote = async (title, description) => {
		try {
			mutate('/api/notes', await axios.post('/api/notes/create', {title, description}))

			toast({
				title: "Note added",
				description: "New Note is created",
				status: "success",
				position: "top",
				duration: 9000,
				isClosable: true
			});
			setIsDrawerOpen(false)
		} catch (err) {
			toast({
				title: "An error occurred.",
				description: "Unable to create a new note.",
				status: "error",
				position: "top",
				duration: 9000,
				isClosable: true
			})
		}
	}



	const editNote = async (noteId, title, description) => {
		try {
			mutate('/api/notes', await axios.put(`/api/notes/${noteId}`, {title, description}))

			toast({
				title: "Note edited",
				description: "Note updated",
				status: "success",
				position: "top",
				duration: 9000,
				isClosable: true
			});
			setIsDrawerOpen(false)
			setIsEditingNote(false)
			router.push('/');
		} catch (err) {
			toast({
				title: "An error occurred.",
				description: "Unable to edit note",
				status: "error",
				position: "top",
				duration: 9000,
				isClosable: true
			})
		}
	}

	const onViewClick = (note) => {
		setIsModalOpen(true)
		setNotesDataList(note)
	}

	return (
		<div className={styles.container}>
			<Header onLogin={onLoginBtnSelect} onLogout={onLogout} onCreateAccount={null} isAdmin={isAdmin}
							username={authenticatedUsername}
			/>
			<div className={styles.pageContent}>
				<div className={styles.actions}>
					{
						isAdmin ?
						<Button className={cx({isNotVisible: !isAdmin, btnIsVisible:true, userBtn: true})}
										color={"blue"} leftIcon={"add"} rightIcon={"moon"} onClick={() => onAddNewUserBtnSelect()}
						>
							Add new User
						</Button>
						: null
					}
					<Button variantColor="blue" variant="outline" leftIcon={"add"} rightIcon={"copy"}
									onClick={() => onAddNewNoteBtnSelect()}
					>
						Add new Note
					</Button>
				</div>
				{
					isAdminPage ?
						userList(onViewClick)
						:
						noteList(onEditNoteBtnSelect, onDeleteNoteBtnSelect)
				}
				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={"xl"}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{isAdminPage ? 'Users notes' : 'Signin'}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							{
								isAdminPage ? noteList(notesDataList) :
									<LoginForm onSubmit={loginUser}/>
							}
						</ModalBody>
					</ModalContent>
				</Modal>

				<Drawer isOpen={isDrawerOpen} placement="right" onClose={() => setIsDrawerOpen(false)} size={"lg"}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>{drawerHeader}</DrawerHeader>

						<DrawerBody>
							{
								formType === 'user' ? <UserForm/>: <NoteForm {...noteProps} isEditing={isEditingNote} onSubmit={createNewNote} onEditSave={editNote}/>
							}

						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</div>

			<style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

			<style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .formBtn {
          width: 100%;
          margin-top: 20vh;
        }

        .formField {
        	margin-bottom: 12px;
        }
      `}</style>
		</div>
	)
}
