import Link from 'next/link'
import { SimpleGrid } from "@chakra-ui/core";
import useSWR from 'swr'
import Loader from '../../components/Loader'
import Card from '../../components/Card'



const fetcher = async (url) => {
  const response = await fetch(url);
  return await response.json();
};


export default function Notes() {
  const { data, error } = useSWR('/api/notes', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <Loader label='Loading...' />

  return (
    <div style={{padding:  '5%'}} >
     <SimpleGrid columns={[1, null, 6]} spacing="40px" >
       {
         data.data.map(d => {
           return (
            <Card
            isAdminOrMine={false}
              key={d.id}
              id={d.id}
              title={d.title}
              desc={d.description.substring(0, 50) + '...'}
            />
           )
         })
       }
     </SimpleGrid>
    
    </div>
      
  )
}
