import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

const [searchCountries , setSearchCountries] = useState("")
const [countryArray , setCountryArray] = useState([])
const [allCountries , setAllCountries] =useState([])

useEffect(()=>{

    axios.get(`https://restcountries.com/v3.1/all`)
    .then((response)=> {
      setAllCountries(response.data)
    })
     .catch((error)=>{
    })

},[])

function displayCountries(event){
  setSearchCountries(event.target.value)
  setCountryArray(allCountries.filter((country)=>(country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))))
}

function showCountry(event){
  setCountryArray(allCountries.filter((country)=>(country.name.common.toLowerCase() === event.target.id.toLowerCase())))
}

  return (
    <div>
      find countries <input value = {searchCountries} onChange = {displayCountries}/>
      <br/>
      {countryArray.length === 1 ? 
      <Country countryInfo = {countryArray[0]}/> : 
      (countryArray.length > 10 ? "Too many matches , specify another filter" :
       countryArray.map((country,id)=>(
        <div key={id}>
           {country.name.common}
           <button id={country.name.common} onClick ={showCountry}>show</button>
         </div>)))}
      </div>
  )
}


const Country = ({countryInfo}) => {

  const [climateData , setClimateData] = useState({})

  function getLanguages(languages){

    let languageArray = []

    for (let language in languages) {
       if (languages.hasOwnProperty(language)) {
          languageArray.push(languages[language])
       }
    }
    return languageArray.map((language,index)=>(<li key={index}>{language}</li>))
  }


  useEffect(()=>{

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryInfo.capital}&appid=${process.env.REACT_APP_WEATHER_API}`)
  .then((response)=>{
    setClimateData(response.data)
  })

  },[])

  return (
    <div>
      <h2>{countryInfo.name.common}</h2>
      <p>capital {countryInfo.capital}</p>
      <p>area {countryInfo.area}</p>
      <h3>languages:</h3>
      <ul>
        {getLanguages(countryInfo.languages)}
      </ul>
      <img style = {{border : "5px solid black"}} src={countryInfo.flags.png} alt={`Flag of ${countryInfo.name.common}`}/>
      <h3>Weather in {countryInfo.capital}</h3>
      <p>Temperature {Object.keys(climateData).length > 0 && (climateData.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="cartoon of cloud"></img>
      <p>Wind {Object.keys(climateData).length > 0 && climateData.wind.speed} m/s</p>
    </div>
  )
}

export default App;
