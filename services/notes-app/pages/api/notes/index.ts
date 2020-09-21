import config from "../../../../config"
import {NextApiRequest,NextApiResponse} from "next"


const handler = async (_req:NextApiRequest,res:NextApiResponse) => {

  try{
    const getAllArticle = await fetch(`${config.SERVER_URL}/notes`,{
      method:"GET",
      headers:{
        "Accept":"application/json"
      }
    })
    return res.status(200).json(await getAllArticle.json())
  }catch(err){
    return res.status(500).json({
      statusCode:500,
      message:err.message
    })
  }
}

export default handler