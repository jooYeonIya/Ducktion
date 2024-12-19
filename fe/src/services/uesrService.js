// import api from "./api";

// 사용자 정보 불러오기
export async function getUserInfo() {
  try {
    // const response = await api.get(`/user/info/${user_id}`);
    // return response.data;
    const data = {
      email: "dlapdlf@adpad.com",
      nickname: "bbbbbbbbsibaruaqewrgoi;huagderwhijklo;adfsclhkiuacdfse lhiku",
      profileImage: "/src/assets/duck_selected.png",
      phone: "00012345656",
      address: "asgfhkladgslkhjiadfsgjkl;d",
      heldBid: 100,
      usableBid: 10934098,
      rate: 12345
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 출품자 평가하기
export async function postRatingUser(ratingRequest) {
  try {
    // const response = await api.get("api/user/rating", ratingRequest);
    // return response.data;
    console.log(ratingRequest);
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
