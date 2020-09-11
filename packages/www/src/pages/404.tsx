import { Flex, Heading, Link, Box } from "@chakra-ui/core";

const NotFound = () => (
	<Flex justifyContent="center" alignItems="center" flexDirection="column">
		<Heading>We can't find the page you are Looking for.</Heading>
		<Box>
			Go to{" "}
			<Link textDecoration="none" color="#fc5c9c" href="/">
				Notes Home
			</Link>
		</Box>
	</Flex>
);

export default NotFound;
