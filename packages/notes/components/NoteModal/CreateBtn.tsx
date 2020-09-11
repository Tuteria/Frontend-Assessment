import React from "react";
import { IconButton } from "@chakra-ui/core";

type Props = {
	handleClick: () => void;
};

export default ({ handleClick }: Props) => (
	<IconButton
    position="fixed"
		right="1rem"
		bottom="1.5rem"
		aria-label="create note"
		icon="add"
		onClick={handleClick}
		backgroundColor="black"
    borderRadius="50%"
    border="none"
		color="white"
		_hover={{ backgroundColor: "black", color: "white" }}
		width="50px"
		minWidth="50px"
		height="50px"
		cursor="pointer"
		shadow=" 0px 0px 5px 1px rgba(0,0,0,0.5);"
	/>
);
