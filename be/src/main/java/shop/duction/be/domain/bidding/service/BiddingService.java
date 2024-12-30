package shop.duction.be.domain.bidding.service;

import java.time.Duration;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.bidding.dto.BidRequestDTO;
import shop.duction.be.domain.bidding.entity.BiddingHistory;
import shop.duction.be.domain.bidding.enums.BiddingStatus;
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

  public String bidding(int itemId, int userId, BidRequestDTO dto) {
    Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNotFoundException("Item with ID " + itemId + " not found"));

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

    LocalDateTime now = LocalDateTime.now();

    BiddingHistory newBiddingHistory = BiddingHistory.builder()
            .price(dto.price())
            .bidTime(now)
            .status(BiddingStatus.BIDDING)
            .user(user)
            .item(item)
            .biddedHistory(null)
            .build();

    biddingHistoryRepository.save(newBiddingHistory);

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

    user.setUsableBid(user.getUsableBid() - dto.price());

    userRepository.save(user);

    return "Bid create successful";
  }
}
