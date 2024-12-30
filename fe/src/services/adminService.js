import api from "./api";

// 커뮤니티 개설 요청 관련
export async function getCreateCommunityData() {
  try {
    const response = await api.get("admin/request/creat/community");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function createCommunity(communityName, requestId) {
  try {
    const response = await api.get(`admin/request/creat/community/${communityName}/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function postRejectCommunity(request) {
  try {
    const response = await api.post("admin/request/reject/community", request);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

// 상품 삭제 요청 관련
export async function getDeleteItemData() {
  try {
    const response = await api.get("admin/request/delete/item");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function deleteItem(itemId, requestId) {
  try {
    const response = await api.get(`admin/request/delete/item/${itemId}/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function postRejectDeleteItem(request) {
  try {
    const response = await api.post('admin/request/reject/item', request);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function getReportData() {
  try {
    const response = await api.get("admin/report/item");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function getValidateItemData() {
  try {
    const response = await api.get("admin/validate/item");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}