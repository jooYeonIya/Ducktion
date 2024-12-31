import api from "./api";

// 커뮤니티 개설 요청 관련
export async function postCreateCommunity(request) {
  try {
    const response = await api.post("admin/request/creat/community", request);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

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
export async function postDeleteItemData(request) {
  try {
    const response = await api.post("admin/request/delete/item", request);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

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

// 신고 관련
export async function getReportData() {
  try {
    const response = await api.get("admin/report/item");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function submitReport(itemId, rejectReason) {
  try {
    const response = await api.get(`admin/submit/report/item/${itemId}/${rejectReason}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function cancelReport(itemId) {
  try {
    const response = await api.get(`admin/cancel/report/item/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

// 반려
export async function getValidateItemData() {
  try {
    const response = await api.get("admin/validate/item");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function validateItemOk(shipRequest) {
  try {
    const response = await api.post("admin/validate/item/Ok", shipRequest);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

export async function validateItemReject(itemId) {
  try {
    const response = await api.get(`admin/validate/item/reject/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

