import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const findCountries = (search)=>{
  const countries = axios.get(`${baseURL}/all`).then(
    (res)=>{
      return res.data.filter((d)=>d.name.common.toLowerCase().startsWith(search.toLowerCase()))
    }   
  );
  return countries;
}

export default {
  findCountries
}