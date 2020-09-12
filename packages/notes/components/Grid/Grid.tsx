import React from "react";
import { Box } from "@chakra-ui/core";
import { GridProps as Props } from "../../types";

const Grid: React.FC<Props> = ({ children }: Props) => (
	<Box
		as="section"
		display="grid"
		gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
		gridGap="20px"
		justifyItems="center"
	>
		{children}
	</Box>
);

export default Grid;
