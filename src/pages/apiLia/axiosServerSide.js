import axios from 'axios';
import { parseCookies } from 'nookies';

//para chamadas serverSide
export function axiosClient(ctx){

const { token_lia } = parseCookies(ctx);

const api = axios.create({
  baseURL: 'http://localhost:4000'
});


if (token_lia) {
  api.defaults.headers['authorization'] = `Bearer ${token_lia}`;
}

return api;
}
