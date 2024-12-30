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
export async function putUserInfo(dto) {
  try {
    // const response = await api.put(`user/info/${user_id}`);
    // return response.data;
    console.log(`putUserInfo DTO : ${dto}`);
    const userInfo = location.state?.userInfo || {
      nickname: '홍길동',
      phoneNumber: '',
      address: ''
    };
    return;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 회원 탈퇴하기
export async function deleteUser(userId) {
  // const token = localStorage.getItem('token'); // 사용자 인증 토큰 가져오기
  // if (!token) throw new Error('인증 토큰이 없습니다.');

  // const response = await api.delete(`user/info/${userId}`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // return response.data;

  console.log(`userId :${userId}`);
  return "삭제가 성공했습니다.";
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

