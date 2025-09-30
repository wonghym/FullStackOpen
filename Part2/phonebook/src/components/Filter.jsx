const Filter = ({ search, setSearch }) => {
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      filter shown with <input value={search} onChange={searchHandler} />
    </div>
  );
};

export default Filter;
