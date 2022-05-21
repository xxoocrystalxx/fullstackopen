import { useState, useEffect } from "react"
import axios from "axios"
import ShowDetails from "./components/ShowDetails"
import CountryList from "./components/CountryList"
import Weather from "./components/Weather"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow =
    search === ""
      ? countries
      : countries.filter((value) =>
          value.name.common.toLowerCase().includes(search.toLocaleLowerCase())
        )
  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 1 ? (
        <div>
          <ShowDetails country={countriesToShow[0]} />
          <Weather country={countriesToShow[0]} />
        </div>
      ) : (
        countriesToShow.map((value) => (
          <CountryList country={value} key={value.name.common} />
        ))
      )}
    </div>
  )
}
export default App
