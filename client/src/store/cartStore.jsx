import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const cartStore = create((set) => ({
  // **************************** Fetch categories ****************************
  cartList: [],
  bill: "",

  getCartItems: async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/cart/${id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: Cookies.get("token"),
        },
        withCredentials: true,
      });
      set({
        cartList: response.data.cart.items,
        bill: response.data.cart.bill,
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  addToCart: async (itemId, customerId) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/cart/${customerId}`,
        { itemId },
        {
          headers: {
            "content-type": "application/json",
            Authorization: Cookies.get("token"),
          },
          withCredentials: true,
        }
      );

      set({
        cartList: response.data.items,
        bill: response.data.bill,
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  removeFromCart: async (itemId, customerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/cart/${customerId}`,
        {
          data: { itemId },
          headers: {
            "content-type": "application/json",
            Authorization: Cookies.get("token"),
          },
          withCredentials: true,
        }
      );
      set({
        cartList: response.data.items,
        bill: response.data.bill,
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  // **************************** Download product ****************************
  downloadProduct: async () => {
    try {
      const { cartList } = cartStore.getState();
      let files = [];
      cartList.map((item) =>
        files.push(item.files.length === 1 ? item.files[0] : item.files[1])
      );
      const response = await axios.post(
        "http://localhost:8081/download-product",
        {
          filenames: files,
        },
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      console.log(response);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "markstone-files.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  },
}));

export default cartStore;
