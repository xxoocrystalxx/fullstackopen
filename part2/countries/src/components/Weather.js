import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [api_key, country.capital])

  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      {weather.main ? (
        <div>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) : null}
    </div>
  )
}

export default Weather
