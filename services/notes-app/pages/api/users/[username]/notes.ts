import config from "../../../../../config"
import {NextApiRequest,NextApiResponse} from "next"

const handler = async ({query:{username}}:NextApiRequest,res:NextApiResponse) => {
  try{
    const userNote = await fetch(`${config.SERVER_URL}/users/${username}/notes`,{
      method:"GET",
      headers:{
        "Accept":"application/json"
      }
    })
    const response = await userNote.json()
    return res.status(200).json(response)
  }catch(err){
    return res.status(400).json({
      message:err.message || "Something went wrong"
    })
  }
}

export default handler