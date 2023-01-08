import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./AddItemForm.module.css";

const AddItemForm = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryNameInput, setCategoryNameInput] = useState("");

  const [showCategoryName, setShowCategoryName] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpPost, setHttpPost] = useState("uncomplete");

  const histroy = useHistory();
  const { categories } = props;

  async function addItem() {
    setIsLoading(true);
    const item = {
      name: nameInput,
      quantity: quantityInput,
      category: categoryInput,
      categoryName: categoryNameInput,
    };
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"/add-item", item);
      const data = response.data;
      console.log(data);
      setHttpPost("completed");
    } catch (error) {
      console.log("Something went wrong!");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (httpPost === "completed") {
      histroy.push("/list");
    }
  }, [histroy, httpPost]);

  useEffect(() => {
    if (categoryInput === "others") {
      setShowCategoryName(true);
    } else {
      setShowCategoryName(false);
    }
  }, [categoryInput]);

  function submitFormHandler(event) {
    event.preventDefault();
    setError(null);
    // optional: Could validate here
    if (nameInput === "" || quantityInput === "" || quantityInput < 0) {
      setError("Please enter a valid input!");
      return;
    }

    console.log("Name Input " + nameInput);
    console.log("Quantity " + quantityInput);
    console.log("Category " + categoryInput);
    console.log("Category Name " + categoryNameInput);
    addItem();
  }
  const nameChangeHandler = (event) => {
    setNameInput(event.target.value);
  };
  const quantityChangeHandler = (event) => {
    setQuantityInput(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    setCategoryInput(event.target.value);
  };
  const categoryNameChangeHandler = (event) => {
    setCategoryNameInput(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.card}>
        {error && <p className="center-text error">{error}</p>}
        <form className={classes.form} onSubmit={submitFormHandler}>
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={nameInput}
              onChange={nameChangeHandler}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              value={quantityInput}
              onChange={quantityChangeHandler}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              onChange={categoryChangeHandler}
              value={categoryInput}
              required
            >
              <option value="">--</option>
              {categories &&
                props.categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              <option value="others">Others</option>
            </select>
          </div>
          {showCategoryName && (
            <div className={classes.control}>
              <label htmlFor="catName">Category Name</label>
              <input
                type="text"
                id="catName"
                value={categoryNameInput}
                onChange={categoryNameChangeHandler}
              />
            </div>
          )}
          <div className={classes.actions}>
            <button className="btn">Add Item</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddItemForm;
