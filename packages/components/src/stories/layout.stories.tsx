import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {Box} from "@chakra-ui/core"

export default {
  title:"Component/Layout"
}

type Props = {
  children?: ReactNode
  title?: string
}
interface IToken {
  token:string;
  user:{
    username:string;
    email:string;
    admin:boolean;
  }
}
