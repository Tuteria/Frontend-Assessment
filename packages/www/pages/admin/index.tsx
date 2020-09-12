import Link from "next/link";
import fetch from "isomorphic-unfetch";
import {
	Button,
	Badge,
	ButtonGroup,
	SimpleGrid,
	List,
	ListItem,
	ListIcon,
} from "@chakra-ui/core";
import url from "../../src/appEnv";
import Router from "next/router";
import React from "react";
import { parseCookies } from "nookies";

export const getServerSideProps = async (ctx) => {
	try {
		const jwt = parseCookies(ctx).jwt;

		const userResponse = await fetch(`${url.BASE_URL}/users`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		const users = await userResponse.json();
		return {
			props: {
				users,
				// authData: loginResponse,
			},
		};
	} catch (err) {
		return {
			props: {
				error: err.message,
			},
		};
	}
};

const AdminPage = ({ users, error }) => {
	{
		if (users.length >= 0) {
			return (
				<div className="space-between">
					<Link href={`/users/register`}>
						<Button variantColor="teal" variant="solid" size="sm" mb="3" mr="4">
							Register Users
						</Button>
					</Link>
					<Link href={`/admin/register`}>
						<Button variantColor="teal" variant="solid" size="sm" mb="3" ml="4">
							Register Admin
						</Button>
					</Link>
					<hr />
					{users.map((user) => {
						return (
							<List spacing={3}>
								<ListItem>
									<ListIcon icon="check-circle" color="green.500" />
									{user.username}
									<Badge
										rounded="full"
										px="2"
										p="2"
										variantColor="teal"
										ml="2"
										mt="1"
									>
										{user.email}
									</Badge>
									<div className="space-out">
										<ButtonGroup spacing={4}>
											<Link href={`/admin/${user.username}`}>
												<Button variantColor="teal" variant="solid" size="xs">
													View
												</Button>
											</Link>
											<span className="space-out mt-top"></span>
											<Link href={`/admin/${user.username}/edit`}>
												<Button variantColor="teal" variant="outline" size="xs">
													Edit
												</Button>
											</Link>
											<span className="space-out"></span>
										</ButtonGroup>
									</div>
								</ListItem>
								<hr></hr>
							</List>
						);
					})}
				</div>
			);
		} else {
			return (
				<div className="space-between">
					Authorization Failed, login to access this page <br></br>
					<br></br>
					<Link href={`/admin/login`}>
						<Button variantColor="teal" variant="solid" size="sm">
							Login
						</Button>
					</Link>
				</div>
			);
		}
	}
};

export default AdminPage;
