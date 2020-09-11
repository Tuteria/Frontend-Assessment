import { FunctionComponent } from "react";
import { Box, Flex, Divider } from "@chakra-ui/core";

import AdminHeader from "../AdminHeader";

interface AdminLayoutProps {
	children: any;
}

const AdminLayout: FunctionComponent<AdminLayoutProps> = ({ children }) => {
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
