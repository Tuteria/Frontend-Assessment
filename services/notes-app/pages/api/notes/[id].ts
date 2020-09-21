import config from "../../../../config"
import {NextApiRequest,NextApiResponse} from "next"

const handler = async ({method,query:{id},body}:NextApiRequest,res:NextApiResponse) => {
  try{
    switch(method){
      case 'GET':
        const searchedNote = await fetch(`${config.SERVER_URL}/notes/${id}`,{
        method:"GET",
        headers:{
          "Accept":"application/json",
        }
        })
      return res.status(200).json(await searchedNote.json())
      break;

      case 'PUT':
        const foundNote = await fetch(`${config.SERVER_URL}/notes/${id}`,{
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
        const deletedNote = await fetch(`${config.SERVER_URL}/notes/${id}`,{
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
