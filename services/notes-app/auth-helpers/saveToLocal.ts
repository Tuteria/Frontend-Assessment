

interface IUser {
  token:string;
  user:{
    username:string;
    email:string;
    about:string;
    admin:boolean;
  };
}

const saveToLocal =  (arg:IUser):boolean => {
  if(typeof window !== undefined){
    window.localStorage.setItem("jwtToken",JSON.stringify(arg))
    return true
  }else{
    return false
  }
}

export default saveToLocal