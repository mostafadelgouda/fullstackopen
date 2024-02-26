import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const CountryView = ({country}) => {
  
  return (
    <div>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <div>languages: </div>
      {Object.entries(country.languages).map(([key, language]) => (
            <li key={key}>{language}</li>
          ))}
      <img src={country.flags.png} alt={"ana image"}/>
    </div>
  )
}
const Display = ({countries, showCountry, handleShowClick}) => {

  //const [isShown, setIsShown] = useState(Array(countries.length))
  let content = undefined;
  //console.log(countries)

  if(countries.length === 1) {
    
    const country = countries[0];
    content = CountryView(country)


  }else if (countries.length <= 10) {
    //console.log()
    content = countries.map((country, index) => {
      //console.log('ana da5alt hna')
      return <div>{country.name.common}<button onClick={() => {handleShowClick(index)}}>show</button>
      {showCountry[index] && <CountryView country={country} />}
      </div>
    })
  }
  else{
    content = <div>Too many matches, specify another filter</div>

  }
  return content;
}

const App = () => {
  
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showCountry, setShowCountry] = useState([]);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    setNewFilter(filterValue);
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(filterValue)));
    //console.log(countries.filter(country => country.name.common.toLowerCase().includes(filterValue)))
  }
  const handleShowClick = index => {
    setShowCountry(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };


  useEffect(() => {
    const fetchData = async () => {
    
      const fetchedCountries = await getAll();
      console.log("Fetched Countries:", fetchedCountries);
      //if (Array.isArray(fetchedPersons)) {
        setCountries(fetchedCountries);
      //}
    };
    fetchData();
  }, []);
  
  // const filtered = persons.filter(person =>
  //   person.name.toLowerCase().includes(newFilter.toLowerCase())
  // );


  //useEffect(hook, [])
  //console.log('render', notes.length, 'notes')

  return (
  
    <div>
      
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
        <Display countries = {filteredCountries} showCountry={showCountry} handleShowClick={handleShowClick}/>

      </div>
      
    </div>
  )
}

export default App
