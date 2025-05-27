
import axios from "axios"
// https://my-qr-server.onrender.com/api
const api = axios.create({
    baseURL:"https://my-qr-server.onrender.com/api",
     headers: {
    'Content-Type': 'application/json',
  },
})

  


export default api
