import { useState } from "react"
import ShowDetails from "./ShowDetails"

const CountryList = ({ country }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      {country.name.common} <button onClick={() => setShow(!show)}>show</button>
      {show ? <ShowDetails country={country} /> : null}
    </div>
  )
}

export default CountryList
