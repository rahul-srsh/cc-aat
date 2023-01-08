import axios from "axios";
import { useEffect, useCallback, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

import EditItemForm from "../components/editItem/EditItemForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const EditItem = () => {
  const params = useParams();
  const { id } = params;

  const [item, setItem] = useState({});
  const [category, setCategory] = useState(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getCategory = useCallback(async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+"/categories");
      const data = response.data;
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const getItem = useCallback(async () => {
    console.log("id " + id);
    const body = { id: id };
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"/item", body);
      setIsLoading(false);
      const data = response.data;
      console.log(response);
      console.log(data);
      setItem(data);
    } catch (error) {
      console.log(error.response);
      setError("Something went wrong!");
      // setError(error.response.data.message);
    }
  }, [id]);

  useEffect(() => {
    getCategory();
    getItem();
  }, [getItem, getCategory]);

  return (
    <Fragment>
      {isLoading && (
        <div className="loading">
          <LoadingSpinner />
        </div>
      )}
      {error && <p className="center-text error">{error}</p>}
      {!isLoading && !error && (
        <EditItemForm
          name={item.name}
          quantity={item.quantity}
          id={item._id}
          category={item.category}
          categories={category}
          categoryName={item.categoryName}
        />
      )}
    </Fragment>
  );
};

export default EditItem;
