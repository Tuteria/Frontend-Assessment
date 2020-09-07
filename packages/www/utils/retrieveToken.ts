import Cookies from 'cookies';

export default function retrieveToken(req) {
  const cookies = new Cookies(req)
  const token = cookies.get('token');

  return token || null;
}