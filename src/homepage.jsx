import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/searchBar";
import SideNav from "./components/sideNav";
import MainContainer from "./components/mainContainer";
import Cart from "./cart";
import axios from "axios";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all"
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-white w-full h-full flex flex-col mt-10 pl-7">
        <div className="flex w-full h-10 w-full justify-around">
          <Link to="/">
            <div className="flex justify-center">
              <p className="text-lg font-semibold">Groceries</p>
            </div>
          </Link>
          <SearchBar
            search={search}
            setSearch={setSearch}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            data={data}
          />
          <SideNav />
        </div>
        <div className="flex w-full pl-7 mt-16 ">
          <div className="w-full">
            <Routes>
              <Route
                path="/"
                element={
                  <MainContainer
                    filteredData={filteredData}
                    setFilteredData={setFilteredData}
                    data={data}
                    setData={setData}
                  />
                } // Use 'element' to specify the component to render
              />
              <Route path="/cart" element={<Cart data={data} />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Homepage;
