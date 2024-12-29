package shop.duction.be.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.user.dto.ExhibitorRatingRequestDto;
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

  public void postRatingExhibitor(ExhibitorRatingRequestDto request, Integer userId) {
    User user = userRepository.findById(userId).orElseThrow(() ->
            new IllegalArgumentException("사용자를 찾을 수 없습니다."));

    User exhibitor = userRepository.findById(request.getExhibitorId()).orElseThrow(() ->
            new IllegalArgumentException("사용자를 찾을 수 없습니다."));

    ExhibitorRating exhibitorRating = new ExhibitorRating();
    exhibitorRating.setExhibitor(exhibitor);
    exhibitorRating.setEvaluator(user);
    exhibitorRating.setRate(Float.valueOf(request.getRating()));
    exhibitorRatingRepository.save(exhibitorRating);
  }
}
