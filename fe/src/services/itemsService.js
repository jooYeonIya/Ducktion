// import api from "./api";

// 홈 페이지 - 마감 임박 상품
export async function getClosingSoonItems() {
  try {
    // const response = await api.get("items/closingsoon");
    // return response.data;
    const data = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        communityId: i,
        image: "/src/assets/test_image.png",
        favorited: i % 2 == 0,
        name: "으아아아악!!!!!! 리액트 고수 어디 없나!!!!!!",
        priceInfo: { price: i * 10000, type: "" },
        additionalInfo: null,
        overlayText: false
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 홈 페이지 - 마스터즈컬렉션즈레어 상품
export async function getMastersCollectorsRare() {
  try {
    // const response = await api.get("items/masterscollectorsrare");
    // return response.data;
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        communityId: i,
        image: "/src/assets/test_image.png",
        favorited: i % 2 == 0,
        name: "이거슨 마스터 컬렉션즈 레어 상품이다 이놈들아",
        priceInfo: { price: i * 10000, type: "" },
        additionalInfo: null,
        overlayText: false
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 출품 상품 목록
export async function getItemsByCommunityId(acutionItemsRequest) {
  try {
    // const response = await api.get("items/auction", {
    //   params: acutionItemsRequest,
    // });
    // return response.data;
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        communityId: i,
        image: "/src/assets/test_image.png",
        favorited: i % 2 == 0,
        name: "아 갑자기 스타벅스 마시고 싶어졌어!",
        priceInfo: { price: i * 10000, type: "" },
        additionalInfo: { bids: i, days: i },
        overlayText: i % 2 == 0 ? "판매 완료" : ""
      });
    }
    return data;

  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 상품 등록 API 호출
export async function postItem(dto) {
  console.log("dto : ", dto);
  return true;
  // try {
  //   const response = await api.post("items", dto); // 서버에 POST 요청
  //   return response.data; // 성공적으로 응답 데이터를 반환
  // } catch (error) {
  //   console.error("상품 등록에 실패했습니다:", error);
  //   throw error; // 에러를 호출한 쪽으로 전달
  // }
}

// 상품 수정 보기 API 호출
export async function getItemEdit(itemId) {
  console.log("itemId : ", itemId);
  try {
    // const response = await api.get(`items/${itemId}`); // 서버에 POST 요청
    // return response.data; // 성공적으로 응답 데이터를 반환
    const dto = {
      productName: "임시 이름",
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8Rj-vULPVGhf-eQyiY5sG2dMcHFQzD6RrQ&s", "https://m.jncompany.shop/web/product/big/202302/55da73b5645922de32ffa07cf315ee64.jpg", "https://sitem.ssgcdn.com/87/70/47/item/1000026477087_i1_750.jpg", "https://wimg.heraldcorp.com/content/default/2015/03/06/20150306001045_0.jpg"],
      description: "상품 설명",
      productCondition: "NO_USE",
      rareScore: 3.5,
      startingBid: 10000,
      auctionEndDate: "2023-12-31T23:59:59",
      immediateBid: 20000,
    };
    return dto;
  } catch (error) {
    console.error("상품 등록에 실패했습니다:", error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
}

// 상품 수정 API 호출
export async function putItemEdit(dto) {
  console.log("dto : ", dto);
  try {
    const response = await api.put(`items/${itemId}`, dto); // 서버에 PUT 요청
    return response.data; // 성공적으로 응답 데이터를 반환
  } catch (error) {
    console.error("상품 등록에 실패했습니다:", error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
}


// 통합 검색 페이지 - 출품 상품 검색 결과
export async function getItemSearchResults(searchText) {
  try {
    // const response = await api.get(`items/result/list/${searchText}`);
    // return response.data;
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        communityId: i,
        image: "/src/assets/test_image.png",
        favorited: i % 2 == 0,
        name: `${i} ${searchText} 상품`,
        priceInfo: { price: i * 10000, type: "" },
        additionalInfo: null,
        overlayText: false
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 출품 이력 페이지
export async function getBiddedHistory(biddedHistoryRequest) {
  try {
    // const response = await api.get("items/biddedhistory", biddedHistoryRequest);
    // return response.data;
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        communityId: i,
        image: "/src/assets/test_image.png",
        favorited: i % 2 == 0,
        name: `${biddedHistoryRequest.sortType} ${biddedHistoryRequest.date.year} 상품`,
        priceInfo: { price: i * 10000, type: "" },
        additionalInfo: null,
        overlayText: false
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}