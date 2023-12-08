/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem";
import Loading from "./Loading";
export default function CountryList({
  countries,
  setCountries,
  loading,
  setLoading,
}) {
  return loading ? (
    <Loading />
  ) : (
    <ul>
      {countries.map((country) => {
        return (
          <CountryItem
            key={country.name.common}
            country={country}
            setCountries={setCountries}
            setLoading={setLoading}
          />
        );
      })}
    </ul>
  );
}
