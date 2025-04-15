import React from "react";
import StaticStarRating from "./StaticStarRating";

import axios from "axios";

function ShopItem({
  image,
  title,
  description,
  rating,
  price,
  discount,
  shippingInformation,
  convertINRtoUSD,
}) {
  const finalPrice = Number(convertINRtoUSD(price)) || price;

  function calcMRP(price, discount) {
    const hundred = 100;

    // Ensure the input is a number
    const numericPrice = Number(price);
    const numericDiscount = Number(discount);

    // Validate inputs
    if (isNaN(numericPrice) || isNaN(numericDiscount)) {
      throw new Error("Both price and discount must be numbers.");
    }

    if (numericDiscount < 0 || numericDiscount >= hundred) {
      throw new Error("Discount must be between 0 and 100.");
    }

    // Calculate MRP
    const mrp = (numericPrice * hundred) / (hundred - numericDiscount);

    return Math.round(mrp * 100) / 100;
  }

  return (
    <div className="w-64 h-auto bg-white px-3 py-3 flex flex-col rounded-xl hover:scale-[1.02] hover:shadow-lg transition-transform duration-200">
      <div className="w-full h-[240px] bg-[#f3f3f3] rounded-xl mb-4 flex items-center justify-center">
        <img className="max-h-[90%] w-fit" src={image} alt={title + " Image"} />
      </div>
      <div
        className="font-mono max-h-[100px] overflow-y-auto appearance-none pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "" }}
      >
        <span className="text-lg font-semibold">{title}</span>{" "}
        <span className="text-sm">({description})</span>
      </div>
      <StaticStarRating rating={rating} />
      <div className="flex items-center gap-x-1.5 w-full justify-between">
        <span className="text-[20px] font-extrabold font-sans text-[#B12704]">
          {convertINRtoUSD(price) ? (
            <span className="mr-1 text-[14px]">&#8377;</span>
          ) : (
            <span className="mr-1 text-[14px]">$</span>
          )}
          {convertINRtoUSD(price) ? convertINRtoUSD(price) : price}
        </span>
        <span className="text-[#565959] font-[Poppins] text-[7.5px]">
          M.R.P{" "}
          <span className="font-sans line-through text-[#565959] ml-1">
            {calcMRP(finalPrice, discount)}
          </span>
        </span>
        <span className="text-[10px] text-[#565959] font-[Poppins]">
          <span className="font-bold">
            ({discount}%
            <span className="ml-1 italic" style={{ fontWeight: 400 }}>
              off
            </span>
            )
          </span>
        </span>
      </div>
      <div className="text-[#565959] font-[Poppins] text-sm">
        <span>
          Free delivery
          <span className="ml-1 font-bold text-black">
            {shippingInformation}
          </span>
        </span>
      </div>
      <button className="self-start mt-2 bg-[#FF9900] text-white px-4 py-2 rounded hover:bg-[#f90] transition-colors duration-200">
        Add to cart
      </button>
    </div>
  );
}

export default ShopItem;

// import React from "react";
// import StaticStarRating from "./StaticStarRating";

// function ShopItem({
//   image,
//   title,
//   description,
//   rating,
//   price,
//   discount,
//   shippingInformation,
// }) {
//   function calcMRP(price, discount) {
//     const hundred = 100;

//     if (typeof price !== "number" || typeof discount !== "number") {
//       throw new Error("Both price and discount must be numbers.");
//     }

//     if (discount < 0 || discount >= hundred) {
//       throw new Error("Discount must be between 0 and 100.");
//     }

//     const mrp = (price * hundred) / (hundred - discount);

//     return Number.isInteger(mrp) ? mrp : parseFloat(mrp.toFixed(2));
//   }

//   return (
//     <div className="w-64 h-auto bg-[#eee] px-3 py-3 flex flex-col rounded-xl hover:scale-[1.02] hover:shadow-lg transition-transform duration-200">
//       <div className="w-full h-[240px] bg-[#cccccc33] rounded-xl mb-4 flex items-center justify-center">
//         <img className="max-h-[90%] w-fit" src={image} alt={title + "Image"} />
//       </div>
//       <div
//         className="font-mono max-h-[100px] overflow-y-auto appearance-none pb-4 scrollbar-hide"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "" }}
//       >
//         <span className="text-lg font-semibold">{title}</span>{" "}
//         <span className="text-sm">({description})</span>
//       </div>
//       <StaticStarRating rating={rating} />
//       <div className="flex items-center gap-x-1.5 w-full justify-between">
//         <span className="text-[20px] font-extrabold font-sans">
//           <span className="mr-1 text-[#00c800] text-[14px]">&#8377;</span>
//           {price}
//         </span>
//         <span className="text-[#666]  font-[Poppins] text-[7.5px]">
//           M.R.P{" "}
//           <span className="font-sans line-through text-[#666] ml-1">
//             {calcMRP(price, discount)}
//           </span>
//         </span>
//         <span className="text-[10px] text-[#333] font-[Poppins]">
//           <span className="font-bold">
//             ({discount}%
//             {
//               <span className="ml-1 italic " style={{ fontWeight: 400 }}>
//                 off{" "}
//               </span>
//             }
//             )
//           </span>
//         </span>
//       </div>
//       <div className="text-[#333] font-[Poppins] text-sm">
//         <span className="">
//           Free delivery
//           {
//             <span className="ml-1 font-bold text-black">
//               {shippingInformation}
//             </span>
//           }
//         </span>
//       </div>
//       <button className="self-start mt-2 bg-[#FFD63A]">Add to cart</button>
//     </div>
//   );
// }

// export default ShopItem;

// *Previous Styling*
// import React from "react";
// import StaticStarRating from "./StaticStarRating";

// function ShopItem({ image, title, description, rating, price, discount }) {
//   function calcMRP(price: number, discount: number) {
//     return ((price * 100) / (100 - discount)).toFixed(0);
//   }

//   return (
//     <div className="w-[240px] bg-[#eee] px-2 py-4 flex flex-col rounded-3xl">
//       <div className="w-full h-[240px] bg-[#ccc] rounded-2xl mb-4 flex items-center justify-center">
//         <img className="max-h-[90%] w-fit" src={image} alt={title + "Image"} />
//       </div>
//       <div
//         className="font-mono max-h-[100px] overflow-y-auto appearance-none pb-4"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "" }}
//       >
//         <span className="text-lg font-semibold">{title}</span>{" "}
//         <span className="text-sm">({description})</span>
//       </div>
//       <StaticStarRating rating={rating} />
//       <div className="flex items-center gap-x-1.5 w-full justify-between">
//         <span className="text-[20px] font-extrabold font-sans">
//           <span className="mr-1 text-[#00c800] text-[14px]">&#8377;</span>
//           {price}
//         </span>
//         <span className="text-[#666]  font-[Poppins] text-[7.5px]">
//           M.R.P{" "}
//           <span className="font-sans line-through text-[#666] ml-1">
//             {calcMRP(price, discount)}
//           </span>
//         </span>
//         <span className="text-[10px] text-[#333] font-[Poppins]">
//           <span className="font-bold">
//             ({discount}%
//             {
//               <span className="ml-1 italic " style={{ fontWeight: 400 }}>
//                 off{" "}
//               </span>
//             }
//             )
//           </span>
//         </span>
//       </div>
//     </div>
//   );
// }

// export default ShopItem;
