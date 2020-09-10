import React from "react";
import { Flex, Image, Link } from "@chakra-ui/core";
import NavLink from "./NavLink";

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
		position="relative"
		px={["2", "3"]}
		shadow="0px 1px 5px 0px rgba(0,0,0,0.25)"
	>
		<Link href="/" aria-label="homepage">
			<Image
				src="/logo.svg"
				alt=""
				height="60px"
				width="60px"
				maxWidth="100%"
				aria-hidden="true"
			/>
		</Link>
		<Flex as="nav" direction={["column", "row"]}>
			{!user && <NavLink isLast href="/login">login</NavLink>}
			{user && user.admin && (
				<NavLink href="/admin">
					dashboard
				</NavLink>
			)}
			{user && (
				<React.Fragment>
					<NavLink href={`users/${user.username}`}>
						my notes
					</NavLink>
					<NavLink href="#" isLast>logout</NavLink>
				</React.Fragment>
			)}
		</Flex>
	</Flex>
);

export default Header;