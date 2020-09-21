import config from "../../../../config"
import {NextApiRequest,NextApiResponse} from "next"


const handler = async ({body}:NextApiRequest,res:NextApiResponse) => {
  try{
const response = await fetch(`${config.SERVER_URL}/notes/create`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(body)
    })
    const result = await response.json()
    return res.status(200).json(result)
  }catch(err){
    return res.status(400).json({
      message:err.message || "Something went wrong"
    })
  }
}

export default handler