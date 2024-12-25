package shop.duction.be.item.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.item.dto.ItemCardResponseDto;
import shop.duction.be.item.entity.Item;
import shop.duction.be.item.repository.ItemRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

  private final ItemRepository itemRepository;

  public List<ItemCardResponseDto> getClosingSoonItems() {
    Pageable pageable = PageRequest.of(0, 5);
    List<Item> top5Items = itemRepository.findClosingSoonItemsByViews(pageable);
    return top5Items.stream()
            .map(item -> new ItemCardResponseDto(
                      item.getItemId(),
                      item.getCommunity().getCommunityId(),
                      item.getName(),
                      item.getItemImages().get(0).getUrl(),
                      calculatePriceInfo(item),
                      null,
                      false,
                      false)
            ).toList();
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
}
