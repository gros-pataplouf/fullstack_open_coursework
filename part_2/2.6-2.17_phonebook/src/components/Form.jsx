import personsService from "../services/persons";

/* eslint-disable react/prop-types */
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim() || !newNumber.trim()) {
      return window.alert("Form incomplete");
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1,
    };
    // eslint-disable-next-line no-unused-vars
    const [existingPerson, ...rest] = await personsService.getByName(
      newName.trim(),
    );
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Update existing phonenumber?`,
        )
      ) {
        personsService
          .update(existingPerson.id, newPerson)
          .then((response) => {
            console.log(response);
            window.alert(`${existingPerson.name} has been updated.`);
            personsService.getAll().then((response) => {
              console.log(response);
              setPersons(response.data);
            });
          })
          .catch((error) => {
            console.error(error);
            return window.alert(
              "Sorry, there has been a problem updating",
              existingPerson.name,
            );
          });
      }
      return;
    } else {
      personsService
        .create(newPerson)
        .then((response) => {
          console.log(response);
          personsService.getAll().then((response) => {
            setPersons(response.data);
            //handle situation where searchForm has entry, filtered results should be updated without reload
            const searchForm = document.querySelector("#searchForm");
            if (searchForm.value) {
              setFilteredPersons(
                response.data.filter((person) =>
                  person.name
                    .toLowerCase()
                    .includes(searchForm.value.toLowerCase()),
                ),
              );
            }
          });
        })
        .catch((error) => {
          console.error(error);
          window.alert("There has been an error adding ", newPerson.name);
        });
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

export default Form;
