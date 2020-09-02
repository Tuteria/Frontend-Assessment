import React from "react";
// import { action } from "@storybook/addon-actions";
// import { Button } from "@storybook/react/demo";
// import * as typeHold from "../../types/stories/button.stories.d"
import {Box} from "@chakra-ui/core"

export default {
	title: "Components/Navbar",
};

type INavbar = { 
  children:React.ReactNode
}

export const Navbar:React.SFC<INavbar> = (props) => (
  <Box bg="tomato" w="100%" p={4} color="whitesmoke" >
    {props.children}
  </Box>
);

