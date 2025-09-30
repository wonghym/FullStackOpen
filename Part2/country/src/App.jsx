import { useState } from "react";
import Countries from "./components/Countries";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setAllCountries(res.data);
        console.log("effect");
      });
  }, []);

  const queryHandler = (event) => {
    const countries = allCountries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setQuery(event.target.value.toLowerCase());
    setCountries(countries);
  };

  const showHandler = (name) => {
    setSelectedCountry(name);
  };

  return (
    <>
      <div>
        find countries <input value={query} onChange={queryHandler}></input>
      </div>
      <Countries countries={countries} showHandler={showHandler} />
    </>
  );
}

export default App;
