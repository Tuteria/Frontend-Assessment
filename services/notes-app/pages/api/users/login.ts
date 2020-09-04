import {NextApiRequest,NextApiResponse} from "next"


const handler = async ({body}:NextApiRequest,res:NextApiResponse) => {
  try{
    const newUser = await fetch("http://localhost:3000/users/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(body)
    })
    return res.status(200).json(await newUser.json())
  }catch(err){
    return res.status(400).json({
      message:err.message || "Something went wrong"
    })
  }
}

export default handler