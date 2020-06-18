import React, { useReducer, useRef } from "react";
import "./App.css";

function Expenses() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "addExpense":
        return [
          ...state,
          {
            id: state.length * Math.random(),
            name: action.name
          }
        ];

      case "remove":
        return state.filter((_, index) => {
          return index !== action.index;
        });
      default:
        return state;
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: "addExpense",
      name: inputRef.current.value
    });
    inputRef.current.value = "";
  };



  return (
    <div className="container text-center">
      <h1>Budget Tracker!</h1>
      <div class="row">
        <div class="col-4">
          <form className="form-group mt-5" onSubmit={handleSubmit}>
            <input
              className="form-control"
              ref={inputRef}
              placeholder="What did you buy?"
            />
            <input
              className="form-control"
              ref={inputRef}
              placeholder="How much money did you spend?"
            />
            <button className="btn btn-success mt-3 mb-5" type="submit">
              Add Expense
        </button>
          </form>
          <h4>Total Spent:</h4>
        </div>
        <div class="col-8">
          <h4>Expenses:</h4>
          <ul className="list-group">
            {items.map((item, index) => (
              
              <li className="list-group-item" key={item.id}>
                $ {item.name}
                <button
                  className="btn btn-danger btn-sm ml-5"
                  onClick={() => dispatch({ type: "remove", index })}
                >
                  X Remove
            </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );

}

export default Expenses;
