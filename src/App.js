import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [total, setTotal] = useState(0);  // Keeps track of the total amount
  const [input, setInput] = useState("");  // Stores the number typed in
  const [isNegative, setIsNegative] = useState(false); // Tracks if "-" is typed
  const [isAnimating, setIsAnimating] = useState(false); // Track if animation should be triggered

  // Update the input state when a key is pressed
  const handleKeyPress = (event) => {
    const value = event.key;

    if (!isNaN(value) || value === "." || value === "-") {
      // Append the pressed key (numbers or dot) to the input string
      setInput((prev) => prev + value);
    } else if (value === "Backspace") {
      // Remove the last character on backspace
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "-" && input === "") {
      // Only set isNegative if the input is empty (to indicate subtraction mode)
      setIsNegative(true);  // Set the mode for subtraction (not adding "-" yet)
    } else if (value === "Enter") {
      // On pressing "Enter", apply the subtraction or addition
      if (isNegative) {
        setTotal(total - parseFloat(input)); // Subtract the number
      } else {
        setTotal(total + parseFloat(input)); // Add the number
      }

      // Trigger the animation by setting `isAnimating` to true, then reset it
      setIsAnimating(true);
      setInput("");  // Clear the input after operation
      setIsNegative(false);  // Reset the subtraction mode

      // Reset the animation flag after animation duration (so it can be triggered again)
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);  // Assuming the bounce animation lasts 500ms
    }
  };

  // Add event listener for keypresses when the component mounts
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input, total, isNegative]);

  // Round to the nearest hundredth and append "$"
  const formattedTotal = `$${(Math.round(total * 100) / 100).toFixed(2)}`;

  return (
    <div className="App">
      <div className={`big-number ${isAnimating ? "bounce" : ""}`}>
        {formattedTotal}
      </div>
      {input &&
        <div className="subtitle">$ {input}</div>
      }
    </div>
  );
}

export default App;
