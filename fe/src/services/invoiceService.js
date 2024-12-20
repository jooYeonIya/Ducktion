// import api from "./api";

// 배송 번호 입력 마감일 불러오기
export async function getShippingDeadline(itemId) {
  try {
    // const response = await api.get(`/invoice/exhibitorship`);
    // return response.data;
    return `${itemId}년 11월 11일`;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 배송 번호 입력하기
export async function postExhibitorshipInvoice(invoice) {
  try {
    // const response = await api.get(`/invoice/exhibitorship`);
    // return response.data;
    return `성공 메세지 ${invoice.courier}`;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 배송 번호 조회하기
export async function getBiddershipInvoice(itemId) {
  try {
    // const response = await api.get(`/invoice/biddership`);
    // return response.data;
    const data = {
      courier: `쿠팡 ${itemId}`,
      invoice: "1231451351235"
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
