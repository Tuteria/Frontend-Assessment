import {NextApiRequest,NextApiResponse} from "next"


const handler = async (_req:NextApiRequest,res:NextApiResponse) => {

  try{
    const getAllArticle = await fetch("http://localhost:3000/notes",{
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