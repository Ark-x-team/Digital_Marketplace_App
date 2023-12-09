import { create } from "zustand";
import axios from "axios";

const productStore = create((set) => ({
  // **************************** Fetch categories ****************************
  productList: [],
  productError: false,

  getProducts: async (subcategory) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/products?page=1&limit=10&active=true&subcategory_name=${subcategory}`,
        { withCredentials: true }
      );
      set({
        productList: response.data.products,
        productError: false,
      });
      console.log(response);
    } catch (error) {
      if (error.response.data.products.length < 1) {
        set({
          productError: `Products list is empty`,
        });
      }
      return Promise.reject(error);
    }
  },
}));

export default productStore;
