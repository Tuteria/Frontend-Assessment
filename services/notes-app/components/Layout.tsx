import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {Box} from "@chakra-ui/core"

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box bg="whitesmoke" color="black" width="100%"
     height="40px" display="flex" justifyContent="space-between"
      alignItems="center" >
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/admin">
          <a>Login</a>
        </Link>{' '}
        |{' '}
        <Link href="/admin">
          <a>Admin</a>
        </Link>{' '}
      </nav>
    </Box>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
