import personService from "../services/persons";

const PersonForm = (props) => {
  const {
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    setMessage,
    setError,
  } = props;

  const newNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const addHandler = (event) => {
    event.preventDefault();
    if (!newName || !newNumber) {
      alert("Name or number is empty");
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    if (persons.map((person) => person.name).includes(newName)) {
      const targetPerson = persons.find(
        (person) => person.name === newName.trim()
      );

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(targetPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
            setError(true);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((res) => {
          setPersons(persons.concat(res.data));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${res.data.name}`);
          setError(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form>
      <div>
        name: <input value={newName} onChange={newNameHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={newNumberHandler} />
      </div>
      <div>
        <button type="submit" onClick={addHandler}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
