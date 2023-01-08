import axios from "axios";
import { Fragment, useCallback, useEffect, useState } from "react";

import ShoppingList from "../components/shopping/ShoppingList";

const Shopping = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+"/shopping");
      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function deleteItem(itemId) {
    const body = { id: itemId };
    try {
      console.log(body);

      //Not while deleting an item we have to pass body as
      // data:body and can not pass body directly
      const response = await axios.delete(process.env.REACT_APP_BACKEND_URL+"/delete-item", {
        data: body,
      });

      const data = response.data;
      console.log(data);
    } catch (error) {
      setError("Something went wrong");
      console.log(error.response);
    }
    fetchItems();
  }

  return (
    <Fragment>
      {error && <p className="centered">{error}</p>}
      {!isLoading && <ShoppingList list={items} onDelete={deleteItem} />}
      {items.length===0&&<h2 className="centered">Please add an item.</h2>}
    </Fragment>
  );
};

export default Shopping;
