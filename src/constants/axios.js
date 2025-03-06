import axios from "axios";

const apiInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ApiCall = async (METHOD, ENDPOINT, DATA = null) => {
  try {
    let response;

    switch (METHOD) {
      case "GET":
        response = await apiInstance.get(ENDPOINT);
        break;

      case "POST":
        response = await apiInstance.post(ENDPOINT, DATA);
        break;

      case "PUT":
        response = await apiInstance.put(ENDPOINT, DATA);
        break;

      case "DELETE":
        response = await apiInstance.delete(ENDPOINT,DATA);
        break;

      default:
        throw new Error("Invalid HTTP method");
    }

    return responseHandler(response);
  } catch (error) {
    throw errorHandler(error);
  }
};

const responseHandler = (res) => {
  const response = {
    data : res?.data,
    status : res?.status,
    message : res?.data?.message
  }
  return response;
};

const errorHandler = (error) => {
  const response = {
    status : error?.response?.status || 500,
    message : error?.response?.data?.message || "Something Went Wrong"
  }
  return response;
};
