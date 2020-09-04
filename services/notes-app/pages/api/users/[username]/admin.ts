import {NextApiRequest,NextApiResponse} from "next"


const handler = async ({query:{username},...req}:NextApiRequest,res:NextApiResponse) => {
  try{
    const userNote = await fetch(`http://localhost:3000/users/${username}/admin`,{
      method:"PUT",
      headers:{
        "Accept":"application/json",
        Authorization:`Bearer ${req.headers.authorization?.split(" ")[1]}`
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