package shop.duction.be.bidpoint.service;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.bidpoint.entity.BidHistory;
import shop.duction.be.bidpoint.repository.BidPointRepository;
import shop.duction.be.user.entity.User;
import shop.duction.be.user.repository.UserRepository;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class BidPointService {
  private final BidPointRepository bidPointRepository;
  private final UserRepository userRepository;

  public void addChargeBidPoint(int bidPoint, int userId) {
    User user = userRepository.findById(userId).orElse(null);

    int newHeldBId = user.getHeldBid() == null ? 0 : user.getHeldBid() + bidPoint;
    int newUsableBid = user.getUsableBid() == null ? 0 : user.getUsableBid() + bidPoint;
    user.setHeldBid(newHeldBId);
    user.setUsableBid(newUsableBid);

    BidHistory bidHistory = new BidHistory();
    bidHistory.setBidAmount(bidPoint);
    bidHistory.setType("충전"); // 디벨롭 머지 후 변경
    bidHistory.setTransactionTime(LocalDateTime.now());
    bidHistory.setUser(user);

    bidPointRepository.save(bidHistory);
    userRepository.save(user);
  }
}
