import axios from "axios";

// export const API_URL = 'https://illiadev93-eval-test.apigee.net/usrmgmt/api/v1';
// export const apikey = 'V69VkpA3P0r3lyIvsb9nCdxhbYUq48Xp';

const $api = axios.create({
  // withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
  params: {
    apikey: process.env.REACT_APP_API_KEY
  }
});

// $api.interceptors.request.use(config => {
//   config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });

// $api.interceptors.response.use(config => {
//     return config;
// }, async error => {
//   const originalRequest = error.config;
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//       try {
//         originalRequest._isRetry = true;
//         const res = await axios(`${API_URL}/refresh`, { withCredentials: true });
//         localStorage.setItem('token', res.data.accessToken);        
//         return $api.request(originalRequest);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     throw error;      
//   }  
// );

export default $api;
