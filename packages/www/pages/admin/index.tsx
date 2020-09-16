import useSwr from 'swr';
import Link from 'next/link'
import {useContext} from "react";
import AuthContext from "../../utils/auth";
import Layout from "../../src/layout/layout";
import NoteList from "@tuteria/components/src/ui-elements/noteList/noteList";
import Table from "@tuteria/components/src/ui-elements/table/table";


const fetcher = (url) => fetch(url).then((res) => res.json())

 const AdminPage = ({children}) => {
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
			<div className="adminContainer">
				<p>Page not found.</p>
				<p>Go
					<Link href="/">
						<a>Home</a>
					</Link>
				</p>
				<style jsx>{`
        .notFound {
					height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
				}

				.notFound p {
          font-size: 24px;
				}

				.notFound a {
          color: blue;
          margin-left: 10px;
				}
      `}</style>
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
			<style jsx>{`
        .adminContainer {
          width: 100%;
				}
      `}</style>
		</div>
	)
}

export default AdminPage;


