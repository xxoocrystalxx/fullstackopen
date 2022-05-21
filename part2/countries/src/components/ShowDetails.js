const ShowDetails = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages).map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt="Flag" width={150} height={150} />
  </div>
)

export default ShowDetails
