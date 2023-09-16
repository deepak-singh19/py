import React from "react";

const SearchBar = ({
  search,
  setSearch,
  data,
  filteredData,
  setFilteredData,
}) => {
  console.log(data + "DATA");
  const filterBySearch = (event) => {
    setSearch(event.target.value);
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = data;
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredData(updatedList);
  };
  return (
    <div className="flex md:w-8/12 sm:w-1/3 h-full">
      <input
        className="bg-white w-full px-4 py-2 sm:px-2 rounded-lg shadow-md"
        name="search"
        value={search}
        placeholder="Search"
        onChange={filterBySearch}
      />
    </div>
  );
};

export default SearchBar;
