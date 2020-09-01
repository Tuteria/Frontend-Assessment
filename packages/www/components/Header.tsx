import Link from "next/link";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import cookies from "react-cookies";

export const Header = () => {
	const router = useRouter();
	const [username, setUsername] = useState();
	useEffect(() => {
		try {
			const token = jwtDecode(cookies.load("authToken"));
			if (token) {
				setUsername(token.username);
			}
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	return (
		<header>
			<div className="header-wrap">
				<div className="logo">
					<Link href="/">
						<a>NOTES</a>
					</Link>
				</div>
				<aside>
					<div className="create">
						<Link href="/notes/create">
							<a>Create Note</a>
						</Link>
					</div>
					<div
						className="user-notes"
						style={{ display: username ? "block" : "none" }}
					>
						<Link href={`/user/${username}/notes`}>
							<a>My Notes</a>
						</Link>
					</div>
					<div
						className="signup"
						style={{ display: username ? "none" : "block" }}
					>
						<Link href="/signup">
							<a>Sign Up</a>
						</Link>
					</div>

					<div
						className="login"
						style={{ display: username ? "none" : "block" }}
					>
						<Link href="/login">
							<a>Log In</a>
						</Link>
					</div>

					<div
						className="logout"
						style={{ display: username ? "block" : "none" }}
					>
						<Button
							variantColor="blue"
							size="sm"
							onClick={() => {
								if (window.confirm("Are you sure you want to LogOut?")) {
									cookies.remove("authToken");
									setTimeout(() => router.push("/login"), 200);
								}
							}}
						>
							Log Out
						</Button>
					</div>
				</aside>
			</div>
			<style jsx>{`
				.header-wrap {
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid var(--softgrey);
					align-items: baseline;
					padding: 20px 10px;
				}
				aside {
					display: flex;
					justify-content: space-between;
					color: lightblue;
				}
				.signup {
					margin: 0 10px;
				}
				.user-notes {
					margin: 0 10px;
				}
				.logo {
					color: lightblue;
				}
			`}</style>
		</header>
	);
};

export default Header;
