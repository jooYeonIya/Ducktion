import api from "./api";

// 비드 이력 페이지 - 비드 이력
export async function getBidPointHistories(bidPointHistoriesRequest) {
  try {
    // const response = await api.get("api/histories/bidPoint", bidPointHistoriesRequest);
    // return response.data; 
    const data = [
      { date: "12월 01일", time: "22:03", type: "현금화", bidAmount: -50000, itemId: "", itemName: "현금화"},
      { date: "12월 01일", time: "22:03", type: "낙찰 취소", bidAmount: 50000, itemId: "1", itemName: "빽다방 커피" },
      { date: "12월 01일", time: "22:03", type: "비드 충전", bidAmount: 50000,itemId: "", itemName: "비드 충전" },
      { date: "12월 01일", time: "22:03", type: "낙찰 비드 차감", bidAmount: -50000, itemId: "1", itemName: "내가 낙찰 받음"},
      { date: "12월 01일", time: "22:03", type: "낙찰 비드 적립", bidAmount: 50000, itemId: "1", itemName: "내가 출품해서 누가 낙찰함"},
    ];
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 비드 충전하기
export async function postChargeBidPoint(bidPoint) {
  try {
    const response = await api.post(`bidpoint/charge/${bidPoint}`);
    return `비드 충전 성공 메세지 ${bidPoint}`;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 비드 현금화하기
export async function postWithdrwalBidPoint(bidPoint) {
  try {
    // const response = await api.post("api/bidpoint/withdrwal, bidPoint");
    // return response.data; 
    return `비드 현금화 성공 메세지 ${bidPoint}`;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
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