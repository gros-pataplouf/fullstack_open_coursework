/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import countriesServices from "./services/countries";

import CountryDetail from "./components/CountryDetail";
import CountryList from "./components/CountryList";

function Warning({ warning }) {
  return <p>{warning}</p>;
}

function App() {
  const [searchString, setSearchString] = useState("");
  const [countries, setCountries] = useState([]);
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const initialWeather = {
    city: null,
    temperature: null,
    icon: null,
    wind: null,
  };
  const [weather, setWeather] = useState(initialWeather);
  function handleChange(e) {
    setWarning("");
    setSearchString(e.target.value);
  }

  useEffect(() => {
    setWarning("");
    setCountries([]);
    setWeather(initialWeather);
    if (searchString.length) {
      setLoading(true);
      countriesServices.getByName(searchString).then((response) => {
        if (response.length) {
          if (response.length > 0 && response.length < 11) {
            setCountries(response);
            setLoading(false);
          } else if (response.length > 10) {
            setLoading(false);
            console.log(response.length);
            setWarning("Too many results, please refine your search");
          }
        } else {
          setLoading(false);
          setWarning(`No country matching "${searchString}".`);
        }
      });
    }
  }, [searchString]);

  return (
    <>
      <div>
        <p>find countries</p>
        <input onChange={handleChange} value={searchString} />
      </div>
      {warning ? (
        <Warning warning={warning} />
      ) : countries.length === 1 ? (
        <CountryDetail
          country={countries[0]}
          loading={loading}
          weather={weather}
          setWeather={setWeather}
          initialWeather={initialWeather}
        />
      ) : (
        <CountryList
          countries={countries}
          setCountries={setCountries}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default App;
