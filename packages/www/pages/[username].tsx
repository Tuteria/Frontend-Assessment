import useSwr from 'swr';
import { useRouter } from 'next/router';
import NoteList from "@tuteria/components/src/ui-elements/noteList/noteList";
import Layout from "../src/layout/layout";


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function UserPage() {
	const router = useRouter();
	const { username } = router.query
	let isLoading = false;
	let notes = [];

	const { data, error } = useSwr(`/api/users/${username}`, fetcher)

	if (error) return <div>Failed to load users</div>
	if (!data) isLoading = true

	notes = data?.notes

	return (
		<div>
			<Layout noteList={(onEdit, onDelete) => (
				<NoteList loading={isLoading} notes={notes} onEditClick={onEdit} onDeleteClick={onDelete} isActionable={true}/>
			)} userList={null}/>

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
		</div>
	)
}
