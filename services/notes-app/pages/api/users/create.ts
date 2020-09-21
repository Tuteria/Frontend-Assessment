import {NextApiRequest,NextApiResponse} from "next"
import config from "../../../../config"

const handler = async ({body}:NextApiRequest,res:NextApiResponse) => {
  try{
    const newNote = await fetch(`${config.SERVER_URL}/users/create`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(body)
    })
    return res.status(200).json(await newNote.json())
  }catch(err){
    return res.status(400).json({
      message:err.message || "Something went wrong"
    })
  }
}

export default handler