/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Phonebook from "./components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchFailed, setSearchFailed] = useState(false);
  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        props={{ persons, setFilteredPersons, setSearchFailed, setPersons }}
      />
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
      <Phonebook
        props={{ persons, filteredPersons, searchFailed, setPersons }}
      />
    </div>
  );
};

export default App;
