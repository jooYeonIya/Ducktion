// // adminService.js

// // 요청 목록 데이터 가져오기
// export async function getViewAdmin() {
//   try {
//     // 예시 데이터 생성
//     const titles = [   
//       "SHF 배트맨 급처", "에어포스", "복권팖ㅋ", "농수산물 모형", "마블백과사전",
//       "스투시 후드", "봇치 더락 굿즈 다수", "아이마스", "죠죠 초상가동", "길리슈트",
//       "ㅗ", "ㅅㅂ", "통기타 파손품", "스트링", "jsx"
//     ];
    
//     const communitytitles = [      
//       "배트맨$로빈갤러리여 !!!~", "에어포스개럴리여 만들어저여", "라노벨갤ㄹ리리여", "신발갤이요 !", "베놈갤러링!!",
//       "봇치더락갤러리좀 만들어저여", "더락갤러리", "데드풀2갤러리", "죠죠갤", "러브라이브갤러리",
//       "농구싫어갤러리", "축구싫어갤러리", "통기타갤러리", "ㅇㅇㅇㅇ", "요청"
//     ];

//     const requestdetailstories = [           
//       "ㅇㅇ 부탁함", "잘좀해줘요 ㅋㅋ", "브으응", "우옹", "부탁드려여형 !", "ㅈㄱㄴ", "개추"
//     ];

//     const users = [
//       "사용자ㅋㅋ", "사용자ㅇㅇ", "사용자ㄷㄷㄷㄷㄷ", "사용핮미ㅏ", "도덕", 
//       "물리", "사용자 7", "사용자 8", "사용자 9", "사용자 10"
//     ];

//     const data = [];

//     // 요청 데이터 생성
//     for (let i = 1; i <= 30; i++) {
//       data.push({
//         id: `request-${i}`, // 요청 ID
//         user: users[Math.floor(Math.random() * users.length)], // 사용자
//         title: titles[Math.floor(Math.random() * titles.length)], // 제목
//         communitytitle: communitytitles[Math.floor(Math.random() * communitytitles.length)], // 커뮤니티 이름
//         requestdetailstory: requestdetailstories[Math.floor(Math.random() * requestdetailstories.length)], // 요청 사유
//         date: new Date().toISOString(), // 요청 날짜
//         status: "개설", // 상태
//         type: "요청", // 타입
//       });
//     }

//     // 신고 데이터 생성
//     for (let i = 1; i <= 30; i++) {
//       data.push({
//         id: `report-${i}`, // 신고 ID
//         user: users[Math.floor(Math.random() * users.length)], // 사용자
//         title: titles[Math.floor(Math.random() * titles.length)], // 제목
//         communitytitle: communitytitles[Math.floor(Math.random() * communitytitles.length)], // 커뮤니티 이름
//         requestdetailstory: requestdetailstories[Math.floor(Math.random() * requestdetailstories.length)], // 요청 사유
//         date: new Date().toISOString(), // 요청 날짜
//         status: "신고", // 상태
//         type: "신고", // 타입
//       });
//     }

//     // 검수 데이터 생성
//     for (let i = 1; i <= 30; i++) {
//       data.push({
//         id: `review-${i}`, // 검수 ID
//         user: users[Math.floor(Math.random() * users.length)], // 사용자
//         title: titles[Math.floor(Math.random() * titles.length)], // 제목
//         communitytitle: communitytitles[Math.floor(Math.random() * communitytitles.length)], // 커뮤니티 이름
//         requestdetailstory: requestdetailstories[Math.floor(Math.random() * requestdetailstories.length)], // 요청 사유
//         date: new Date().toISOString(), // 요청 날짜
//         status: "검수", // 상태
//         type: "검수", // 타입
//       });
//     }

//     return data; // 모든 데이터 반환
//   } catch (error) {
//     console.error("Error fetching post list:", error);
//     throw error;
//   }
// }

// adminService.js

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
        type: "요청", // 타입
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

