import DisplayCountry from "./display-country";

const CountryList = ({countries})=>{
  const display = 
    (countries.length===1 && <DisplayCountry country={countries[0]}/>) ||

    ( countries.length<=10 &&
    <ul>
      {countries.map((c)=><li key={c.area}>{c.name.common}</li>)}
    </ul>) ||
    (<p>Too many matches, be more specific</p>)

  return(
    <>
      {display}
    </>
  )
}

export default CountryList;