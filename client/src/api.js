import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
export const axiosAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
axiosAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
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

export const removeFromCart = async (productId) => {
  const { data } = await axiosInstance.delete(`/cart/${productId}`);
  return data;
};

export const incrementQty = async (productId) => {
  const { data } = await axiosInstance.post(`/cart/increase/${productId}`);
  return data;
};

export const decrementQty = async (productId) => {
  const { data } = await axiosInstance.post(`/cart/decrease/${productId}`);
  return data;
};

export const addToWishlist = async (id) => {
  const { data } = await axiosInstance.post("/wishlist", {
    productId: id,
  });
  return data;
};
export const removeFromWishlist = async (productId) => {
  const { data } = await axiosInstance.delete(`/wishlist/${productId}`);
  return data;
};
export const fetchUserWishlist = async () => {
  const { data } = await axiosInstance.get("/wishlist");
  return data;
};

export function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}
