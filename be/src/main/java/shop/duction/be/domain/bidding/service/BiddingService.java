package shop.duction.be.domain.bidding.service;

import java.time.Duration;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.bidding.dto.BidRequestDTO;
import shop.duction.be.domain.bidding.entity.BiddedHistory;
import shop.duction.be.domain.bidding.entity.BiddingHistory;
import shop.duction.be.domain.bidding.enums.BiddedStatus;
import shop.duction.be.domain.bidding.enums.BiddingStatus;
import shop.duction.be.domain.bidding.repository.BiddedHistoryRepository;
import shop.duction.be.domain.bidding.repository.BiddingHistoryRepository;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.enums.AuctionStatus;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.UserRepository;
import shop.duction.be.exception.ItemNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BiddingService {
  private final ItemRepository itemRepository;
  private final UserRepository userRepository;
  private final BiddingHistoryRepository biddingHistoryRepository;
  private final BiddedHistoryRepository biddedHistoryRepository;

  public String bidding(int itemId, int userId, BidRequestDTO dto) {
    Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNotFoundException("Item with ID " + itemId + " not found"));

    LocalDateTime now = LocalDateTime.now();

    // 경매 종료 여부 확인
    endCheck(now, item.getEndTime(), item.getAuctionStatus());

    // 입찰가가 시작가 및 현재가보다 낮을 경우 체크
    Integer startPrice = item.getStartPrice(); // 시작가
    Integer nowPrice = item.getNowPrice();     // 현재가 (nullable)

    if (dto.price() <= startPrice || (nowPrice != null && dto.price() <= nowPrice)) {
      throw new IllegalArgumentException("Invalid bid amount: Must be higher than both the start price and the current price");
    }

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ItemNotFoundException("User with ID " + userId + " not found"));

    // 보유 비드 확인
    if(user.getUsableBid() < dto.price()) throw new IllegalArgumentException("Invalid bid amount: Not enough beads to hold");

    // 입찰 이력 생성
    BiddingHistory newBiddingHistory = BiddingHistory.builder()
            .price(dto.price())
            .bidTime(now)
            .status(BiddingStatus.BIDDING)
            .user(user)
            .item(item)
            .biddedHistory(null)
            .build();

    biddingHistoryRepository.save(newBiddingHistory);

    // 출품 상품에 입찰 정보 반영
    item.setNowPrice(dto.price());
    item.setAuctionStatus(AuctionStatus.BIDDING_UNDER);
    item.setTotalBidding(item.getTotalBidding() + 1);

    // 종료 5분 전일 경우 시간 연장
    LocalDateTime endBidTime = item.getEndBidTime();
    Duration duration = Duration.between(now, endBidTime);

    if (!duration.isNegative() && duration.toMinutes() <= 5) {
      item.setEndBidTime(endBidTime.plusMinutes(5));
    }

    itemRepository.save(item);

    // 입찰자의 사용 가능 비드 차감
    user.setUsableBid(user.getUsableBid() - dto.price());
    userRepository.save(user);

    return "Bid create successful";
  }

  public String biddingGiveup(int itemId, int userId) {
    Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNotFoundException("Item with ID " + itemId + " not found"));

    // 경매 종료 여부 확인
    endCheck(LocalDateTime.now(), item.getEndTime(), item.getAuctionStatus());

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ItemNotFoundException("User with ID " + userId + " not found"));

    BiddingHistory finalBid = biddingHistoryRepository.findHighestBidByUserIdAndItemId(itemId, userId)
            .orElseThrow(() -> new ItemNotFoundException("BiddingHistory with userID, itemID " + userId + itemId + " not found"));


    // 내 입찰가가 최고 입찰가일 경우 불가능
    Integer nowPrice = item.getNowPrice();     // 현재가 (nullable)
    int finalBidPrice = finalBid.getPrice();

    if (nowPrice != null && finalBidPrice == nowPrice) {
      throw new IllegalArgumentException("Invalid Request: You cannot cancel the bid if it is the highest bid.");
    }

    // 입찰 이력 취소 후 사용 가능 비드 복구
    finalBid.setStatus(BiddingStatus.BIDDING_GIVE_UP);
    biddingHistoryRepository.save(finalBid);

    user.setUsableBid(user.getUsableBid() + finalBidPrice);
    userRepository.save(user);

    return "Bidding give up successful";
  }

  public String immediateBidding(int itemId, int userId) {
    Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNotFoundException("Item with ID " + itemId + " not found"));

    LocalDateTime now = LocalDateTime.now();

    // 경매 종료 여부 확인
    endCheck(now, item.getEndTime(), item.getAuctionStatus());

    // 즉시낙찰이 가능한 상품인지 확인
    if (item.getImmediatePrice() == null) {
      throw new IllegalArgumentException("Invalid Request: Immediate bidding is not available for this item.");
    }

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ItemNotFoundException("User with ID " + userId + " not found"));

    // 보유 비드 확인
    if(user.getUsableBid() < item.getImmediatePrice()) throw new IllegalArgumentException("Invalid bid amount: Not enough beads to hold");

    // 출품 상품에 낙찰 상태 반영
    item.setEndTime(now);
    item.setAuctionStatus(AuctionStatus.BIDDED);
    item.setEndBidTime(now);
    item.setTotalBidding(item.getTotalBidding() + 1);

    itemRepository.save(item);

    // 입찰 이력, 낙찰 이력 생성
    BiddingHistory biddingHistory = BiddingHistory.builder()
            .price(item.getImmediatePrice())
            .bidTime(now)
            .status(BiddingStatus.BIDDED)
            .user(user)
            .item(item)
            .build();

    BiddingHistory savedBiddingHistory = biddingHistoryRepository.save(biddingHistory);

    BiddedHistory biddedHistory = BiddedHistory.builder()
            .price(savedBiddingHistory.getPrice())
            .biddedTime(now)
            .status(BiddedStatus.BIDDED_IMMEDIATELY)
            .user(user)
            .item(item)
            .biddingHistory(savedBiddingHistory)
            .build();

    biddedHistoryRepository.save(biddedHistory);

    // 낙찰자의 비드 차감
    user.setUsableBid(user.getUsableBid() - item.getImmediatePrice());
    user.setHeldBid(user.getHeldBid() - item.getImmediatePrice());

    userRepository.save(user);
    return "Immediate bidding successful";
  }

  private void endCheck(LocalDateTime now, LocalDateTime itemEndTime, AuctionStatus itemStatus) {
    // 경매 종료 여부 확인
    if (now.isAfter(itemEndTime) ||
            !(itemStatus == AuctionStatus.BIDDING_BEFORE || itemStatus == AuctionStatus.BIDDING_UNDER)) {
      throw new IllegalArgumentException("Invalid Request: The auction has already ended.");
    }
  }
}
