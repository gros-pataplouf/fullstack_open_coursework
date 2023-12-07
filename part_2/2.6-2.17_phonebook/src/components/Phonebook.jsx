/* eslint-disable react/prop-types */
import personsService from "../services/persons";

const PhonebookEntry = ({ person, setPersons }) => {
  function handleDelete(e) {
    const personId = e.target.parentNode.getAttribute("data-id");
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .destroy(personId)
        .then((response) => {
          console.log(response);
          window.alert(`${person.name} has been deleted.`);
          personsService.getAll().then((response) => {
            console.log(response);
            setPersons(response.data);
          });
        })
        .catch((error) => console.error(error));
    }
  }
  return (
    <p data-id={person.id}>
      {person.name}&nbsp;{person.number}{" "}
      <button onClick={handleDelete}>Delete</button>
    </p>
  );
};

const Phonebook = ({ props }) => {
  const { persons, filteredPersons, searchFailed, setPersons } = props;

  return !filteredPersons.length && !searchFailed
    ? persons.map((person) => (
        <PhonebookEntry
          key={person.id}
          person={person}
          setPersons={setPersons}
        />
      ))
    : filteredPersons.map((person) => (
        <PhonebookEntry
          key={person.id}
          person={person}
          setPersons={setPersons}
        />
      ));
};

export default Phonebook;
