import {NextApiRequest,NextApiResponse} from "next"


const handler = async ({query:{username}}:NextApiRequest,res:NextApiResponse) => {
  try{
    const userNote = await fetch(`http://localhost:3000/users/${username}/notes`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    })
    return res.status(200).json(await userNote.json())
  }catch(err){
    return res.status(400).json({
      message:err.message || "Something went wrong"
    })
  }
}

export default handler