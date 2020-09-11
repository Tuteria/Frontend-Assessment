import React from "react";
import { Link } from "@chakra-ui/core";
import { NavLinkProps as Props } from "../../types";


const NavLink: React.FC<Props> = ({ children, href, isLast }: Props) => (
	<Link
    color="black"
    textDecoration="underline"
    href={href}
    mr={!isLast ? ["0", "10px", "15px"]: ""}
  >
    {children}
  </Link>
);


export default NavLink;
