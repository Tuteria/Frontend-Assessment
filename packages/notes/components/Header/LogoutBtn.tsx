import React from "react";
import NavLink from "./NavLink";
import { usePageProvider } from "../PageProvider";

export default () => {
  const { dispatch } = usePageProvider();
	const logout = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
      const response = await fetch(url);     
      if(response.ok) {
        window.location.pathname = "/";
      } 
    } catch(e) {  
      dispatch({
        type: "ERROR",
        payload: e.message,
      });
    }
  };
	return (
    <NavLink
      handleClick={logout}
      href="#" 
      isLast
    >
			logout
		</NavLink>
	);
};
