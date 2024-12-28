package shop.duction.be.domain.item.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.duction.be.domain.item.dto.ItemEditRequestDTO;
import shop.duction.be.domain.item.dto.ViewItemDetailsDTO;
import shop.duction.be.domain.item.dto.ViewItemEditResponseDTO;
import shop.duction.be.domain.item.dto.ItemCardResponseDto;
import shop.duction.be.domain.item.service.ItemService;
import shop.duction.be.exception.ItemNotFoundException;
import shop.duction.be.utils.HttpStatusConstants;
  
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/items")
@RequiredArgsConstructor
@Tag(name = "출품 상품")
public class ItemController {
  private final ItemService itemService;
  
  // 일단 하드 코딩
  private Integer userId = 1;

  @GetMapping("/editing/{itemId}")
  @Operation(summary = "수정할 상품 정보 보기")
  public ResponseEntity<?> getItemEdit(@PathVariable int itemId) {
    try {
      ViewItemEditResponseDTO dto = itemService.readItemEdit(itemId);
      return ResponseEntity.status(HttpStatusConstants.OK).body(dto); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };


  @PutMapping("/editing/{itemId}")
  @Operation(summary = "상품 수정하기")
  public ResponseEntity<String> putItemEdit(@PathVariable int itemId, @RequestBody ItemEditRequestDTO dto) {
    try {
      String result = itemService.updateItem(itemId, dto);
      return ResponseEntity.status(HttpStatusConstants.OK).body(result); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };
  
  @GetMapping("/closingsoon")
  public List<ItemCardResponseDto> getClosingSoonItems() {
    return itemService.getClosingSoonItems(userId);
  }

  @GetMapping("/mastersrare")
  public List<ItemCardResponseDto> getMastersCollectorsRare() {
    return itemService.getMastersCollectorsRare(userId);
  }

  @GetMapping("/{itemId}")
  @Operation(summary = "출품 상품 상세 보기")
  public ResponseEntity<?> getItemDetails(@PathVariable int itemId) {
    try {
      ViewItemDetailsDTO dto = itemService.readItemDetails(itemId);
      return ResponseEntity.status(HttpStatusConstants.OK).body(dto); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  };
}
