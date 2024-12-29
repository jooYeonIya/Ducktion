package shop.duction.be.domain.item.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.duction.be.domain.admin.dto.ReportInfoResponseDto;
import shop.duction.be.domain.item.dto.HistoriesCountResponseDto;
import shop.duction.be.domain.item.entity.Item;
import shop.duction.be.domain.item.enums.RareTier;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
  @Query("""
            SELECT i
            FROM Item i LEFT JOIN FETCH i.itemImages ii
            WHERE FUNCTION('DATE', i.endTime) = CURRENT_DATE
            AND i.auctionStatus IN :status
            ORDER BY i.totalView DESC
         """)
  List<Item> findClosingSoonItemsByViews(Pageable pageable, @Param("status") List<String> status);

  @Query(""" 
            SELECT i
            FROM Item i
            WHERE i.rareTier = :rareTier
            ORDER BY 
                CASE 
                    WHEN i.immediatePrice IS NOT NULL THEN i.immediatePrice
                    WHEN i.nowPrice IS NOT NULL THEN i.nowPrice
                    ELSE i.startPrice
                END DESC
        """)
  List<Item> findMasterRareItemsByPrice(Pageable pageable, @Param("rareTier") RareTier rareTier);

  @Query("""
          SELECT new shop.duction.be.domain.item.dto.HistoriesCountResponseDto$ExhibitDetails(
            (SELECT COUNT(*) FROM ExhibitHistory),
            SUM(CASE WHEN b.status = 'BIDDING_UNDER' THEN 1 ELSE 0 END),
            SUM(CASE WHEN b.status = 'BIDDED' THEN 1 ELSE 0 END),
            SUM(CASE WHEN b.status = 'BIDDING_NOT' THEN 1 ELSE 0 END),
            SUM(CASE WHEN b.status = 'BIDDED_CANCEL' THEN 1 ELSE 0 END)
          )
          FROM ExhibitHistory b
        """)
  HistoriesCountResponseDto.ExhibitDetails findExhibitHistoriesCounts();

  @Query("""
          SELECT new shop.duction.be.domain.item.dto.HistoriesCountResponseDto$BiddingDetails(
            (SELECT COUNT(*) FROM BiddingHistory),
            SUM(CASE WHEN b.status = 'BIDDING' THEN 1 ELSE 0 END),
            SUM(CASE WHEN b.status = 'BIDDED' THEN 1 ELSE 0 END),
            SUM(CASE WHEN b.status = 'BIDDING_FAIL' OR b.status = 'BIDDING_GIVE_UP' THEN 1 ELSE 0 END)
          )
          FROM BiddingHistory b
        """)
  HistoriesCountResponseDto.BiddingDetails findBiddingHistoriesCounts();

  @Query("""
            SELECT i
            FROM Item i
            WHERE i.community.communityId = :communityId
            AND (:searchText IS NULL OR i.name LIKE %:searchText%)
            ORDER BY i.registTime DESC
        """)
  Page<Item> findItems(
          @Param("communityId") Integer communityId,
          @Param("searchText") String searchText,
          Pageable pageable
  );

  @Query("""
            SELECT new shop.duction.be.domain.admin.dto.ReportInfoResponseDto(i.itemId, i.name, i.reportedCount)
            FROM Item i
            WHERE i.reportedCount > 0
            ORDER BY i.reportedCount DESC
        """)
  List<ReportInfoResponseDto> findAllReportInfos();

  @Query("""
            SELECT i
            FROM Item i
            WHERE i.isChecked = false
            AND i.endBidTime IS NOT NULL
            ORDER BY i.endBidTime DESC
        """)
  List<Item> findCheckedItems();
}
