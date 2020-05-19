import axios from 'axios';


export default axios.create({
  baseURL: 'https://staging.diem.dev/client'
});