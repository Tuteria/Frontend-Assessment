import Head from 'next/head';
import useSwr, {mutate} from 'swr';
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router';

import { useToast } from "@chakra-ui/core";
import {useContext} from "react";
import NoteList from "@tuteria/components/src/ui-elements/noteList";
import Layout from "../../src/layout";
import AuthContext, {getAuthToken} from "../../utils/auth";
import {Table} from "@tuteria/components/src/ui-elements/table";


const fetcher = (url) => fetch(url).then((res) => res.json())
// const fetcher = (url) => fetch(url, { headers: { Authorization: `Bearer ${getAuthToken()}`}}).then((res) => res.json())
// const fetcher = (url) => axios.get(url, { headers: { Authorization: `Bearer ${getAuthToken()}`}}).then((res) => res.json());
// const fetcher = (url) => axios.get(url).then((res) => res.json());

 const AdminPage = ({children}) => {
	const router = useRouter();
	const toast = useToast();
	let isLoading = false;
	let users = [];

	 const {
		 isAdmin
	 } = useContext(AuthContext);

	const { data, error } = useSwr('/api/users', fetcher)

	if (error) return <div>Failed to load users</div>;
	if (!data) isLoading = true;

	if (!isAdmin) {
		return (
			<div className="notFound1">
				<p>Page not found.</p>
				<p>Go
					<Link href="/">
						<a>Home</a>
					</Link>
				</p>
			</div>
		);
	}

	users = data?.users
	 console.log(data)

	return (
		<div className="adminContainer">
			<Layout
				noteList={(notesData) => (
					<NoteList loading={isLoading} notes={notesData} onEditClick={() => {}} onDeleteClick={() => {}} isActionable={false}/>
				)}
				isAdminPage={true}
				userList={
					(onViewClick) => (
						<Table onRowViewClick={onViewClick} users={users} loading={isLoading} />
				)}
			/>
		</div>
	)
}

export default AdminPage;


