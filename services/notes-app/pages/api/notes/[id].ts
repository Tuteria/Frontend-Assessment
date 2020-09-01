import {NextApiRequest,NextApiResponse} from "next"

const handler = async ({method,query:{id},body}:NextApiRequest,res:NextApiResponse) => {
  try{
    switch(method){
      case 'PUT':
        const foundNote = await fetch(`http://localhost:3000/notes/${id}`,{
        method:"PUT",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })
      return res.status(200).json(await foundNote.json())
      break;
      case 'DELETE':
        const deletedNote = await fetch(`http://localhost:3000/notes/${id}`,{
          method:"DELETE",
          headers:{
            Accept:"application/json"
          }
        })
        return res.status(200).json(await deletedNote.json());
      default:
        return res.status(400).json({
          message:"endpoint is not available"
        })
    }
  }catch(err){
    return res.status(400).json({
      message:err.message || "Something went wrong"
    })
  }
}


export default handler
