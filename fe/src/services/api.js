import axios from "axios";

// 기본 API URL 설정
export const BASE_URL = "http://52-337254905.ap-northeast-2.elb.amazonaws.com:80/api/";

const api = axios.create({
  baseURL: BASE_URL, // axios 인스턴스의 기본 URL 설정
});

export default api;