import React from "react";
import {Box} from "@chakra-ui/core"
import Note from "./note"

interface INote {
  title:string;
  description:string;
  id:string;
  author?:string
}
type INoteList =  { 
  notes:INote[] | null[]
}

const NoteList:React.FC<INoteList> = ({notes}) => {
  const [defaultNote,setDefaultNote] = React.useState(Array(10).fill(null))
  React.useEffect(() => {
    if(Array.isArray(notes)){
      setDefaultNote(notes)
    }
  },[notes])

  const handleDelete = (notesId:string) => async() => {
    const filterNote = defaultNote.filter((note:INote) => (
      note.id !== notesId
    ))
    setDefaultNote(filterNote)
    const response = await fetch(`/api/notes/${notesId}`,{
      method:"DELETE",
      headers:{
        "Accept":"applcation/json"
      }
    })
    const result = await response.json()
    if(result.message.indexOf("Successful")){
      console.log("notes successfully deleted")
    }else{
      console.log("something went wrong")
    }
  }
  return(
    <Box display="flex" justifyContent="center"
     flexDirection={"column"} alignItems={"center"}  >
      {defaultNote.map((note:INote,idx:number) => (
        <Note note={note} key={idx} handleDelete ={handleDelete(note?.id)} />
      ))}
    </Box>
    )
}

export default NoteList