import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AddItemForm from "../components/newItem/AddItemForm";

const AddItem = () => {
  const [category, setCategory] = useState(null);

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

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return <AddItemForm categories={category} />;
};

export default AddItem;
