package shop.duction.be.community.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopularCommunitiesResponseDto {
  private int communityId;
  private String name;
  private long totalViews;
  private boolean isFavorite;
}
