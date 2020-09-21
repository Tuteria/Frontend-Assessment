import React from "react"
import Layout from "../../components/Layout"
import Notelist from "../../components/notelist"
import {INote} from "../../interfaces"

interface IProps {
    data:INote[]
}

const ReadNote:React.FC<IProps> = (props) => {
    console.log(props)
  return(
    <Layout title="Notes App">
      <Notelist notes={props.data}  />
    </Layout>
  )
}


export async function getServerSideProps(context: { params: { id: string } }) {
    // Fetch data from external API
    if(context.params.id){
      const res = await fetch(`http://localhost:3001/api/notes/${context.params.id}`,{
        method:'GET',
        headers:{
          "Accept":"application/json"
        }
      })
      const data:INote = await res.json()  
      // Pass data to the page via props
      return { props: { data:[data] } }
    }
  }
  

export default ReadNote