import React from "react";
import { Box, Link, Text } from "@chakra-ui/core";
import { notes as Note, users as User } from "@prisma/client";
import { truncateText } from "../../utils";

type Props = {
	user: User & {
		notes?: Note[];
	};
};

export default ({ user }: Props) => {
  const { username, notes } = user;
	return (
		<Box
			p="10px"
			shadow="0px 1px 5px 0px rgba(0,0,0,0.25)"
			borderRadius="5px"
			width="100%"
			maxWidth="300px"
		>
      <Link
					textDecoration="underline"
					href={`users/${username}`}
					aria-label={`${username}'s profile`}
					color="black"
				>
					{truncateText(username, 20)}
				</Link>
        <Box>
          <Text as="p">
            This user has <b>{notes.length}</b> notes 
          </Text>
        </Box>
    </Box>
	);
};
