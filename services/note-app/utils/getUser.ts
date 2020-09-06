import jwtDecode from 'jwt-decode'

const token = localStorage.getItem("isLoggedIn");
let decode

if(token) {
  decode = jwtDecode(token)
}

export default decode