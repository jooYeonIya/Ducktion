package shop.duction.be.domain.item.service;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.duction.be.domain.item.dto.ItemEditRequestDTO;
import shop.duction.be.domain.item.dto.ViewItemEditResponseDTO;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.entity.ItemImage;
import shop.duction.be.domain.item.repository.ItemRepository;
import shop.duction.be.exception.ItemNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {
  private final ItemRepository itemRepository;

  public ViewItemEditResponseDTO viewItemEdit(int itemId) {
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
            item.getEndBidTime(),
            item.getImmediatePrice()
    );

    return dto;
  }

  public String itemEdit(int itemId, ItemEditRequestDTO dto) {
    Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNotFoundException("Item with ID " + itemId + " not found"));
    item.setName(dto.itemName());
    item.setDescription(dto.description());
    item.setItemCondition(dto.itemCondition());
    item.setRareScore(dto.rareScore());
    item.setStartPrice(dto.startPrice());
    item.setEndBidTime(dto.endBidTime());
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
}
