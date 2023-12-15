const DisplayCountry = ({country})=>{
  return(
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
    </div>
  )
}

export default DisplayCountry;