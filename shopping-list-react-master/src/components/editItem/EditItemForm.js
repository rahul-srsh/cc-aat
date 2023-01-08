import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "./EditItemForm.module.css";

const EditItemForm = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryNameInput, setCategoryNameInput] = useState("");

  const [showCategoryName, setShowCategoryName] = useState(false);

  const { categories } = props;

  const [httpPost, setHttpPost] = useState("uncomplete");
  const [error, setError] = useState(null);

  const histroy = useHistory();

  async function editItem() {
    const item = {
      name: nameInput,
      quantity: quantityInput,
      id: props.id,
      category: categoryInput,
      categoryName: categoryNameInput,
    };
    try {
      const response = await axios.put(process.env.REACT_APP_BACKEND_URL+"/edit-item", item);
      const data = response.data;
      console.log(data);
      setHttpPost("completed");
    } catch (error) {
      console.log(error.response);
      console.log("Something went wrong!");
    }
  }

  useEffect(() => {
    console.log("Histroy use effect");
    if (httpPost === "completed") {
      histroy.push("/list");
    }
  }, [httpPost, histroy]);

  useEffect(() => {
    console.log("props use effect");
    if (props.name) {
      setNameInput(props.name);
      setQuantityInput(props.quantity);
      setCategoryInput(props.category);
    }
  }, [props]);

  useEffect(() => {
    console.log("category use effect");
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
    editItem();
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
        <form className={classes.form} onSubmit={submitFormHandler}>
          {error && <p className="center-text error">{error}</p>}
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
            <label htmlFor="number">Quantity</label>
            <input
              id="number"
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
            <button className="btn">Save Item</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditItemForm;
