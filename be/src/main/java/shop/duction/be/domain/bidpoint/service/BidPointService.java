package shop.duction.be.domain.bidpoint.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.bidpoint.dto.BidPointHistoriesRequestDto;
import shop.duction.be.domain.bidpoint.dto.BidPointHistoriesResponseDto;
import shop.duction.be.domain.bidpoint.dto.UserBidPointResponse;
import shop.duction.be.domain.bidpoint.entity.BidHistory;
import shop.duction.be.domain.bidpoint.enums.BidPointHistoriesSortType;
import shop.duction.be.domain.bidpoint.enums.BidPointType;
import shop.duction.be.domain.bidpoint.repository.BidHistoryRepository;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.UserRepository;
import shop.duction.be.utils.DateTimeUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BidPointService {
  private final BidHistoryRepository bidHistoryRepository;
  private final UserRepository userRepository;

  public UserBidPointResponse getUserBidPoint(Integer userId) {
    User user = userRepository.findHeldBidAndUsableBidByUserId(userId);
    return new UserBidPointResponse(user.getHeldBid(), user.getUsableBid());
  }

  public List<BidPointHistoriesResponseDto> getBidPointHistories(BidPointHistoriesRequestDto request, Integer userId) {
    LocalDateTime startDay = DateTimeUtils.getStartOfMonth(request.getYear(), request.getMonth());
    LocalDateTime endDay = DateTimeUtils.getEndOfMonth(request.getYear(), request.getMonth());

    List<String> types = switch (request.getSortType()) {
      case "ALL" -> BidPointHistoriesSortType.ALL.getBidPointHistoriesString();
      case "PLUS" -> BidPointHistoriesSortType.PLUS.getBidPointHistoriesString();
      case "MINUS" -> BidPointHistoriesSortType.MINUS.getBidPointHistoriesString();
      default -> throw new IllegalArgumentException("Invalid sort type: " + request.getSortType());
    };

    List<BidHistory> histories = bidHistoryRepository.findBidHistoriesByTypesAndDate(userId, startDay, endDay, types);
    return histories.stream().map(history ->
            new BidPointHistoriesResponseDto(
                    DateTimeUtils.dateTimeFormatter.format(history.getTransactionTime().toLocalDate()),
                    DateTimeUtils.timeFormatter.format(history.getTransactionTime().toLocalTime()),
                    BidPointType.getDefaultNameBasedOnType(history.getType()),
                    history.getBidAmount(),
                    history.getBiddedHistory() != null && history.getBiddedHistory().getItem() != null
                            ? history.getBiddedHistory().getItem().getItemId()
                            : null,
                    history.getBiddedHistory() != null && history.getBiddedHistory().getItem() != null
                            ? history.getBiddedHistory().getItem().getName() + " >"
                            : BidPointType.getDefaultNameBasedOnType(history.getType())
            )
    ).toList();
  }

  public void updateBidPoint(Integer bidPoint, Integer userId, BidPointType type) {
    User user = userRepository.findById(userId).orElseThrow(() ->
            new IllegalArgumentException("사용자를 찾을 수 없습니다."));

    int bidAmount = (type == BidPointType.CHARGE) ? bidPoint : -bidPoint;

    int newHeldBid = user.getHeldBid() == null ? 0 : user.getHeldBid() + bidAmount;
    int newUsableBid = user.getUsableBid() == null ? 0 : user.getUsableBid() + bidAmount;

    user.setHeldBid(newHeldBid);
    user.setUsableBid(newUsableBid);

    BidHistory bidHistory = new BidHistory();
    bidHistory.setBidAmount(bidAmount);
    bidHistory.setType(type);
    bidHistory.setTransactionTime(LocalDateTime.now());
    bidHistory.setUser(user);

    bidHistoryRepository.save(bidHistory);
    userRepository.save(user);
  }
}
