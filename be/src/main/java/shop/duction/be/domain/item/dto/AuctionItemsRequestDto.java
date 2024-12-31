package shop.duction.be.domain.item.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionItemsRequestDto {
  private Integer communityId;
  private Integer currentPage;
  private String sortOption;
  private String searchText;
}
