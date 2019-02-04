import React, { useState, useEffect } from 'react';
import axios from 'axios'


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const filterHandler = (event) => {
    console.log(filter)
    setFilter(event.target.value.toLowerCase())
  }

  const hook = () => {
    axios.get('http://localhost:3001/countries')
      .then(response => {
        console.log('SUCCESS')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  const listing = () => {
    if (filter.length == 0) {
      return
    }
    let filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter))
    if (filteredCountries.length > 10) {
      return (<div>LIIKAA</div>)
    } else if (filteredCountries.length > 1) {
      return (<div>{filteredCountries.map(country => <li key={country.name}>{country.name}</li>)}</div>)
    } else if (filteredCountries.length == 1) {
      let country = filteredCountries[0]
      let style = { maxWidth: '100px' }
      return (<div>
        <h1>{country.name}</h1>
        capital {country.capital}<br />
        population {country.population}<br />
        <br />
        <h2>languages</h2>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        <img src={country.flag} style={style} alt='flag' />
      </div>)
    }
  }
  return (
    <div>
      find countries
        <input onChange={filterHandler} value={filter} />
      {listing()}
    </div>
  )
}

export default App;
