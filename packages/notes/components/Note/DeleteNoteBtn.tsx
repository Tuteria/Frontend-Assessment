import React from "react";
import { IconButton } from "@chakra-ui/core";
import { usePageProvider } from "../PageProvider";
import { NoteProps as Props } from "../../types";


const DeleteBtn: React.FC<Props> = ({ note }: Props) => {
  const { dispatch } = usePageProvider();
  const [isLoading, setLoading] = React.useState(false);

  const deleteNote = async () => {
    try {
      setLoading(true);
      const url = "http://localhost:3000/api/notes/" + note.id;
      const response = await fetch(url, {
        method: "DELETE",
      });

      const data = await response.json();
      if ("message" in data) throw new Error(data.message);
      dispatch({
        type: "DELETE NOTE",
        payload: data,
      });
    } catch(e) {
      dispatch({
        type: "ERROR",
        payload: e.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <IconButton
      aria-label="delete note"
      icon="delete"
      backgroundColor="transparent"
      border="none"
      height="25px"
      width="25px"
      minWidth="25px"
      isLoading={isLoading}
      onClick={deleteNote}
    />
  );
}

export default DeleteBtn;