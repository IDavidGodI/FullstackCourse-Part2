import { useState, useEffect } from 'react'
import CountryList from './components/country-list'
import countriesService from "./services/countries-service"

function App() {
  const [country, setCountry] = useState("")
  const [results, setResults] = useState([])
  useEffect(()=>{
    if (country.length>0){
      countriesService.findCountries(country).then((r)=>{
        console.log(r)
        setResults(r)
      });

    }
  },[country])



  return (
    <>
      <div className="search-form-container">
        <form className="search-form">
          <label className="field-label" htmlFor="search">Find countries</label>
          <input 
            onChange={(e)=>setCountry(e.target.value)}     
            className="search-field" 
            name="search" 
            id="search" 
            placeholder="Search a country"/>
        </form>
      </div>

      <CountryList countries={results}/>

    </>
  )
}

export default App
