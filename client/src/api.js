import axios from "axios";
// import { queryClient } from "./main";
// import { useMutation } from "@tanstack/react-query";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// const { mutate: addToCartMutate } = useMutation({
//   mutationFn: addToCart,
//   onSuccess: () => {
//     queryClient.invalidateQueries(["userCart"]);
//   },
// });
export const fetchUserCart = async () => {
  const { data } = await axiosInstance.get("/cart");
  return data;
};

export const addToCart = async (id) => {
  const { data } = await axiosInstance.post("/cart/add-to-cart", {
    productId: id,
  });
  return data;
};

export const removeFromCart = async (id) => {
  const { data } = await axiosInstance.delete("/cart", { productId: id });
  return data;
};
