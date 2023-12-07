/* eslint-disable react/prop-types */
import personsService from "../services/persons";

const PhonebookEntry = ({ person, setPersons, setMessage }) => {
  function handleDelete(e) {
    const personId = e.target.parentNode.getAttribute("data-id");
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .destroy(personId)
        .then((response) => {
          console.log(response);
          setMessage({
            type: "success",
            text: `${person.name} has been deleted!`,
          });
          setTimeout(() => {
            setMessage({ type: null, text: "" });
          }, 2000);
          personsService.getAll().then((response) => {
            console.log(response);
            setPersons(response.data);
          });
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setMessage({
              type: "warning",
              text: `${person.name} has already been deleted!`,
            });
          } else {
            setMessage({
              type: "warning",
              text: `There has been an unexpected problem deleting ${person.name} `,
            });
          }
          setTimeout(() => {
            setMessage({ type: null, text: "" });
          }, 2000);
        });
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
  const { persons, filteredPersons, searchFailed, setPersons, setMessage } =
    props;

  return !filteredPersons.length && !searchFailed
    ? persons.map((person) => (
        <PhonebookEntry
          key={person.id}
          person={person}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      ))
    : filteredPersons.map((person) => (
        <PhonebookEntry
          key={person.id}
          person={person}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      ));
};

export default Phonebook;
