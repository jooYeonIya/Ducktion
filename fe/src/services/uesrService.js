import api from "./api";

// 사용자 정보 불러오기
export async function getUserInfo() {
  try {
    const response = await api.get("user/info");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 출품자 평가하기
export async function postRatingUser(ratingRequest) {
  try {
    const response = await api.post("user/rating", ratingRequest);
    alert(response.data);
  } catch (error) {
    console.error("Error fetching:", error);
    alert(error.response.data);
  }
}

// 내 정보 수정하기
export async function editMyInfo(editUserInfo) {
  try {
    const response = await api.post("user/info/edit", editUserInfo);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 회원 탈퇴하기
export async function deleteUser() {
  try {
    const response = await api.get("user/info/delete");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

// 프로필 사진 변경하기
export async function putUserProfileImage(imageFile) {
  try {
    // const response = await api.put(`user/info/{user_id}/profile_image`);
    // return response.data;
    console.log(`putUserProfileImage imageFile : ${imageFile}`);
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8Rj-vULPVGhf-eQyiY5sG2dMcHFQzD6RrQ&s";
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 프로필 사진 삭제하기
export async function deleteUserProfileImage(userId) {
  try {
    // const response = await api.delete(`user/info/{user_id}/profile_image`);
    // return response.data;
    console.log(`deleteUserProfileImage userId : ${userId}`);
    return '';
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

