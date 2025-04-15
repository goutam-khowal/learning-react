"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

function Child(props, ref) {
  const [openModal, setOpenModal] = useState(false);

  const onToggleCallbackRef = useRef(() => {});
  const element = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: (onToggle) => {
      onToggleCallbackRef.current = onToggle;
      setOpenModal(true);
      onToggle(true);
    },

    closeModal: () => {
      setOpenModal(false);
      onToggleCallbackRef.current(false);
    },

    pov: () => {
      element.current.scrollIntoView({ behavior: "smooth" });
    },
  }));

  if (!openModal) {
    return null;
  }

  return (
    <div
      ref={element}
      className="relative bg-blue-200 w-[90%] h-fit mx-auto rounded-[8px] outline-3  outline-[gold] text-lg flex flex-col items-center py-5 "
    >
      <p className="text-justify  w-[90%] text-[#333] font-serif my-5 font-semibold mt-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        This is Modal. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Assumenda, ullam dicta quam incidunt commodi dolore sunt, perferendis
        aperiam doloremque tempore consequuntur? Dolores nobis odio debitis
        dicta nesciunt odit consequuntur beatae quasi est numquam optio, placeat
        et sint ullam delectus consectetur qui aperiam! Vero, earum nobis!
      </p>
      <p className=" w-[65%] text-[#333] font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ">
        This is Modal. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Assumenda, ullam dicta quam incidunt commodi dolore sunt, perferendis
        aperiam doloremque tempore consequuntur? Dolores nobis odio debitis
        dicta nesciunt odit consequuntur beatae quasi est numquam optio, placeat
        et sint ullam delectus consectetur qui aperiam! Vero, earum nobis!
      </p>
      <button
        title="Close Modal"
        className="absolute right-5 text-xl border-1 border-[#555] rounded bg-[#ddd] hover:bg-[#fff] transition-colors duration-300"
        onClick={() => {
          setOpenModal(false);
          onToggleCallbackRef.current(false);
        }}
      >
        ❌
      </button>
    </div>
  );
}

export default forwardRef(Child);

// import React, {
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import "./background.css";

// const CustomInput = (props, ref) => {
//   const [value, setValue] = useState("");
//   const inputRef = useRef();

//   // Define the methods/properties to expose to parent
//   useImperativeHandle(ref, () => ({
//     // Custom methods that will be available to parent

//     toggleBackground: () => {
//       inputRef.current.classList.toggle("input-bg");

//       return inputRef.current.classList.contains("input-bg");
//     },

//     focus: () => {
//       inputRef.current.focus();
//     },
//     clear: () => {
//       setValue("");
//     },
//     getValue: () => {
//       return value;
//     },
//     // You can also expose properties
//     inputElement: inputRef.current,
//   }));

//   return (
//     <input
//       ref={inputRef}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       placeholder="Type something..."
//       style={{ padding: "8px", margin: "10px 0" }}
//     />
//   );
// };

// export default forwardRef(CustomInput);
