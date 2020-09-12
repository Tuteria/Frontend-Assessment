import React from "react";
import { IconButton } from "@chakra-ui/core";

type Props = {
	handleClick: () => void;
};

export default ({ handleClick }: Props) => (
	<IconButton
		aria-label="edit note"
		icon="edit"
		onClick={handleClick}
		bg="transparent"
		border="none"
		width="25px"
		minWidth="25px"
		height="25px"
		cursor="pointer"
	/>
);
