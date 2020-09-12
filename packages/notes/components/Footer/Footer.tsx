import React from "react";
import { Box, Link, Text } from "@chakra-ui/core";

export default () => (
  <Box 
    as="footer"
    py="10px"
    shadow="0 -1px 5px 0 rgba(0, 0, 0, .25)"
    textAlign="center"
  >
		<Text as="small">
			Icons made by{" "}
			<Link textDecoration="underline" href="https://www.flaticon.com/authors/freepik" title="Freepik">
				Freepik
			</Link>{" "}
			from{" "}
			<Link textDecoration="underline" href="https://www.flaticon.com/" title="Flaticon">
				{" "}
				www.flaticon.com
			</Link>
		</Text>
	</Box>
);
