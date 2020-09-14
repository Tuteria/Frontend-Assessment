import useSwr from 'swr';
import Layout from "../src/layout/layout";
import NoteList from "@tuteria/components/src/ui-elements/noteList/noteList";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
	let isLoading = false;
	let notes = [];

	const { data, error } = useSwr('/api/notes', fetcher)

	if (error) return <div>Failed to load users</div>
	if (!data) isLoading = true

	notes = data?.notes
	console.log(notes)

	return (
		<div>
			<Layout noteList={(onEdit, onDelete) => (
				<NoteList loading={isLoading} notes={notes} onEditClick={onEdit} onDeleteClick={onDelete} isActionable={false}/>
			)} userList={() => {}} isAdminPage={false}/>

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
