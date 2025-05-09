import axios from 'axios';
// import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${Cookies.get('jwtToken')}`,
  },
});
export default apiClient;