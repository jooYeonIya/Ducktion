import api from "./api";

// 홈 페이지 - 마감 임박 상품
export async function getClosingSoonItems() {
  try {
    const response = await api.get("items/closingsoon");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 홈 페이지 - 마스터즈컬렉션즈레어 상품
export async function getMastersCollectorsRare() {
  try {
    const response = await api.get("items/mastersrare");
    return response.data;
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
        overlayText: i % 2 == 0 ? "판매 완료" : "",
        itemId: "item item item"
      });
    }
    return data;

  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 출품 상품 상세 보기
export async function getItemDetails(itemId) {
  console.log("itemId : ", itemId);
  try {
    const response = await api.get(`items/${itemId}`); // 서버에 GET 요청
    console.log("response : ", response);
    return response.data; // 성공적으로 응답 데이터를 반환
    // const dto = {
    //   communityId: 1,
    //   communityName: "리그오브레전드",
    //   itemId: 1,
    //   itemName: "상품명",
    //   images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8Rj-vULPVGhf-eQyiY5sG2dMcHFQzD6RrQ&s", 
    //     "https://m.jncompany.shop/web/product/big/202302/55da73b5645922de32ffa07cf315ee64.jpg", 
    //     "https://sitem.ssgcdn.com/87/70/47/item/1000026477087_i1_750.jpg",
    //     "https://wimg.heraldcorp.com/content/default/2015/03/06/20150306001045_0.jpg",
    //     "https://www.cheonyu.com/_DATA/product/63900/63992_1672648178.jpg",
    //     "https://i.pinimg.com/736x/b5/9d/8f/b59d8f8cbb54368862109db8324dc6b8.jpg",
    //     "https://i.pinimg.com/736x/7a/64/d1/7a64d16d82e1bc56a6607d4a7f13625b.jpg",
    //     "https://mblogthumb-phinf.pstatic.net/MjAxODA0MDlfMTUy/MDAxNTIzMjQwNjYxMDcw.NUntdy9kjN5iiUuneXi71eg74XEAtAJ40QOGb1LhOewg.UyZCO_3r6zQUwbDJ9n5FXuX-yalD0bMAHFiy9v8NN1Mg.PNG.lifesaverclinic/%EC%A7%B1%EA%B5%AC-%EC%BB%B4%ED%93%A8%ED%84%B0-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B46.png?type=w800",
    //     "https://i.namu.wiki/i/G0dztHXufsO8bQs8dySSWVQplZXjOJ1mVhjbzHFGFgO7PXxMM-yt7wV9tNm9YVoLV-jnhK5l3JORzRMUkNN9Mw.webp",],
      // description: "아아아 하기 싫다ㅏㅏㅏ\n저 대신 일 해주실 분 경매 하세욧!!\n지금 여기서 일할 수 있는 기회ㅣㅣㅣ \n놓치지 말고 사십시오!!!!!!!!!",
      // itemCondition: "사용감 적음",
      // rareTier: "마스터컬렉션즈레어",
      // startPrice: 7000,
      // endTime: "2025-01-07T23:59:59",
      // nowPrice: 8000,
      // totalView: 10000,
      // totalBidding: 10000,
      // exhibitorNickName: "오쿠맨",
      // exhibitorRate: 58,
      // immediatePrice: 20000,
    // };
    // return dto;
  } catch (error) {
    console.error("아이템 정보를 불러오는 데 실패했습니다:", error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
}

// 출품 상품 레어 점수 평가
export async function postItemRareScore(dto) {
  console.log("dto : ", dto);
  try {
    // const response = await api.post(`items/rare_score`, dto); // 서버에 POST 요청
    // return response.data; // 성공적으로 응답 데이터를 반환
    const updatedDto = {
      userId: 1,
      itemId: 1,
      rareScore: dto.rareScore,
    };
    return updatedDto;
  } catch (error) {
    console.error("아이템 정보를 불러오는 데 실패했습니다:", error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
}

// 신고하기
export async function putReport(itemId) {
  try {
    // const response = await api.put(`items/${itemId}/report`);
    const response = {
      ok: "ok",
    }
    if (response.ok) {
      alert("신고되었습니다.");
    } else {
      alert("신고에 실패했습니다.");
    }
  } catch (error) {
    console.error("신고 오류:", error);
    alert("예기치 못한 오류가 발생했습니다.");
  }
}

// 입찰 포기
export async function putBiddingGiveup(dto) {
  try {
    // const response = await api.put(`items/bidding_giveup`, dto);
    const response = {
      ok: "ok",
    }
    if (response.ok) {
      alert("입찰이 포기되었습니다.");
    } else {
      alert("입찰 포기에 실패했습니다.");
    }
  } catch (error) {
    console.error("입찰 포기 오류:", error);
    alert("예기치 못한 오류가 발생했습니다.");
  }
}

// 입찰
export async function postBidding(bidRequest) {
  try {
    // const response = await api.post(`items/bidding`, bidRequest);
    const response = {
      ok: "ok",
    }

    if (response.ok) {
      alert("입찰되었습니다.");
    } else {
      alert("입찰에 실패했습니다.");
    }
  } catch (error) {
    console.error("입찰 오류:", error);
    alert("예기치 못한 오류가 발생했습니다.");
  }
}

// 즉시 낙찰
export async function postImmediateBidding(biddingGiveupRequest) {
  try {
    // const response = await api.post(`items/immediate_bidding`, biddingGiveupRequest);
    const response = {
      ok: "ok",
    }

    if (response.ok) {
      alert("즉시 낙찰되었습니다.");
    } else {
      alert("즉시 낙찰에 실패했습니다.");
    }
  } catch (error) {
    console.error("즉시 낙찰 오류:", error);
    alert("예기치 못한 오류가 발생했습니다.");
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
    // const response = await api.get(`items/editing/${itemId}`); // 서버에 POST 요청
    // return response.data; // 성공적으로 응답 데이터를 반환
    const dto = {
      itemName: "임시 이름",
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8Rj-vULPVGhf-eQyiY5sG2dMcHFQzD6RrQ&s", 
                "https://m.jncompany.shop/web/product/big/202302/55da73b5645922de32ffa07cf315ee64.jpg", 
                "https://sitem.ssgcdn.com/87/70/47/item/1000026477087_i1_750.jpg",
                "https://wimg.heraldcorp.com/content/default/2015/03/06/20150306001045_0.jpg",
                "https://www.cheonyu.com/_DATA/product/63900/63992_1672648178.jpg",
                "https://i.pinimg.com/736x/b5/9d/8f/b59d8f8cbb54368862109db8324dc6b8.jpg",
                "https://i.pinimg.com/736x/7a/64/d1/7a64d16d82e1bc56a6607d4a7f13625b.jpg",
                "https://mblogthumb-phinf.pstatic.net/MjAxODA0MDlfMTUy/MDAxNTIzMjQwNjYxMDcw.NUntdy9kjN5iiUuneXi71eg74XEAtAJ40QOGb1LhOewg.UyZCO_3r6zQUwbDJ9n5FXuX-yalD0bMAHFiy9v8NN1Mg.PNG.lifesaverclinic/%EC%A7%B1%EA%B5%AC-%EC%BB%B4%ED%93%A8%ED%84%B0-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B46.png?type=w800",
                "https://i.namu.wiki/i/G0dztHXufsO8bQs8dySSWVQplZXjOJ1mVhjbzHFGFgO7PXxMM-yt7wV9tNm9YVoLV-jnhK5l3JORzRMUkNN9Mw.webp",],
      description: "상품 설명",
      itemCondition: "NO_USE",
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
  try {
    // const response = await api.put(`items/editing/${itemId}`, dto); // 서버에 PUT 요청
    // return response.data; // 성공적으로 응답 데이터를 반환
    console.log("dto : ", dto);
    return dto;
  } catch (error) {
    console.error("상품 등록에 실패했습니다:", error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
}

// 통합 검색 페이지 - 출품 상품 검색 결과
export async function getItemSearchResults(searchText) {
  try {
    // const response = await api.get(`/items/result/list/${searchText}`);
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
        overlayText: false,
        itemId: "result"
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 입찰 이력 페이지
export async function getBiddingHistory(biddingHistoryRequest) {
  try {
    // const response = await api.get("/items/biddinghistory, biddingHistoryRequest");
    // return response.data;
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        info: {
          communityId: 1,
          image: "/src/assets/test_image.png",
          favorited: true,
          name: "1 검색어 상품",
          biddingCount: "1111",
          rareTier: "레어",
          itemId: `item id ${i}`,
          userId: "출품자 id"
        },
        histories: [
          {
            date: "4444년 44월 23일",
            price: "10000"
          },
          {
            date: "1111년 22월 33일",
            price: "120000"
          },
          {
            date: "1111년 22월 33일",
            price: "120000"
          },
          {
            date: "1111년 22월 33일",
            price: "120000"
          }
        ]
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
        additionalInfo: "출품 일시: 오늘인지 어제인지 생각 안남",
        overlayText: false,
        itemId: `${i} item id`
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 관심 상품 페이지
export async function getFavoriteItems() {
  try {
    // const response = await axios.get(`http://localhost:8080/api/items/favorite/${user_id}`);
    // return response.data;
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        communityId: i,
        image: "/src/assets/test_image.png",
        favorited: true,
        name: `관심이 있어!!`,
        priceInfo: { price: i * 10000, type: "" },
        additionalInfo: null,
        overlayText: false,
        itemId: "ffffff"
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 입찰 이력, 출품 이력 횟수 불러오기 
export async function getHistoriesCount() {
  try {
    const response = await api.get('/items/histories/count');
    return response.data;
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

// 상품 관심 등록
export async function postFavoriteItem(itemId) {
  try {
    await api.post(`items/favorites/add/${itemId}`)
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

// 상품 해제 등록
export async function deleteFavoriteItem(itemId) {
  try {
    await api.delete(`items/favorites/delete/${itemId}`)
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}