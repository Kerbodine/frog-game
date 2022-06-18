import React from "react";

const Frog = ({ index, color, click }) => {
  const handleClick = () => {
    click(index, color);
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        color === "R"
          ? "border-red-400 bg-red-400"
          : color === "B"
          ? "border-blue-500 bg-blue-500"
          : "border-gray-400 bg-gray-400"
      } w-16 h-16 rounded-md grid place-items-center text-4xl text-white border-2 bg-opacity-75 hover:bg-opacity-100 transition-colors`}
    >
      {color === "R" ? "→" : color === "B" ? "←" : ""}
    </button>
  );
};

export default Frog;
