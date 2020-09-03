import React from "react";
// import { action } from "@storybook/addon-actions";
// import { Button } from "@storybook/react/demo";
import {Box} from "@chakra-ui/core"
import Note from "./note"

export default {
  title: "Components/Loader",
  notes:"array"
};
interface IData {
  author:string;
  title:string;
  description:string;
}
type INoteList =  { 
  notes:IData[] | null[]
}

export const NoteList:React.SFC<INoteList> = ({notes}) => {
  const [defaultNote,setDefaultNote] = React.useState(Array(10).fill(""))

  React.useEffect(() => {
    if(Array.isArray(notes)){
      setDefaultNote(notes)
    }
  },[notes])
  return(
    <Box display="flex" justifyContent="center"
     flexDirection={"column"} alignItems={"center"}  >
      {defaultNote.map((note:IData,idx:number) => (
        <Note {...note} key={idx} />
      ))}
    </Box>
    )
}

