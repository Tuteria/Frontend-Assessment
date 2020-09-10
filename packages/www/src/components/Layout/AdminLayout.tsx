import { Box, Flex, Divider, Text } from "@chakra-ui/core";

import AdminHeader from "../AdminHeader";

const AdminLayout = ({ children }) => {
	return (
		<Flex alignItems="center" flexDirection="column">
			<Box width={["95%", "80%", "60%", "50%"]}>
				<AdminHeader />
				<Divider borderColor="#fc5c9c" mb="4" />
				<Box width="100%">{children}</Box>
			</Box>
		</Flex>
	);
};

export default AdminLayout;
