import {NextApiRequest,NextApiResponse} from "next"


const handler = async ({query:{username}}:NextApiRequest,res:NextApiResponse) => {
  try{
    console.log("calling the right pple")
    const userNote = await fetch(`http://localhost:3000/users/${username}/notes`,{
      method:"GET",
      headers:{
        "Accept":"application/json"
      }
    })
    const response = await userNote.json()
    console.log("this is the response from the right guys",response)
    return res.status(200).json(response)
  }catch(err){
    return res.status(400).json({
      message:err.message || "Something went wrong"
    })
  }
}

export default handler