import { create } from "zustand";
import axios from "axios";

const productStore = create((set) => ({
  // **************************** Fetch categories ****************************
  productList: [],
  productError: false,
  // ? Pagination
  page: 1,
  setPage: (currentPage) => set({ page: currentPage }),
  limit: 12,
  totalPage: 0,
  loading: false,

  getProductsByCategory: async (category) => {
    try {
      set({ loading: true, productList: [] });
      const { page, limit } = productStore.getState();
      const response = await axios.get(
        `http://localhost:8081/products-category?page=${page}&limit=${limit}&active=true&category_name=${
          category && category !== "all" ? category : ""
        }`,
        { withCredentials: true }
      );
      set({
        productList: response.data.products,
        totalPage: Math.ceil(response.data.count / limit),
        loading: false,
        productError: false,
      });
      console.log(response);
    } catch (error) {
      if (error.response.data.products.length < 1) {
        set({
          productError: `Products list is empty`,
        });
      }
      set({ loading: false });
      return Promise.reject(error);
    }
  },

  getProductsBySubcategory: async (subcategory) => {
    try {
      set({ loading: true, productList: [] });
      const { page, limit } = productStore.getState();
      const response = await axios.get(
        `http://localhost:8081/products-subcategory?page=${page}&limit=${limit}0&active=true&subcategory_name=${subcategory}`,
        { withCredentials: true }
      );
      set({
        productList: response.data.products,
        loading: false,
        productError: false,
      });
      console.log(response);
    } catch (error) {
      if (error.response.data.products.length < 1) {
        set({
          productError: `Products list is empty`,
        });
      }
      set({ loading: false });
      return Promise.reject(error);
    }
  },

  // **************************** Search products ****************************
  searchValue: "",
  updateSearchValue: (e) => {
    set({ searchValue: e.target.value });
    const { searchValue } = productStore.getState();
    console.log(searchValue);
  },
  getProductsBySearch: async () => {
    try {
      set({ loading: true, productList: [] });
      const { page, limit, searchValue } = productStore.getState();
      const response = await axios.get(
        `http://localhost:8081/products/search?search_query=${searchValue}&page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      set({
        productList: response.data.products,
        loading: false,
        productError: false,
      });
      console.log(response);
    } catch (error) {
      set({ loading: false });
      return Promise.reject(error);
    }
  },

  // **************************** Filter products ****************************
  getProductsByFilter: async (filterValue) => {
    try {
      set({ loading: true, productList: [] });
      const { page, limit } = productStore.getState();
      const response = await axios.get(
        `http://localhost:8081/products-by-filter?page=${page}&limit=${limit}&filter=${filterValue}`,
        { withCredentials: true }
      );
      set({
        productList: response.data.products,
        loading: false,
        productError: false,
      });
      console.log(response);
    } catch (error) {
      set({ loading: false });
      return Promise.reject(error);
    }
  },

  // **************************** Get product ****************************
  productData: [],
  productId: "",
  setProduct: (id) => {
    set({ productId: id });
  },
  getProduct: async () => {
    try {
      const { productId } = productStore.getState();
      const response = await axios.get(
        `http://localhost:8081/products/${productId}`,
        { withCredentials: true }
      );
      set({
        productData: response.data.product,
      });
      console.log(response.data.product);
    } catch (error) {
      return Promise.reject(error);
    }
  },
}));

export default productStore;
