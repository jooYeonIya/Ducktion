// adminservice.js

// 요청 목록 데이터 가져오기
export async function getPostList() { // 함수 이름 변경
  try {
    // API 호출 예시 (주석 처리된 부분)
    // const response = await api.get("admin/posts");
    // return response.data;

    // 예시 데이터 생성
    const titles = [
      "SHF 배트맨 급처", "에어포스", "복권팖ㅋ", "농수산물 모형", "마블백과사전",
      "스투시 후드", "봇치 더락 굿즈 다수 ", "아이마스", "죠죠 초상가동", "길리슈트",
      "ㅗ", "ㅅㅂ", "통기타 파손품", "스트링", "jsx"
    ];
    const anothertitles = [
      "배트맨$로빈갤러리여 !!!~", "에어포스개럴리여 만들어저여", "라노벨갤ㄹ리리여", "신발갤이요 !", "베놈갤러링!!",
      "봇치더락갤러리좀 만들어저여", "더락갤러리 ", "데드풀2갤러리", "죠죠갤", "러브라이브갤러리",
      "농구싫어갤러리", "축구싫어갤러리", "통기타갤러리", "ㅇㅇㅇㅇ", "요청"
    ];

    const data = [];
    for (let i = 1; i < 31; i++) {
      data.push({
        id: i, 
        type: i % 3 === 0 ? "요청" : i % 3 === 1 ? "신고" : "검수", // 요청 유형
        title: titles[Math.floor(Math.random() * titles.length)], // 랜덤 제목
        anothertitle: anothertitles[Math.floor(Math.random() * titles.length)],
        user: `사용자 ${i}`, // 요청한 사용자
        date: new Date().toISOString(), // 요청 일시
        status: i % 2 === 0 ? "개설" : "삭제", // 요청 상태
        reportCount: i % 3 === 1 ? Math.floor(Math.random() * 100) : null, // 신고 횟수 (신고 타입일 때만)
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching post list:", error); // 오류 메시지 수정
    throw error;
  }
}
