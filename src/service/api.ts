
import axios from "axios"
// https://my-qr-server.onrender.com/api
const api = axios.create({
    baseURL:"http://localhost:8000/api",
     headers: {
    'Content-Type': 'application/json',
  },
})

  


export default api