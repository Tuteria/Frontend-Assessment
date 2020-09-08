import Cookies from 'cookies';
import { COOKIE_TOKEN } from '../constants';

export default function retrieveToken(req) {
  const cookies = new Cookies(req)
  const token = cookies.get(COOKIE_TOKEN);

  return token || null;
}