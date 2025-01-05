import axios from "axios";

// 기본 API URL 설정 - localhost를 변경해야만
export const BASE_URL = "http://sample-elb-938786939.ap-northeast-2.elb.amazonaws.com/api/";

const api = axios.create({
  baseURL: BASE_URL, // axios 인스턴스의 기본 URL 설정
});

api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt"); 
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;