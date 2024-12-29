import api from "./api";

export async function getCreateCommunityData() {
  try {
    const response = await api.get("admin/request/creat/community");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    alert(error.response.data);
  }
}

export async function getDeleteItemData() {
  try {
    const response = await api.get("admin/request/delete/item");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    alert(error.response.data);
  }
}

export async function getReportData() {
  try {
    const response = await api.get("admin/report/item");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    alert(error.response.data);
  }
}

export async function getValidationData() {

}