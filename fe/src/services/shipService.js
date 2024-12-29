import api from "./api";

// 배송 번호 입력 마감일 불러오기
export async function getShippingDeadline(itemId) {
  try {
    const response = await api.get(`ship/shipping/deadline/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 배송 번호 입력하기
export async function postExhibitorshipInvoice(exhibitorShipInfo) {
  try {
    const response = await api.post("ship/exhibitorship", exhibitorShipInfo);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 배송 번호 조회하기
export async function getBiddershipInvoice(itemId) {
  try {
    const response = await api.get(`ship/biddership/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
