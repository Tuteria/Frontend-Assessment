

interface IToken {
  token:string;
  user:{
    username:string;
    email:string;
    admin:boolean;
  }
}


const getToken = ():IToken | null => {
  console.log("calling get token")
  let token = null;
  if(window !== undefined){
    if(window.localStorage.getItem("jwtToken")){
     const holder =  window.localStorage.getItem("jwtToken")
     console.log("this is the token",token)
     if(holder !== null){
       token = JSON.parse(holder)
     }
    }
    return token;
  }
}

export default getToken