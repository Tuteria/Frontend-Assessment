import cookies from 'react-cookies';
import { ADMIN_TOKEN, COOKIE_TOKEN } from '../constants'

const isAdminUser = () => ADMIN_TOKEN === cookies.load(COOKIE_TOKEN)

export default isAdminUser;
