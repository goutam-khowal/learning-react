"use client";

import React, { useEffect, useMemo, useState } from "react";
import ShopItem from "./ShopItem";
import {
  getWithExpiry,
  setWithExpiry,
} from "@/utils/useLocalStorageWithExpiry";
import { productsList } from "./products";
import axios from "axios";

async function getData() {
  const response = await axios.get(
    `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}`
  );
  const data = response.data;
  return data;
}

function ShoppingCart() {
  const [cartCount, setCartCount] = useState(10);

  const [currencyData, setCurrencyData] = useState(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      const cached = getWithExpiry("currencyData");
      if (cached) {
        setCurrencyData(cached);
        console.log("Used cached currency data");
        console.log(cached);
        return;
      }

      try {
        const data = await getData();
        console.log(data);
        setCurrencyData(data);
        setWithExpiry("currencyData", data, 24 * 60 * 60 * 1000);
        console.log("Fetched new currency data");
      } catch (err) {
        console.error("Failed to fetch currency data", err);
      }
    };

    fetchCurrency();
  }, []);

  // alert(currencyData);

  function roundToNearest(num, nearest = 10) {
    return Math.round(num / nearest) * nearest;
  }

  function convertINRtoUSD(price) {
    if (currencyData) {
      const usd = currencyData?.rates.USD;
      const euro = currencyData?.rates.EUR;
      const inr = currencyData?.rates.INR;

      const usdToInr = (inr / usd) * euro;

      const priceInINR = usdToInr * price;

      if (priceInINR >= 0 && priceInINR <= 100)
        return roundToNearest(priceInINR) - 1;
      if (priceInINR >= 101) return roundToNearest(priceInINR, 50) - 1;
    }

    return null;
  }

  return (
    <div className="my-4 w-[300px] sm:w-[620px] md:w-[740px] lg:w-[85%] 2xl:w-[1300px] bg-white flex flex-col rounded mx-auto text-black font-serif rounded-t-3xl rounded-b-xl">
      <div className="w-full bg-[#232f3e] text-white rounded-t-3xl py-5">
        <h1 className="text-xl md:text-3xl text-center font-bold">
          Project 4: Shopping Cart
        </h1>
      </div>
      <nav className="bg-[#131921] flex items-center h-20 px-4 justify-between">
        <h1 className="text-2xl font-semibold text-white">
          <span className="text-[#FF9900]">shop</span>
          <span className="text-white">.E</span>
        </h1>
        <button className="relative flex rounded-xl hover:opacity-100 opacity-90 hover:scale-105 w-12 transition-all duration-200 hover:border-1  hover:border-white rounded-2xl items-center justify-center">
          <img
            className="w-full cursor-pointer m-0 p-0 flex fill-[#FF9900]"
            src={"cart.svg"}
            alt="cart svg"
          />
          {cartCount > 0 && (
            <span className="text-white font-bold z-[2] absolute text-sm mt-3">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center px-10 gap-4 p-4">
        {productsList.map((product) => (
          <ShopItem
            key={product.id}
            shippingInformation={product.shippingInformation}
            image={product.images[0]}
            title={product.title}
            description={product.description}
            rating={product.rating}
            price={product.price}
            convertINRtoUSD={convertINRtoUSD}
            discount={product.discountPercentage}
          />
        ))}
      </div>
    </div>
  );
}

export default ShoppingCart;

// "use client";

// import React, { useState } from "react";
// import ShopItem from "./ShopItem";
// import { productsList } from "./products";

// function ShoppingCart() {
//   const [cartCount, setCartCount] = useState(10);

//   return (
//     <div className="my-4 w-[300px] sm:w-[620px] md:w-[740px] lg:w-[85%] 2xl:w-[1300px] bg-[#9ACBD0] flex flex-col rounded mx-auto text-blue-950 font-serif rounded-t-3xl rounded-b-xl">
//       <div className="w-full bg-[#0095ff] text-[#d5ff55] text-shadow-lg  rounded-t-3xl py-5">
//         <h1 className="text-xl md:text-3xl text-center font-bold">
//           Project 4: Shopping Cart
//         </h1>
//       </div>
//       <nav className="bg-[#006A71] flex items-center h-20 px-4 justify-between">
//         <h1 className="text-2xl font-semibold">
//           <span className="text-[#9ACBD0]">shop</span>
//           <span className="text-[#F2EFE7]">.E</span>
//         </h1>
//         <button className="relative flex rounded-xl border-1 hover:opacity-[1] opacity-[0.90] hover:scale-105 w-12 transition-all duration-200 hover:border-1 hover:bg-[#285c60] border-[#ffffff55] rounded-2xl items-center justify-center">
//           <img
//             className="w-full cursor-pointer m-0 p-0 flex"
//             src={"cart.svg"}
//             alt="cart svg"
//           />
//           {cartCount > 0 && (
//             // cursor-pointer m-0 p-0 text-xs absolute right-[13px] top-6.5 text-[#222] font-bold font-mono bg-[#fff] rounded-full h-4 w-4 z-[1] flex items-center justify-center border-1 border-[#f2efe7]
//             <span className="text-[#FFD63A] font-bold z-[2] absolute text-sm mt-3">
//               {cartCount}
//             </span>
//           )}
//         </button>
//       </nav>
//       <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center px-10 gap-4 p-4">
//         {productsList.map((product) => (
//           <ShopItem
//             key={product.id}
//             shippingInformation={product.shippingInformation}
//             image={product.images[0]}
//             title={product.title}
//             description={product.description}
//             rating={product.rating}
//             price={product.price}
//             discount={product.discountPercentage}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ShoppingCart;
