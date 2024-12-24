// 요청 목록 데이터 가져오기
export async function getViewAdmin() {
  try {
    const data = [];

       // 예시 데이터
       const titles = [
        "게임 커뮤니티 개설 요청",
        "영화 리뷰 공유 커뮤니티",
        "독서 모임 커뮤니티",
        "음악 팬클럽 커뮤니티",
        "여행 사진 공유 커뮤니티"
      ];
  
      const communitytitles = [
        "게임 마니아",
        "영화 평론가들",
        "책 읽는 사람들",
        "음악 애호가",
        "여행자들의 모임"
      ];
  
      // 사용자 배열 추가
      const users = [
        "사용자123",
        "영화광",
        "책벌레",
        "뮤직러버",
        "여행자"
      ];
  
      const requestdetailstories = [
        "게임 관련 정보와 소식을 나누고 싶습니다.",
        "좋은 영화 추천과 리뷰를 공유하고 싶어요.",
        "좋은 책을 추천받고 싶습니다.",
        "음악에 대한 이야기를 나누고 싶어요.",
        "여행 사진을 공유하고 추억을 나누고 싶습니다."
      ];

    // 요청 데이터 생성
    for (let i = 1; i <= 30; i++) {
      data.push({
        id: `request-${i}`, // 요청 ID
        user: users[i % users.length], // 사용자
        title: titles[i % titles.length], // 제목
        communitytitle: communitytitles[i % communitytitles.length], // 커뮤니티 제목
        requestdetailstory: requestdetailstories[i % requestdetailstories.length], // 요청 사유
        date: new Date().toISOString(), // 요청 날짜
        status: "개설", // 상태
        type: "개설 요청", // 타입
      });
    }

    for (let i = 1; i <= 30; i++) {
      data.push({
        id: `request-${i}`, // 요청 ID
        user: users[i % users.length], // 사용자
        title: titles[i % titles.length], // 제목
        communitytitle: communitytitles[i % communitytitles.length], // 커뮤니티 제목
        requestdetailstory: requestdetailstories[i % requestdetailstories.length], // 요청 사유
        date: new Date().toISOString(), // 요청 날짜
        status: "삭제", // 상태
        type: "삭제 요청", // 타입
      });
    }

    // 신고 데이터 생성
    for (let i = 1; i <= 30; i++) {
      data.push({
        id: `report-${i}`, // 신고 ID
        user: users[i % users.length], // 사용자
        title: titles[i % titles.length], // 제목
        requestdetailstory: requestdetailstories[i % requestdetailstories.length], // 요청 사유
        date: new Date().toISOString(), // 요청 날짜
        status: "신고", // 상태
        reportCount: 50,
        type: "신고", // 타입
      });
    }

    // 검수 데이터 생성
    for (let i = 1; i <= 30; i++) {
      data.push({
        id: `review-${i}`, // 검수 ID
        user: users[i % users.length], // 사용자
        title: titles[i % titles.length], // 제목
        requestdetailstory: requestdetailstories[i % requestdetailstories.length], // 요청 사유
        date: new Date().toISOString(), // 요청 날짜
        status: "검수", // 상태
        type: "검수", // 타입
      });
    }

    return data; // 모든 데이터 반환
  } catch (error) {
    console.error("Error fetching post list:", error);
    throw error;
  }
}

export async function getViewRequestDetail(requestId) {
  try {
    const detail = {
      id: "request-1",
      user: "사용자123",
      title: "게임 커뮤니티 개설 요청",
      communitytitle: "게임 마니아",
      requestdetailstory: "게임 관련 정보와 소식을 나누고 싶습니다.",
      date: new Date().toISOString(),
      status: "개설",
      type: "삭제 요청", 
      itemName: "삭제하려는 상품 예시"
    };

    return detail; 
  } catch (error) {
    console.error("Error fetching request detail:", error);
    throw error;
  }

}
