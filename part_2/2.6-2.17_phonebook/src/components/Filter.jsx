/* eslint-disable react/prop-types */
const Filter = ({ props }) => {
  const { persons, setFilteredPersons, setSearchFailed } = props;
  function handleSearch(e) {
    const results = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredPersons(results);
    if (!results.length) {
      setSearchFailed(true);
    }
  }

  return (
    <p>
      filter shown with{" "}
      <input
        type="text"
        id="searchForm"
        placeholder="search a name"
        onChange={handleSearch}
      />
    </p>
  );
};

export default Filter;
