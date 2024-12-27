package shop.duction.be.domain.item.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import shop.duction.be.domain.community.entity.Community;
import shop.duction.be.domain.community.repository.CommunityRepository;
import shop.duction.be.domain.item.dto.EditItemRequestDTO;
import shop.duction.be.domain.item.dto.RegistItemRequestDTO;
import shop.duction.be.domain.item.dto.ViewItemEditResponseDTO;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.entity.ItemImage;
import shop.duction.be.domain.item.enums.AuctionStatus;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.domain.user.entity.User;
import shop.duction.be.domain.user.repository.UserRepository;
import shop.duction.be.exception.ItemNotFoundException;
import shop.duction.be.domain.item.dto.ItemCardResponseDto;
import shop.duction.be.domain.item.enums.RareTier;
import shop.duction.be.domain.item.repository.FavoriteItemRepository;
import shop.duction.be.utils.RareTierCheckUtils;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {
  private final ItemRepository itemRepository;
  private final FavoriteItemRepository favoriteItemRepository;
  private final CommunityRepository communityRepository;
  private final UserRepository userRepository;

  public ViewItemEditResponseDTO readItemEdit(int itemId) {
    Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNotFoundException("Item with ID " + itemId + " not found"));

    List<ItemImage> itemImages = item.getItemImages();
    List<String> imageUrls = new ArrayList<>();
    if (item.getItemImages() != null && !item.getItemImages().isEmpty()) {
      for (ItemImage image : itemImages) {
        imageUrls.add(image.getUrl());
      }
    }

    ViewItemEditResponseDTO dto = new ViewItemEditResponseDTO(
            item.getName(),
            imageUrls,
            item.getDescription(),
            item.getItemCondition(),
            item.getRareScore(),
            item.getStartPrice(),
            item.getEndTime(),
            item.getImmediatePrice()
    );

    return dto;
  }

  public String itemEdit(int itemId, EditItemRequestDTO dto) {
    Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNotFoundException("Item with ID " + itemId + " not found"));
    item.setName(dto.itemName());
    item.setDescription(dto.description());
    item.setItemCondition(dto.itemCondition());
    item.setRareScore(dto.rareScore());
    item.setStartPrice(dto.startPrice());
    item.setEndBidTime(dto.endTime());
    item.setImmediatePrice(dto.immediatePrice());

    // 이미지 수정
    List<ItemImage> itemImages = item.getItemImages();

    // 삭제 요청 처리
    if (dto.removeImageUrls() != null && !dto.removeImageUrls().isEmpty()) {
      // 기존 ItemImage 리스트에서 삭제할 URL 제거
      itemImages.removeIf(image -> dto.removeImageUrls().contains(image.getUrl()));
    }

    // 추가 요청 처리
    if (dto.addImageUrls() != null && !dto.addImageUrls().isEmpty()) {
      for (String imageUrl : dto.addImageUrls()) {
        // 새 URL을 가진 ItemImage 객체 생성 및 추가
        ItemImage newImage = ItemImage.builder()
                .url(imageUrl)
                .item(item)
                .build();
        itemImages.add(newImage);
      }
    }

    item.setItemImages(itemImages);
    itemRepository.save(item);

    return "Item with ID " + itemId + " has been updated successfully!";
  }
  
  public List<ItemCardResponseDto> getClosingSoonItems(Integer userId) {
    Pageable pageable = PageRequest.of(0, 5);
    List<String > status = List.of("BIDDING_BEFORE", "BIDDING_UNDER");
    List<Item> top5Items = itemRepository.findClosingSoonItemsByViews(pageable, status);

    List<Integer> favoiteItemIds = userId != null
            ? getFavoriteItemIds(userId, top5Items)
            : List.of();

    return top5Items.stream()
            .map(item -> changeToItemCardResponseDto(item, favoiteItemIds.contains(item.getItemId()))
            ).toList();
  }

  public List<ItemCardResponseDto> getMastersCollectorsRare(Integer userId) {
    Pageable pageable = PageRequest.of(0, 10);
    List<Item> top10Items = itemRepository.findMasterRareItemsByPrice(pageable, RareTier.MASTER_COLLECTORS_RARE);

    List<Integer> favoiteItemIds = userId != null
            ? getFavoriteItemIds(userId, top10Items)
            : List.of();

    return top10Items.stream()
            .map(item -> changeToItemCardResponseDto(item,favoiteItemIds.contains(item.getItemId())))
            .toList();
  }

  public ItemCardResponseDto changeToItemCardResponseDto(Item item, boolean isFavorite) {
    return new ItemCardResponseDto(
            item.getItemId(),
            item.getCommunity().getCommunityId(),
            item.getName(),
            item.getItemImages().get(0).getUrl(),
            calculatePriceInfo(item),
            null,
            item.getAuctionStatus().getAuctionStatusMessage(),
            isFavorite);
  }

  public ItemCardResponseDto.PriceInfo calculatePriceInfo(Item item) {
    if (item.getImmediatePrice() != null) {
      return new ItemCardResponseDto.PriceInfo(item.getImmediatePrice(), "즉시 낙찰가");
    } else if (item.getNowPrice() != null) {
      return new ItemCardResponseDto.PriceInfo(item.getNowPrice(), "현재 입찰가");
    } else {
      return new ItemCardResponseDto.PriceInfo(item.getStartPrice(), "시작가");
    }
  }

  public List<Integer> getFavoriteItemIds(Integer userId, List<Item> items) {
    List<Integer> ids = items.stream().map(Item::getItemId).toList();
    return favoriteItemRepository.findeFavoriteItemsByUserAndItemIds(userId, ids);
  }

  public String createItem(RegistItemRequestDTO dto) {
    Community community = communityRepository.findById(dto.communityId()).get();
    User user = userRepository.findById(dto.userId()).get();

    RareTier rareTier = RareTierCheckUtils.rareCheck(dto.rareScore());

    Item item = Item.builder()
            .name(dto.name())
            .startPrice(dto.startPrice())
            .immediatePrice(dto.immediatePrice()) // null 가능
            .endTime(dto.endTime())
            .description(dto.description())
            .auctionStatus(AuctionStatus.BIDDING_NOT)
            .itemCondition(dto.itemCondition())
            .rareScore(dto.rareScore())
            .rareTier(rareTier)
            .isModified(false)
            .isChecked(false)
            .reportedCount(0)
            .registTime(LocalDateTime.now())
            .endBidTime(null)
            .totalView(0)
            .totalBidding(0)
            .community(community)
            .user(user)
            .build();

    // 이미지 추가
    List<ItemImage> itemImages = new ArrayList<>();
    if (dto.itemImages() != null && !dto.itemImages().isEmpty()) {
      for (String imageUrl : dto.itemImages()) {
        // 새 URL을 가진 ItemImage 객체 생성 및 추가
        ItemImage newImage = ItemImage.builder()
                .url(imageUrl)
                .item(item)
                .build();
        itemImages.add(newImage);
      }
    }

    item.setItemImages(itemImages);
    itemRepository.save(item);

    return "Item has been create successfully!";
  }
}
