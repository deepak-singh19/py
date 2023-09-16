import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { CartState } from "../context/context";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const [mobile, setMobile] = useState(false);
  const {
    state: { cart },
    dispatch,
    wishliststate: { wishlist },
    wishlistDispatch,
  } = CartState();
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex h-full w-1/6 justify-around items-end">
        <div className="flex relative">
          <AiFillHeart
            className="text-red-600 hover:cursor-pointer"
            size={30}
          />
          {wishlist.length > 0 ? (
            <div className="absolute top-[-13px] left-[25px] w-[18px] border h-[18px] flex justify-center rounded-[100%] bg-red-600">
              <p className="text-xs text-white">{wishlist.length}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex relative">
          <CgProfile className="hover:cursor-pointer" size={30} />
        </div>
        <div className="flex relative">
          <AiOutlineShoppingCart
            className="hover:cursor-pointer"
            onClick={() => {
              navigate("/cart");
            }}
            size={30}
          />
          {cart.length > 0 ? (
            <div className="absolute top-[-13px] left-[25px] w-[18px] border h-[18px] flex justify-center rounded-[100%] bg-blue-500">
              <p className="text-xs text-white">{cart.length}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:invisible relative mr-[10px]">
        <AiOutlineMenu size={25} onClick={() => setMobile(!mobile)} />
        <div className="relative">
          {mobile ? (
            <>
              <div className="flex flex-col justify-between right-[2px] w-[100px] bg-white h-[170px] absolute px-[10px] border-2 shadow-2xl py-2">
                <div className="flex " onClick={() => setMobile(false)}>
                  <AiFillHeart className="text-red-600" size={22} />
                  <p className="ml-3 text-xs font-semibold">Wishlist</p>
                </div>
                <div
                  onClick={() => {
                    navigate("/cart");
                    setMobile(() => setMobile(false));
                  }}
                  className="flex"
                >
                  <AiOutlineShoppingCart className="text-blue-600" size={22} />
                  <p className="ml-3 text-xs font-semibold">Cart</p>
                </div>
                <div className="flex " onClick={() => setMobile(false)}>
                  <CgProfile size={22} />
                  <p className="ml-3 text-xs font-semibold">Profile</p>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SideNav;
