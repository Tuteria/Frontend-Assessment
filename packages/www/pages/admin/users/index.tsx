import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import cookies from 'react-cookies';
import {
  Button, Heading, Text, Flex, Link
} from '@chakra-ui/core';
import {
  Container, Layout, Nav
} from '../../../components'
import { SUCCESS, ERROR } from '../../../constants';
import retrieveToken from '../../../utils/retrieveToken';

export const getServerSideProps = async ({req}) => {
  const { origin } = absoluteUrl(req);
  const token = retrieveToken(req);
  if (!token) {
    return {
      props: {
        status: ERROR,
        users: [],
      },
    }
  }
  try {
    const res = await axios.get(`${origin}/api/users`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return {
      props: {
        status: SUCCESS,
        users: res.data.data
      },
    }
  } catch(err) {
    return {
      props: {
        status: ERROR,
        users: [],
      },
    }
  }
}

export default function UserLists({status, users}) {

  return (
    <Layout>
      <Nav/>
      <Container>
        <Button
          leftIcon="add"
          variantColor="teal"
          borderRadius={7}
          fontSize={14}
          ml={2} mr={2} mb={2}
        >
          <a href="/admin/users/create">Create User</a>
        </Button>

        <Heading textAlign="center" color="#3E576A" as="h3" size="lg">
          Registered Users
        </Heading>

        <Flex direction="column" mt="2" mb={4}>
          <Flex
            bg="#319795" boxShadow="md" minHeight="3rem" mb={4}
            pt={5} pb={5} borderRadius={5} fontWeight="bold" color="#FFFFFF"
          >
            <Text width="50%" pl={5} >Username</Text>
            <Text width="50%" pl={5}>Email</Text>
          </Flex>
            {users.length === 0 ?
              <Text textAlign="center" mt={4}>
                There are no registered users. Click on the Create User button above to create a user  
              </Text> 
              :
              users.map((user) => (
                <Link href={`/users/${user.username}/notes`} mb={3}  key={user.id}>
                  <Flex
                    bg="#FFFFFF" boxShadow="md" minHeight="3rem"
                    pt={5} pb={5} borderRadius={5}
                  >
                    <Text width="50%" pl={5} >{user.username}</Text>
                    <Text width="50%" pl={5}>{user.email}</Text>
                  </Flex>
                </Link>
              ))

            }
        </Flex>

      </Container>
    </Layout>
  )
}

