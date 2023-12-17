import DisplayCountry from "./display-country";
import weatherService from "../services/weather-service";
import { useEffect,useState } from "react";

const CountryList = ({countries, expanded,handleExpand, weather, updateWeather})=>{
  
  const [fetchingWeather, setFetchingWeather] = useState(true);

  useEffect(()=>{
    setFetchingWeather(true)
    const country = countries.find((c)=> expanded && c.cca2===expanded)
    if (country)
    weatherService.getWeatherData(...country.latlng)
    .then(res=>{
      updateWeather(res)
      setFetchingWeather(false)
    })
  }, [expanded])

  const updateExpand = (cca2)=>{
    handleExpand(cca2)
  }
  return(
    <>
      {
        countries.length<=10?
        <>
          {expanded &&
            <DisplayCountry 
              country={countries.find((c)=>c.cca2===expanded)}
              weather = {weather}
              fetchingWeather = {fetchingWeather}
            />
          }
          {
            countries.length>1 &&
            <ul className="results-list">
              {countries.map((c)=>
                <li key={c.cca2}>
                  <span>
                    {c.name.common}
                    <button onClick={()=>updateExpand(c.cca2)}>{expanded===c.cca2? "hide" : "show"}</button>
                  </span>
                </li>)}
            </ul>
          }
        </>
        
        :
        (<p>Too many matches, be more specific</p>)
      }
    </>
  )
}

export default CountryList;