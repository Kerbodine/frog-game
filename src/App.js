import { useState } from "react";
import Frog from "./components/Frog";

export default function App() {
  const [red, setRed] = useState(2);
  const [blue, setBlue] = useState(2);
  const [frogs, setFrogs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);
  const [start, setStart] = useState(false);

  const MAX_NUM = 8;

  const handleRed = (e) => {
    const num = e.target.value;
    setRed(num > MAX_NUM ? MAX_NUM : num);
  };

  const handleBlue = (e) => {
    const num = e.target.value;
    setBlue(num > MAX_NUM ? MAX_NUM : num);
  };

  const generateFrogs = () => {
    setStart(true);
    setWin(false);
    setFrogs([]);
    setMoves(0);
    for (let i = 0; i < red; i++) {
      setFrogs((prev) => [...prev, "R"]);
    }
    setFrogs((prev) => [...prev, "_"]);
    for (let i = 0; i < blue; i++) {
      setFrogs((prev) => [...prev, "B"]);
    }
  };

  const handleClick = (i, color) => {
    const newFrogs = [...frogs];
    try {
      if (color === "R") {
        if (frogs[i + 1] === "_") {
          newFrogs[i + 1] = "R";
          newFrogs[i] = "_";
          setMoves((prev) => prev + 1);
        } else if (frogs[i + 1] !== "_" && frogs[i + 2] === "_") {
          newFrogs[i + 2] = "R";
          newFrogs[i] = "_";
          setMoves((prev) => prev + 1);
        }
      } else if (color === "B") {
        if (frogs[i - 1] === "_") {
          newFrogs[i - 1] = "B";
          newFrogs[i] = "_";
          setMoves((prev) => prev + 1);
        } else if (frogs[i - 1] !== "_" && frogs[i - 2] === "_") {
          newFrogs[i - 2] = "B";
          newFrogs[i] = "_";
          setMoves((prev) => prev + 1);
        }
      } else {
        return;
      }
      setFrogs(newFrogs);
      checkWin(newFrogs);
    } catch (e) {
      console.log(e);
    }
    console.log(frogs);
  };

  const checkWin = (arr) => {
    if (
      arr.slice(0, blue).every((x) => x === "B") &&
      arr.slice(-red).every((x) => x === "R")
    ) {
      setWin(true);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="border-2 border-gray-200 bg-white rounded-2xl">
        <div className="flex gap-2 p-3">
          <div className="flex flex-col">
            <label
              htmlFor="red-frogs"
              className="text-sm capitalize font-bold text-gray-500"
            >
              RED FROGS
            </label>
            <input
              id="red-frogs"
              min={1}
              max={8}
              type="number"
              value={red}
              onChange={handleRed}
              className="outline-none px-2 py-1 rounded-md bg-white border-2 border-gray-200 focus:border-gray-500 w-24"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="blue-frogs"
              className="text-sm capitalize font-bold text-gray-500"
            >
              BLUE FROGS
            </label>
            <input
              id="blue-frogs"
              min={1}
              max={8}
              type="number"
              value={blue}
              onChange={handleBlue}
              className="outline-none px-2 py-1 rounded-md bg-white border-2 border-gray-200 focus:border-gray-500 w-24"
            />
          </div>
          <button
            onClick={generateFrogs}
            className="w-20 h-auto grid place-items-center border-2 border-gray-500 hover:bg-gray-500 hover:text-white rounded-md"
          >
            {!win ? (start ? "Reset" : "Start") : "Restart"}
          </button>
        </div>
        <div>
          {!win && start && (
            <>
              <hr className="h-0.5 bg-gray-200" />
              <div className="flex gap-2 p-3">
                {frogs.map((frog, i) => (
                  <Frog
                    key={i + frog}
                    color={frog}
                    index={i}
                    click={handleClick}
                  />
                ))}
              </div>
            </>
          )}
          {win && (
            <div className="flex p-4 justify-center">
              <p className="text-xl font-semibold text-gray-600">
                Completed in {moves} moves!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
