import { useState, useEffect } from 'react'
import CountryList from './components/country-list'
import countriesService from "./services/countries-service"
import Spinner from './components/spinner'

function App() {
  const [country, setCountry] = useState("")
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(()=>{
    if (country.length>0){
      console.log("searching")
      countriesService.findCountries(country).then((r)=>{
        console.log(country,r)
        updateExpanded(r)
        setResults(r)
        setSearching(false)
      });

    }else{
      setResults([])
      setSearching(false)
    }
  },[country])


  const updateExpanded = (r)=>{
    if (r.length===1 && !expanded) setExpanded(r[0].cca2)
  }
  const handleExpand = (cca2)=>{
    if (cca2===expanded) {
      setExpanded(null)
      return;
    }
    setExpanded(cca2)
  }

  const updateWeather = (data)=>{
    setWeather(data)
  }

  const updateCountry = (e)=>{
    const value = e.target.value;
    console.log(value, country)
    setCountry(value)
    if (value.length>0 && 
      value.toLowerCase().startsWith(country.toLowerCase()) &&
      value.toLowerCase()!==country.toLowerCase()
      ){
        const newList = results.filter(r=>r.name.common.toLowerCase().startsWith(value.toLowerCase()))
        updateExpanded(newList)
        setResults(newList)
        return
      }
      
    setExpanded(null)
    setWeather(null)
    if (value.length>0){
      setSearching(true)
    }
  }

  return (
    <>
      <div className={`search-form-container ${results.length===0 || country.length===0? "full" : ""}`}>
        <form className="search-form" onSubmit={(e)=>e.preventDefault()}>
          <label className="field-label" htmlFor="search">Find countries</label>
          <input 
            onChange={updateCountry}     
            className="search-field" 
            name="search" 
            id="search" 
            placeholder="Search a country"/>
        </form>
        <div className="loader-container">
          {searching && <Spinner/>}
        </div>
      </div>
      {
        
        !searching && country.length>0 && 
          <>
          {
            results.length>0?
            <CountryList 
            countries={results} 
            expanded={expanded} 
            handleExpand={handleExpand}
            weather = {weather}
            updateWeather = {updateWeather}
            />
            :
            <p>No results found</p>
          }

          </>
        
      }
    </>
  )
}

export default App
