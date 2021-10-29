import { axiosClient } from './axiosServerSide';


//para chamadas clientSide
export const api = axiosClient();


/*
api.interceptors.request.use((req)=>{
  console.log(req);
  return req;
})
*/
