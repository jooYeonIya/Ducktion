package shop.duction.be.domain.item.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoriesRequestDto {
  String year;
  String month;
  String sortType;
}
