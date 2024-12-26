import api from "./api";

// 비드 이력 페이지 - 비드 이력
export async function getBidPointHistories(bidPointHistoriesRequest) {
  try {
    const response = await api.post("bidpoint/histories", bidPointHistoriesRequest);
    return response.data; 
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 비드 충전하기
export async function postChargeBidPoint(bidPoint) {
  try {
    const response = await api.post(`bidpoint/charge/${bidPoint}`);
    return `${bidPoint} 비드 충전했습니다`;
  } catch (error) {
    console.error("Error fetching:", error);
    alert(error.message);
  }
}

// 비드 현금화하기
export async function postWithdrwalBidPoint(bidPoint) {
  try {
    const response = await api.post(`bidpoint/withdrwal/${bidPoint}`);
    return `${bidPoint} 비드 현금화했습니다`;
  } catch (error) {
    console.error("Error fetching:", error);
    alert(error.message);
  }
}

// 유저 비드 불러오기
export async function getUserBidPoint() {
  try {
    // const response = await api.post("api/bidpoint/user);
    // return response.data; 
    return {heldBid: 1000, usableBid: 20000}
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}