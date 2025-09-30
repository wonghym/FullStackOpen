const Countries = ({ countries, showHandler }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <>
      {countries.map((country) => {
        return (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => showHandler(country.name.common)}>
              Show
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Countries;
