package shop.duction.be.domain.community.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommunityListResponseDTO {
  private Map<String, List<CommunityInfo>> communityList;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class CommunityInfo {
    private Integer communityId;
    private String name;
    private boolean isFavorite;
  }
}

