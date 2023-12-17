import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl= `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`

const  getWeatherData = (lat, lng)=>{
  return axios.get(`${baseUrl}&lat=${lat}&lon=${lng}&units=metric`)
  .then(res=>{
    console.log("fetched", res.data)
    return res.data
  })
}


export default {getWeatherData}