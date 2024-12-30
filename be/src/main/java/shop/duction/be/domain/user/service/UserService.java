package shop.duction.be.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.user.dto.ExhibitorRatingRequestDto;
import shop.duction.be.domain.user.dto.MyInfoResponseDto;
import shop.duction.be.domain.user.entity.ExhibitorRating;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.ExhibitorRatingRepository;
import shop.duction.be.domain.user.repository.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final ExhibitorRatingRepository exhibitorRatingRepository;

  public MyInfoResponseDto getMyInfo(Integer userId) {
    User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    return new MyInfoResponseDto(
            user.getNickname(),
            user.getEmail(),
            user.getRate(),
            user.getHeldBid(),
            user.getUsableBid(),
            user.getProfileImage(),
            user.getPhone(),
            user.getAddress()
    );
  }

  public void postRatingExhibitor(ExhibitorRatingRequestDto request, Integer userId) {

    int existingRatings = exhibitorRatingRepository.countByEvaluatorAndExhibitor(request.getExhibitorId(), userId);
    if (existingRatings > 0) {
      throw new IllegalStateException("평가 완료한 출품자입니다");
    }

    User user = userRepository.findById(userId).orElseThrow(() ->
            new IllegalArgumentException("사용자를 찾을 수 없습니다"));

    User exhibitor = userRepository.findById(request.getExhibitorId()).orElseThrow(() ->
            new IllegalArgumentException("사용자를 찾을 수 없습니다"));

    ExhibitorRating exhibitorRating = new ExhibitorRating();
    exhibitorRating.setExhibitor(exhibitor);
    exhibitorRating.setEvaluator(user);
    exhibitorRating.setRate(Float.valueOf(request.getRating()));
    exhibitorRatingRepository.save(exhibitorRating);

    Object[] ratingData = exhibitorRatingRepository.findExhibitorRatingData(request.getExhibitorId());

    Object[] data = (Object[]) ratingData[0];
    Float sum = data != null ? ((Number) data[0]).floatValue() : request.getRating(); // sum
    Long count = data != null ? ((Number) data[1]).longValue() : 1; // count

    Float rate = (sum) / (count);
    exhibitor.setRate(rate);
    userRepository.save(exhibitor);
  }
}
