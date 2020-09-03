import React from "react";
// import { action } from "@storybook/addon-actions";
// import { Button } from "@storybook/react/demo";
import {Box} from "@chakra-ui/core"
// import {Note} from "./notes.stories"
export default {
  title: "Components/Loader",
  notes:"array"
};
interface INoteList { 
  data:{
    body:[];
  };
  error:string;
}

export const NoteList = (props:INoteList) => {
  return(
    <Box>
      {Boolean(props.error) && <div>Something went wrong</div>}
      {!Boolean(props.data.body) && !Boolean(props.error) && Array(10).fill("").map((note,idx) => (
        // <Note key={idx} {...note} />
        <Box/>
      ))}
      {props.data && props.data.body.map((note,idx) => (
        // <Note author_id={note.author_id} title={note.title} description={note.description}  key={idx} />
      <Box/>
      ))}
    </Box>
    )
}

