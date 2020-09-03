import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req:NextApiRequest,res:NextApiResponse) => {
  try{
    const allUser = await fetch("http://localhost:3000/users",{
      method:"GET",
      headers:{
        "Accept":"application/json"
      }
    })
    const result = await allUser.json()
    return res.status(200).json(result)
  }catch(err){
    return res.status(400).json({
      message:err.message || "Something went wrong"
    })
  }
}

// const handler = (_req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (!Array.isArray(sampleUserData)) {
//       throw new Error('Cannot find user data')
//     }

//     return res.status(200).json(sampleUserData)
//   } catch (err) {
//     return res.status(500).json({ statusCode: 500, message: err.message })
//   }
// }

export default handler
