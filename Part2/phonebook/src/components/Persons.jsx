import personService from "../services/persons";

const Persons = ({ persons, search, setPersons }) => {
  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then((res) => {
        setPersons(persons.filter((person) => person.id !== res.data.id));
      });
    }
  };

  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => {
          return (
            <div key={person.name}>
              {person.name} {person.number}
              <button onClick={() => deleteHandler(person.id, person.name)}>
                delete
              </button>
            </div>
          );
        })}
    </>
  );
};

export default Persons;
