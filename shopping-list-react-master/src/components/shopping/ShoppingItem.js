import { Link } from "react-router-dom";

import classes from "./ShoppingItem.module.css";

const ShoppingItem = (props) => {
  function deleteItemHandler() {
    props.onDelete(props.id);
  }
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>
            {props.text} <span className={classes.categoryName}>({props.category})</span>
          </p>
        </blockquote>
        <figcaption>{props.quantity}</figcaption>
      </figure>
      <Link className="btn" to={`/edit/${props.id}`}>
        Edit
      </Link>
      <button className="btn delete-btn" onClick={deleteItemHandler}>
        Delete
      </button>
    </li>
  );
};

export default ShoppingItem;
