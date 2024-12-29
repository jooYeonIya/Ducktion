import api from "./api";

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