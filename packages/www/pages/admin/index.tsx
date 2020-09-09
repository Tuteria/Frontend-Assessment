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
import url from "../../src/appUrl";

const AdminPage = ({ users }) => {
	return (
		<div className="space-between">
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
};

AdminPage.getInitialProps = async () => {
	const users = await fetch(url.userEndpointDev);
	const data = await users.json();
	return { users: data };
};
export default AdminPage;
