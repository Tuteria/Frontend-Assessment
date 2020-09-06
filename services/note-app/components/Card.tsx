import Link from 'next/link'
import { Heading, Text, Box, Button } from "@chakra-ui/core";


export default function Feature({ id, title, desc, isAdminOrMine, ...rest }) {

  return (
    <Box p={4} shadow="md" borderWidth="1px" flex="1" rounded="md" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text><br />
      <Link href='/note/[noteId]' as={`/note/${id}`}>
        <Button variantColor="black.500"  variant="link">
          Read more
        </Button>
      </Link> 
      &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      {isAdminOrMine === true ? <span>
        <Link href='/note/[id]/edit' as={`/note/${id}/edit`}>
          <Button variantColor="teal"  variant="link">
            Edit
          </Button>
        </Link>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <Link href='/note/[id]/delete' as={`/note/${id}/delete`}>
          <Button variantColor="red"  variant="link">
            Delete
          </Button>
        </Link>
      </span> : ''}
    </Box>
  );
}