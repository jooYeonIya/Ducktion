package shop.duction.be.domain.bidpoint.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.bidpoint.entity.BidHistory;
import shop.duction.be.domain.bidpoint.enums.BidpointType;
import shop.duction.be.domain.bidpoint.repository.BidHistoryRepository;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.UserRepository;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class BidPointService {
  private final BidHistoryRepository bidPointRepository;
  private final UserRepository userRepository;

  public void addChargeBidPoint(Integer bidPoint, Integer userId) {
    User user = userRepository.findById(userId).orElseThrow(() ->
            new IllegalArgumentException("사용자를 찾을 수 없습니다."));

    int newHeldBId = user.getHeldBid() == null ? 0 : user.getHeldBid() + bidPoint;
    int newUsableBid = user.getUsableBid() == null ? 0 : user.getUsableBid() + bidPoint;
    user.setHeldBid(newHeldBId);
    user.setUsableBid(newUsableBid);

    BidHistory bidHistory = new BidHistory();
    bidHistory.setBidAmount(bidPoint);
    bidHistory.setType(BidpointType.CHARGE);
    bidHistory.setTransactionTime(LocalDateTime.now());
    bidHistory.setUser(user);

    bidPointRepository.save(bidHistory);
    userRepository.save(user);
  }
}
