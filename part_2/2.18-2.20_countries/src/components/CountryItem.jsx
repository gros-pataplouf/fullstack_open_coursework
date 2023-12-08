/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import countriesServices from "../services/countries";
export default function CountryItem({ country, setCountries, setLoading }) {
  function showCountry(e) {
    const requestedCountry = e.target.getAttribute("data-id");
    setLoading(true);
    countriesServices
      .getByExactName(requestedCountry)
      .then((response) => {
        setCountries([response]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <li>
      {country.name.common}
      <button data-id={country.name.common} onClick={showCountry}>
        Show
      </button>
    </li>
  );
}
