import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {  Grid, Note, NoteModal, usePageProvider, ModalActivator } from "../../components";
import { capitalize } from "../../utils";


export default () => {
  const router = useRouter();
  const { username } = router.query;
  const { state } = usePageProvider();
  return (
    <React.Fragment>
      <header
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >{`${capitalize(username)}'s notes`}</header>
      <Grid>
        {state.notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </Grid>
      <ModalActivator note={null} />
      {state.isNoteModalOpen && <NoteModal />}
    </React.Fragment>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/notes`;
  const response  = await fetch(url);

  if(response.ok) {
    const notes = await response.json();
    return {
      props: {
        notes,
      }
    }
  }
  throw new Error(response.statusText);
};
