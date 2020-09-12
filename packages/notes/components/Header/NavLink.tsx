import React from "react";
import { Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { NavLinkProps as Props } from "../../types";

const NavLink: React.FC<Props> = ({ children, handleClick, href, isLast }: Props) => {
	const router = useRouter();
  const isActive = router.asPath === href;

	return (
		<Link
      color={isActive ? "white" : "black"}
      backgroundColor={isActive ? "black" : "none"}
			textDecoration="underline"
			href={href}
      mr={!isLast ? ["0", "10px", "15px"] : ""}
			px="5px"
			onClick={handleClick}
		>
			{children}
		</Link>
	);
};

export default NavLink;
