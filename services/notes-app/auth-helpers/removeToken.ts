

  
const removeToken = () => {
    if(typeof window !== "undefined"){
        window.localStorage.removeItem("jwtToken")
    }
}

export default removeToken