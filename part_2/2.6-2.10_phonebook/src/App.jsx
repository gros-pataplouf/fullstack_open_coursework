/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ props }) => {
  const { persons, setFilteredPersons, setSearchFailed } = props;
  function handleSearch(e) {
    const results =       persons.filter((person) =>
    person.name.toLowerCase().includes(e.target.value.toLowerCase()),
  );
    setFilteredPersons(results);
    if (!results.length) {setSearchFailed(true)}

  

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

const Form = ({ props }) => {
  const {
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    persons,
    setPersons,
    setFilteredPersons,
  } = props;
  function checkForDuplicate(name) {
    if (persons.filter((person) => person.name === name).length) {
      return true;
    }
    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (checkForDuplicate(newName.trim())) {
      return window.alert(`${newName} is already added to the phonebook`);
    }
    const newPersons = [
      ...persons,
      { name: newName.trim(), number: newNumber, id: persons.length + 1 },
    ];

    setPersons(newPersons);
    const searchForm = document.querySelector("#searchForm");
    if (searchForm.value) {
      setFilteredPersons(
        newPersons.filter((person) =>
          person.name.toLowerCase().includes(searchForm.value.toLowerCase()),
        ),
      );
    }
  }

  const handleChange = (fn) => (e) => {
    const myFunc = fn(e.target.value);
    return myFunc;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          placeholder="Add a new person"
          value={newName}
          onChange={handleChange(setNewName)}
        />
      </div>
      <div>
        number:{" "}
        <input
          placeholder="Add phone number"
          value={newNumber}
          onChange={handleChange(setNewNumber)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Phonebook = ({ props }) => {
  const { persons, filteredPersons, searchFailed } = props;

  return !filteredPersons.length && !searchFailed
    ? persons.map((person) => (
        <p key={person.id}>
          {person.name}&nbsp;{person.number}
        </p>
      ))
    : filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name}&nbsp;{person.number}
        </p>
      ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchFailed, setSearchFailed] = useState(false);
  useEffect(()  =>{
    axios.get("http://localhost:3000/persons")
    .then(response => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter props={{ persons, setFilteredPersons, setSearchFailed }} />
      <Form
        props={{
          newName,
          setNewName,
          newNumber,
          setNewNumber,
          persons,
          setPersons,
          setFilteredPersons,
        }}
      />
      <h2>Numbers</h2>
      <Phonebook props={{ persons, filteredPersons, searchFailed }} />
    </div>
  );
};

export default App;
