import { create } from "zustand";
import axios from "axios";

const categoriesStore = create((set) => ({
  // **************************** Fetch categories ****************************
  categoriesList: [],
  categoriesError: false,
  getCategories: async () => {
    try {
      const response = await axios.get("http://localhost:8081/categories");
      set({
        categoriesList: response.data.categories,
        categoriesError: false,
      });
    } catch (error) {
      if (error.response.data.categories.length < 1) {
        set({
          categoriesError: `Categories list is empty`,
        });
      }
      return Promise.reject(error);
    }
  },

  // **************************** Get sub category ****************************
  subCategories: [],
  getSubCategories: async (subcategory) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/subcategories?categoryName=${subcategory}`
      );
      set({ subCategories: response.data.subcategories });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default categoriesStore;
