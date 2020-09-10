import React from "react";
import { Flex, Image, Link } from "@chakra-ui/core";

type Props = {
	user?: {
		username: string;
		admin: boolean;
		id: number;
	};
};

const Header: React.FC<Props> = ({ user }: Props) => (
	<Flex
		align={["center"]}
		as="header"
		bg="white"
		direction="row"
		justify="space-between"
		p={["2"]}
		px={["2", "3"]}
		shadow="0px 2px 5px 0px rgba(0,0,0,0.25)"
	>
		<Link href="/" aria-label="homepage">
			<Image
				src="/logo.svg"
				alt=""
				height={["60px", "80px"]}
				width={["60px", "80px"]}
				maxWidth="100%"
				aria-hidden="true"
			/>
		</Link>
		<Flex as="nav" direction={["column", "row"]}>
			{!user && <Link href="/login">login</Link>}
			{user && user.admin && (
				<Link mr={["0", "1", "2"]} href="/admin">
					dashboard
				</Link>
			)}
			{user && (
				<React.Fragment>
					<Link mr={["0", "1", "2"]} href={`users/${user.username}`}>
						my notes
					</Link>
					<Link href="#">logout</Link>
				</React.Fragment>
			)}
		</Flex>
	</Flex>
);

export default Header;