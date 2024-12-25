package shop.duction.be.item.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.item.dto.ItemCardResponseDto;
import shop.duction.be.item.entity.Item;
import shop.duction.be.item.repository.FavoriteItemRepository;
import shop.duction.be.item.repository.ItemRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

  private final ItemRepository itemRepository;
  private final FavoriteItemRepository favoriteItemRepository;

  public List<ItemCardResponseDto> getClosingSoonItems(Integer userId) {
    Pageable pageable = PageRequest.of(0, 5);
    List<Item> top5Items = itemRepository.findClosingSoonItemsByViews(pageable);

    List<Integer> favoiteItemIds = userId != null
            ? getFavoriteItemIds(userId, top5Items)
            : List.of();

    return top5Items.stream()
            .map(item -> changeToItemCardResponseDto(item, favoiteItemIds.contains(item.getItemId()))
            ).toList();
  }

  public ItemCardResponseDto changeToItemCardResponseDto(Item item, boolean isFavorite) {
    return new ItemCardResponseDto(
            item.getItemId(),
            item.getCommunity().getCommunityId(),
            item.getName(),
            item.getItemImages().get(0).getUrl(),
            calculatePriceInfo(item),
            null,
            false,
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
}
