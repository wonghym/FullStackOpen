import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((res) => {
      console.log(res.data);
      setPersons(res.data);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter search={search} setSearch={setSearch} />
      <h3>add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setError={setError}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} setPersons={setPersons} />
    </div>
  );
};

export default App;
