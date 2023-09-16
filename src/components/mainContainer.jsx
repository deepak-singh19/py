import React, { useState, useEffect } from "react";
import { Items } from "../utills/data";
import Cards from "./cards";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiFillDelete,
} from "react-icons/ai";
import { CartState } from "../context/context";
import axios from "axios";

const MainContainer = ({ filteredData, setFilteredData, data, setData }) => {
  const [cat, setCat] = useState([]);

  const {
    state: { cart },
    dispatch,
    wishliststate: { wishlist },
    wishlistDispatch,
  } = CartState();

  // console.log(wishlist);

  useEffect(() => {
    const m = [];
    console.log("data" + data);
    data.map((e) => {
      m.push(e.type);
    });
    const uniqueCategories = Array.from(new Set(m));
    setCat(uniqueCategories);
    setFilteredData(data); // Initialize filteredData with all items
  }, [data]);

  const handleData = (category) => {
    console.log(category);
    if (category === "All Items") {
      setFilteredData(data); // Reset to all items when "All Items" is selected
    } else {
      const newItem = data.filter((e) => e.type === category);
      setFilteredData(newItem); // Set the filtered items
    }
  };

  // const filterBySearch = (event) => {
  //   // Access input value
  //   const query = search;
  //   // Create copy of item list
  //   var updatedList = [...Items];
  //   // Include all elements which includes the search query
  //   updatedList = updatedList.filter((item) => {
  //     return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  // });
  //   // Trigger render with updated values
  //   setFilteredData(updatedList);
  // };

  return (
    <div className="flex w-full flex-col">
      <div className="flex  md:w-1/2 justify-between">
        <p
          className="px-3 py-1 border rounded-full hover:cursor-pointer"
          onClick={() => handleData("All Items")}
        >
          All Items
        </p>
        {cat.map((category, i) => (
          <div key={i}>
            <p
              className="px-3 py-1 border rounded-full hover:cursor-pointer"
              onClick={() => handleData(category)}
            >
              {category}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold mt-16">Trending Items</p>
        <div className="flex w-full h-full flex-wrap">
          {filteredData.map((e, i) => (
            <div
              key={i}
              className="flex sm:w-full md:w-2/5 h-[300px] shadow-lg rounded-lg mr-16 mb-16"
            >
              <div className="flex w-3/5 justify-center items-center">
                <img
                  className="md:w-[250px] md:h-[280px] sm:w-[100px] sm:h-[100px] object-cover"
                  src={e.img}
                  alt="img"
                />
              </div>
              <div className="flex flex-col w-2/5 justify-between h-full mx-[8px]">
                <div className="flex flex-col 1/4">
                  <p className="font-semibold">{e.name}</p>
                  <p className="font-light text-sm">
                    {e.description.split(/\s+/).slice(0, 10).join(" ")}
                  </p>
                </div>
                <div className="flex flex-col mb-[10px] h-1/2 justify-around">
                  <div>
                    {e.available < 9 ? (
                      <p className="px-3 py-1 rounded-full borde text-sm text-white bg-orange-600 w-[130px]">
                        Only {e.available} left
                      </p>
                    ) : (
                      <p className="text-sm px-3 py-1 rounded-full border text-sm text-white bg-green-600 w-[90px]">
                        Available
                      </p>
                    )}
                  </div>
                  <div className="flex mr-2 justify-between">
                    <div>
                      <p>{e.price}</p>
                    </div>
                    <div className="flex w-1/3 justify-between items-center">
                      <div>
                        {wishlist.some((c) => c.id === e.id) ? (
                          <>
                            <AiFillHeart
                              className="text-red-600"
                              size={20}
                              onClick={() => {
                                wishlistDispatch({
                                  type: "REMOVE_FROM_WISHLIST",
                                  payload: e,
                                });
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <AiOutlineHeart
                              size={20}
                              onClick={() => {
                                wishlistDispatch({
                                  type: "ADD_TO_WISHLIST",
                                  payload: e,
                                });
                              }}
                            />
                          </>
                        )}
                      </div>
                      <div>
                        {cart.some((p) => p.id === e.id) ? (
                          <>
                            <AiFillDelete
                              className="text-blue-600"
                              size={20}
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: e,
                                });
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <AiOutlineShoppingCart
                              size={20}
                              onClick={() => {
                                dispatch({
                                  type: "ADD_TO_CART",
                                  payload: e,
                                });
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
