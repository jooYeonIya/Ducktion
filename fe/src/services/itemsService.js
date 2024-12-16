// import axios from 'axios'

// 홈 페이지 - 인기 카테고리
export async function getPopularCategories() {
  try {
    // const response = await axios.get("http://localhost:8080/api/communities/popularity");
    // return response.data;
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        title: "디즈니랜드 마븖히어로즈 스파이더맨",
        isFavorited: i % 2 == 0 ? true : false,
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error; 
  }
}
