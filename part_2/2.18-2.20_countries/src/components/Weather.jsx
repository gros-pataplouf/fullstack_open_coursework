/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import countriesServices from "../services/countries";

export default function Weather({
  country,
  weather,
  setWeather,
  initialWeather,
}) {
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setWarning(false);
    setWeather(initialWeather);
    const city = country.capital[0];
    const countryCode = country.cca2;
    setLoading(true);
    countriesServices
      .getWeather(city, countryCode)
      .then((response) => {
        setLoading(false);
        setWeather({
          city,
          temperature: `${Math.round(response.data.main.temp - 273.15)}°C`,
          wind: `${response.data.wind.speed} m/s`,
          icon: response.data.weather[0].icon,
        });
      })
      .catch((err) => {
        console.error(err);
        setWarning(true);
        setLoading(false);
      });
  }, []);
  return !loading ? (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      {warning ? (
        <p>No weather data available</p>
      ) : (
        <div>
          <p>temperature {weather.temperature}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt=""
          />
          <p>wind {weather.wind}</p>
        </div>
      )}
    </div>
  ) : (
    <h2>Getting weather data for {country.name.common}</h2>
  );
}
