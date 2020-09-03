import React from "react"
import Layout from '../components/Layout'
import NoteList from "../components/notelist"
import useSwr from "swr"



const IndexPage = () => {
  
  const nullArr = new Array(10).fill(null)

  const fetcher = (url:string) => fetch(url)
                    .then(res => res.json())

  const {data,error} = useSwr("/api/notes",fetcher)
  return(
    <Layout title="Notes App">
    <h1>Welcome to note Taking App</h1>
    {error && <div>Unable to successfully retrieve notes</div>}
    <NoteList notes={data || nullArr} />
  </Layout>
  )
}

export default IndexPage
