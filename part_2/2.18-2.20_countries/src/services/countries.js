import axios from "axios";
const APIkey = import.meta.env.VITE_APIkey;
const urlAll = "https://studies.cs.helsinki.fi/restcountries/api/all/";
const urlName = "https://studies.cs.helsinki.fi/restcountries/api/name/";
const geoDataUrl = "http://api.openweathermap.org/geo/1.0/direct";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (city, countryCode) => {
  return axios
    .get(`${geoDataUrl}?q=${city},${countryCode}&appid=${APIkey}`)
    .then((response) => {
      return axios.get(
        `${weatherUrl}?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${APIkey}`,
      );
    });
};

const getByName = (searchString) =>
  axios
    .get(`${urlAll}`)
    .then((response) => {
      const allCountries = response.data;
      const filteredCountries = allCountries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchString.toLowerCase());
      });
      return filteredCountries;
    })
    .catch((error) => {
      console.error(error);
    });

const getByExactName = (searchString) =>
  axios
    .get(`${urlName}${searchString.toLowerCase()}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });

export default {
  getByName,
  getByExactName,
  getWeather,
};
