import React, { useState, useEffect } from "react";
import { CartState } from "./context/context";
import { AiFillDelete } from "react-icons/ai";

const Cart = ({ data }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [cokeOffer, setCokeOffer] = useState(false);
  const [croissants, setCroissants] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(false);
  const {
    state: { cart },
    dispatch,
    wishliststate: { wishlist },
    wishlistDispatch,
  } = CartState();

  // COKE OFFER

  useEffect(() => {
    if (!cokeOffer) {
      cart.map((e) => {
        if (e.id == 642 && e.buy_qty >= 6) {
          setCokeOffer(true);
          setDiscount((prev) => {
            const p = parseFloat(e.price.replace(/[^\d.-]/g, ""));
            return parseFloat((prev + p).toFixed(2));
          });
        }
      });
    }
  }, [cart]);

  useEffect(() => {
    if (cokeOffer) {
      cart.map((e) => {
        if (e.id == 642 && e.buy_qty < 6) {
          setDiscount((prev) => {
            const p = parseFloat(e.price.replace(/[^\d.-]/g, ""));
            return parseFloat((prev - p).toFixed(2));
          });
          setCokeOffer(false);
        }
      });
    }
  }, [cart]);

  // CROISSANTS OFFER

  useEffect(() => {
    if (!croissants) {
      const coffee = data.find((e) => e.id === 641);
      const croissantsInCart = cart.find((e) => e.id === 532);

      if (croissantsInCart && croissantsInCart.buy_qty >= 3) {
        setCroissants(true);

        // Calculate the number of free coffees based on the quantity of croissants
        const freeCoffeeQty = Math.floor(croissantsInCart.buy_qty / 3);

        if (freeCoffeeQty > 0) {
          // Update the cart to add the free coffees
          const cartCoffe = cart.some((item) => item.id == 641);
          console.log(cartCoffe);
          cart.map((e) => {
            if (e.id == coffee.id) {
              if (cartCoffe) {
                dispatch({
                  type: "CHANGE_QTY",
                  payload: {
                    id: coffee.id,
                    buy_qty: e.buy_qty + 1,
                  },
                });
              }
            }
          });

          if (!cartCoffe) {
            dispatch({
              type: "ADD_TO_CART",
              payload: coffee,
            });
          }

          // Calculate and update the discount
          const coffeePrice = parseFloat(coffee.price.replace(/[^\d.-]/g, ""));
          setDiscount((prev) =>
            parseFloat((prev + coffeePrice * freeCoffeeQty).toFixed(2))
          );
        }
      }
    }
  }, [cart]);

  useEffect(() => {
    if (croissants) {
      let coffee = {};
      data.map((e) => {
        if (e.id == 641) {
          coffee = e;
        }
      });

      cart.map((e) => {
        if (e.id == 532 && e.buy_qty < 3) {
          setCroissants(false);
          cart.map((m) => {
            if (m.id == 641 && m.buy_qty > 1) {
              console.log("HI FROM CHANGE QTY-1");
              dispatch({
                type: "CHANGE_QTY",
                payload: {
                  id: m.id,
                  buy_qty: m.buy_qty - 1,
                },
              });
            } else if (m.id == 641 && m.buy_qty == 1) {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: m,
              });
            }
          });
          setDiscount((prev) => {
            const p = parseFloat(coffee.price.replace(/[^\d.-]/g, ""));
            prev = prev - p.toFixed(2);
          });
        }
      });
    }
  }, [cart]);

  useEffect(() => {
    console.log(cokeOffer);
  }, [cart]);

  useEffect(() => {
    let totalPrice = 0;
    cart.forEach((e) => {
      const p = parseFloat(e.price.replace(/[^\d.-]/g, ""));
      totalPrice += p * e.buy_qty;
    });

    setSubTotal(parseFloat(totalPrice.toFixed(2)));
  }, [cart]);

  console.log(cart);
  console.log(subTotal);
  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="bg-white w-full h-full flex flex-col">
            <p className="mb-[20px]">Checkout</p>
            <div className="flex flex-col w-full h-[300px] overflow-y-scroll overflow-x-hidden ">
              {cart.map((e, i) => (
                <div className=" h-[100px] sm:w-full md:w-3/5 flex flex-wrap items-center  shadow-lg border mt-[20px] rounded-lg">
                  <div className="flex sm:w-full sm:h-[100px] sm:flex-col md:flex-row w-10/12 h-[40px]  justify-between items-center sm:items-center ">
                    <div className="flex md:ml-[10px]">
                      <div className="md:mx-[5px ]">
                        <img
                          className="h-[40px] w-[50px] object-cover"
                          src={e.img}
                          alt="img"
                        />
                      </div>
                      <div className="flex flex-col ml-[10px] md:w-[170px]">
                        <p className="font-semibold text-sm">{e.name}</p>
                        {/* <p className="text-sm">{e.name}</p> */}
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <div className="flex">
                        <p
                          className="mx-[4px] text-white text-xs hover:cursor-pointer px-1 rounded-md bg-red-500 border"
                          onClick={() => {
                            dispatch({
                              type: "CHANGE_QTY",
                              payload: {
                                id: e.id,
                                buy_qty: e.buy_qty - 1,
                              },
                            });
                          }}
                        >
                          -
                        </p>
                        <p className="  w-[20px]  text-center text-sm">
                          {e.buy_qty}
                        </p>
                        <p
                          className=" text-white text-xs hover:cursor-pointer px-1 rounded-md bg-green-500 border"
                          onClick={() => {
                            if (e.available - e.buy_qty > 0) {
                              dispatch({
                                type: "CHANGE_QTY",
                                payload: {
                                  id: e.id,
                                  buy_qty: e.buy_qty + 1,
                                },
                              });
                            } else {
                              setError(true);
                            }
                          }}
                        >
                          +
                        </p>
                      </div>
                      <div className="mt-[10px]">
                        {e.available - e.buy_qty > 9 ? (
                          <>
                            <p className="text-xs px-1 border rounded-lg bg-green-500 text-center text-white">
                              {e.available - e.buy_qty} Available
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs px-1 border rounded-lg bg-orange-500 text-center text-white">
                              {e.available - e.buy_qty}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex ">
                      <p className="w-[30px]">
                        £
                        {(
                          parseFloat(e.price.replace(/[^\d.-]/g, "")) *
                          e.buy_qty
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex ml-[30px]">
                      <AiFillDelete
                        className="hover:cursor-pointer md:mr-[10px]"
                        size={25}
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: e,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-3/5 flex-col items-center">
              <div className="w-full border-t-2 my-3"></div>
              <div className="flex w-full justify-center ">
                <p className="w-[80px]">Subtotal</p>
                <p className="ml-[30px]">£{subTotal}</p>
              </div>
              <div className="w-full border-t-2 my-3"></div>
              <div className="flex ">
                <p className="w-[80px]">Discount</p>
                <p className="ml-[30px]">£{discount}</p>
              </div>
              <div className="w-full border-t-2 my-3"></div>
              <div className="flex ">
                <p className="w-[80px]">Total</p>
                <p className="ml-[30px]">
                  £{parseFloat((subTotal - discount).toFixed(2))}
                </p>
              </div>
              <div className="w-full border-t-2 my-3"></div>
              <button className="px-3 py-2 bg-green-600 font-semibold w-[100px]">
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center items-center">
          <p className="text-lg font-bold">NO Items in Cart</p>
        </div>
      )}
    </>
  );
};

export default Cart;
