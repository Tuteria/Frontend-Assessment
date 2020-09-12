import React from "react";
import { Flex, Link } from "@chakra-ui/core";
import LogoutBtn from "./LogoutBtn";
import NavLink from "./NavLink";
import { usePageProvider } from "../PageProvider";

export default () => {
	const { state: { user } } = usePageProvider();
	return (
		<Flex
			align={["center"]}
			as="header"
			bg="white"
			justify="space-between"
			position="relative"
			px={["2", "3"]}
		>
			<Link
				href="/"
				aria-label="homepage"
				display="block"
				height="80px"
				width="60px"
				transform="rotate(0deg) skew(0deg)"
				borderRight="30px solid black"
				borderLeft="30px solid black"
				borderBottom="30px solid transparent"
			/>

			<Flex as="nav" direction={["column", "row"]}>
				{!user && (
					<NavLink isLast href="/login">
						login
					</NavLink>
				)}
				{user && user.admin && <NavLink href="/admin">dashboard</NavLink>}
				{user && (
					<React.Fragment>
						<NavLink href={`/users/${user.username}`}>my notes</NavLink>
						<LogoutBtn />
					</React.Fragment>
				)}
			</Flex>
		</Flex>
	);
};
