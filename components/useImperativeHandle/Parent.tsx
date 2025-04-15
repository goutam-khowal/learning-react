"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Child from "./Child";

function Parent() {
  const childRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    childRef.current.openModal((status) => {
      setIsModalOpen(status);
    });
  }

  useLayoutEffect(() => {
    if (isModalOpen) {
      childRef.current?.pov();
    }
  }, [isModalOpen]);

  return (
    <div className="bg-[#333] mx-auto w-[90%] px-5 py-4 rounded-md flex flex-col items-center gap-y-10">
      <p className="text-center text-2xl font-semibold">
        This is parent component
      </p>
      <Child ref={childRef} />
      {!isModalOpen && (
        <button
          className="border-2 px-5 py-3 rounded bg-blue-600 hover:bg-blue-700 flex-1 w-fit"
          onClick={() => {
            handleOpenModal();
          }}
        >
          Open Modal
        </button>
      )}
    </div>
  );
}

export default Parent;

// "use client";

// import React, {
//   useRef,
//   useImperativeHandle,
//   forwardRef,
//   useState,
// } from "react";
// import CustomInput from "./Child";

// // Child component that exposes methods to parent via useImperativeHandle

// // Parent component that uses the ref to call child methods
// const ParentComponent = () => {
//   const [isBgChanged, setIsBgChanged] = useState(false);
//   // Create a ref to hold the child's exposed methods
//   const childRef = useRef();

//   const handleFocusClick = () => {
//     // Now we can call the focus method exposed by the child
//     childRef.current.focus();
//   };

//   const handleBgClick = () => {
//     // Now we can call the focus method exposed by the child
//     const newBgState = childRef.current.toggleBackground();

//     setIsBgChanged(newBgState);
//   };

//   const handleClearClick = () => {
//     // Call the clear method exposed by the child
//     childRef.current.clear();
//   };

//   const handleGetValueClick = () => {
//     // Get the current value from the child component
//     alert(`Current value: ${childRef.current.getValue()}`);
//   };

//   return (
//     <div>
//       <h2>useImperativeHandle Example</h2>

//       {/* Attach our ref to the CustomInput component */}
//       <CustomInput ref={childRef} />

//       <div>
//         <button onClick={handleFocusClick}>Focus Input</button>
//         <button onClick={handleClearClick} style={{ marginLeft: "10px" }}>
//           Clear Input
//         </button>
//         <button onClick={handleGetValueClick} style={{ marginLeft: "10px" }}>
//           Get Value
//         </button>
//         <button onClick={handleBgClick} style={{ marginLeft: "10px" }}>
//           {isBgChanged ? "black input" : "white input"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ParentComponent;
