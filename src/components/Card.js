import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer"; // Make sure to import useCart

export default function Card(props) {
  let dispatch = useDispatchCart(); // Access dispatch function from context
  let data = useCart(); // Access cart data from context
  let options = props.options; // Options for size and price
  let priceOptions = Object.keys(options); // Extract size options from options object
  const priceRef = useRef(); // Reference for size selection dropdown

  const [qty, setQty] = useState(1); // State for quantity
  const [size, setSize] = useState(""); // State for selected size

  // Function to increase quantity
  const handleIncrease = () => {
    setQty((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease quantity, ensuring it doesn't go below 1
  const handleDecrease = () => {
    setQty((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Function to handle adding item to cart
  const handleAddToCart = async () => {
    let finalPrice = qty * parseInt(options[size]); // Calculate final price based on quantity and selected size
    let foodItem = props.foodItem; // Assuming props.foodItem is correctly passed
    let food = [];

    // Check if the item already exists in the cart
    for (const item of data) {
      if (item.id === foodItem._id && item.size === size) {
        food = item; // Assign existing item from cart to food if found
        break;
      }
    }

    console.log(food); // Log the found item
    console.log(new Date()); // Log current date/time

    // Update or add item to cart based on whether it already exists
    if (food && food.size === size) {
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        price: finalPrice,
        qty: qty,
      });
      return; // Exit function after updating
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img, // Assuming img is passed correctly
      });
      console.log("Size different so simply ADD one more to the list"); // Log message when adding new item
      return; // Exit function after adding
    }
  };

  // Effect to set initial size value from dropdown
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]); // Calculate final price based on current size selection

  return (
    <div>
      <div className="card mt-3" style={{ width: "19.5rem", maxHeight: "530px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "210px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="container w-100">
            <div className="d-flex align-items-center">
              {/* Button to decrease quantity */}
              <button
                className="btn btn-success m-2 fs-small"
                onClick={handleDecrease}
              >
                -
              </button>
              {/* Display current quantity */}
              <span className="m-2">{qty}</span>
              {/* Button to increase quantity */}
              <button
                className="btn btn-success m-2 fs-small"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            {/* Dropdown to select size */}
            <select
              className="m-2 h-100 bg-success rounded fs-5"
              ref={priceRef} // Reference for size dropdown
              onChange={(e) => setSize(e.target.value)} // Update size state based on selection
            >
              {/* Map through size options */}
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            {/* Display final price based on quantity and selected size */}
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr></hr>
          {/* Button to add item to cart */}
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
