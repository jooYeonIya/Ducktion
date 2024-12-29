package shop.duction.be.domain.bidding.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.bidding.repository.BiddingHistoryRepository;
import shop.duction.be.domain.item.dto.*;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.entity.ItemImage;
import shop.duction.be.domain.item.entity.RareRating;
import shop.duction.be.domain.item.entity.UserItemKey;
import shop.duction.be.domain.item.enums.RareTier;
import shop.duction.be.domain.item.repository.FavoriteItemRepository;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.domain.item.repository.RareRatingRepository;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.UserRepository;
import shop.duction.be.exception.ItemNotFoundException;
import shop.duction.be.utils.ItemConditionConverter;
import shop.duction.be.utils.RareTierCheck;
import shop.duction.be.utils.RareTierConverter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ItemNotFoundException("User with ID " + userId + " not found"));

    BiddingHistoryRepository

    Optional<RareRating> rareRating = rareRatingRepository.findById(userItemKey);
    RareRating newRating;
    float newAverageRareScore;


    if (rareRating.isPresent()) {
      // rareRating 값이 존재하는 경우: Update
      RareRating existingRating = rareRating.get();
      Float previousRareScore = existingRating.getRareScore();
      existingRating.setRareScore(dto.rareScore());
      rareRatingRepository.save(existingRating);

      // 평균 rareScore, rareTier 업데이트 (추후 간소화)
      int rareScoreCount = rareRatingRepository.countById_ItemId(itemId);
      Float previousAverageRareScore = item.getRareScore();
      newAverageRareScore = (rareScoreCount * previousAverageRareScore - previousRareScore + dto.rareScore()) / rareScoreCount;
    } else {
      // rareRating 값이 없는 경우: Create
      newRating = RareRating.builder()
              .id(userItemKey)
              .user(user)
              .item(item)
              .rareScore(dto.rareScore())
              .build();
      rareRatingRepository.save(newRating);

      // 평균 rareScore, rareTier 업데이트
      newAverageRareScore = (item.getRareScore() + dto.rareScore()) / 2;
    }

    RareTier newRareTier = RareTierCheck.rareCheck(newAverageRareScore);
    item.setRareScore(newAverageRareScore);
    item.setRareTier(newRareTier);
    itemRepository.save(item);

    return rareRating.isPresent() ? "Rare rating updated successfully." : "Rare rating created successfully.";
  }
}
