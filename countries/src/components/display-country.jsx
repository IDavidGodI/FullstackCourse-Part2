import weatherService from "../services/weather-service";
import Spinner from "./spinner";


const DisplayCountry = ({country, weather, fetchingWeather})=>{

  
  // console.log(weather)
  return(
    <>
      <div className="country-shown">
        <div className="country-flag-container">
          <h4>{country.name.common}</h4>
          <div className="country-flag">
            <img src={country.flags.png} />
          </div>
        </div>
        <div className="country-info-container">

          <h4>Information</h4>
          <table className="country-info">
            <tbody>

              <tr>
                <th>Capital:</th>
                <td>{country.capital[0]}</td>
              </tr>
              <tr>
                <th>Area:</th>
                <td>{country.area}</td>
              </tr>
              <tr>
                <th>Population:</th>
                <td>{country.population}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="country-lang-container">

          <h4>Languages</h4>
          <ul>
            {
              Object.keys(country.languages).map((key)=>
              <li key={key}>{country.languages[key]}</li>
              )
            }
          </ul>
        </div>
        <div className="country-weather-container">

          <h4>Weather</h4>
          {
            fetchingWeather?
              <Spinner/>
            :
            <>
              <div className="weather-icon-container">
                {
                  weather.weather.map((w)=>
                    <div key={w.icon} className="weather-icon-box">
                      <img src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} alt="a"/>
                      <span className="weather-desc">{w.main}</span>
                    </div>
                  )
                }
                
              </div>
              <table>
                <tbody>
                  <tr>
                    <th>Temperature:</th>
                    <td>{weather.main.temp} Celcius</td>
                  </tr>
                  <tr>
                    <th>Wind:</th>
                    <td>{weather.wind.speed} m/s</td>
                  </tr>
                </tbody>
              </table>
            </>  
          }
        </div>
      </div>
    </>
  )
}

export default DisplayCountry;