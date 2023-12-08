/* eslint-disable react/prop-types */
import Weather from "./Weather";
import Loading from "./Loading";

export default function CountryDetail({
  country,
  loading,
  weather,
  setWeather,
  initialWeather,
}) {
  return loading ? (
    <Loading />
  ) : (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital &nbsp; {country.capital[0]}</p>
      <p>area &nbsp; {country.area}</p>
      <p>languages</p>
      <ul>
        {Object.values(country.languages).map((lang) => {
          return <li key={lang}>{lang}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather
        country={country}
        weather={weather}
        setWeather={setWeather}
        initialWeather={initialWeather}
      />
    </div>
  );
}
