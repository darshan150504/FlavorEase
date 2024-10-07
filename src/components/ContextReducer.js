import React, { useReducer, useContext, createContext } from "react";

// Create contexts for cart state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to manage cart state
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Add a new item to the cart
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      // Remove an item from the cart based on index
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "DROP":
      // Clear the entire cart (not currently used)
      let empArray = [];
      return empArray;
      
    case "UPDATE":
      // Update quantity and price of an existing item in the cart
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.qty,
            parseInt(action.qty),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    default:
      console.log("Error in Reducer");
      return state; // Return current state if action type is not recognized
  }
};

// CartProvider component to provide state and dispatch to children components
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []); // Initialize state using reducer

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children} {/* Render children components wrapped in providers */}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hook to access cart state
export const useCart = () => useContext(CartStateContext);

// Custom hook to access cart dispatch function
export const useDispatchCart = () => useContext(CartDispatchContext);
