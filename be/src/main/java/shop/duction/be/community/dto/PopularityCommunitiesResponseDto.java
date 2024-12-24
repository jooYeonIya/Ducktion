package shop.duction.be.community.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopularityCommunitiesResponseDto {
  private String name;
  private boolean isFavorited;
  private int communityId;
}
