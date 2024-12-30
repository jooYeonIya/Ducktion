package shop.duction.be.domain.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.admin.dto.*;
import shop.duction.be.domain.admin.service.AdminService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
  private final AdminService adminService;

  @GetMapping("/request/creat/community")
  public List<CreateCommunityResponseDto> getCreateCommunityData() {
    return adminService.getCreateCommunityData();
  }

  @GetMapping("/request/creat/community/{communityName}/{requestId}")
  public ResponseEntity<String> createCommunity(
          @PathVariable("communityName") String communityName,
          @PathVariable("requestId") Integer requestId) {
    return adminService.createCommunity(communityName, requestId);
  }

  @PostMapping("/request/reject/community")
  public ResponseEntity<String> postRejectCommunity(@RequestBody RejectCommunityRequest request) {
    return adminService.postRejectCommunity(request);
  }


  @GetMapping("/request/delete/item")
  public List<DeleteItemResponseDto> getDeleteItemData() {
    return adminService.getDeleteItemData();
  }

  @GetMapping("/request/delete/item/{itemId}/{requestId}")
  public ResponseEntity<String> deleteItemData(
          @PathVariable("itemId") Integer itemId,
          @PathVariable("requestId") Integer requestId) {
    return adminService.deleteItemData(itemId, requestId);
  }
  @GetMapping("/report/item")
  public List<ReportInfoResponseDto> getReportData() {
    return adminService.getReportData();
  }

  @GetMapping("/validate/item")
  public List<ValidateItemInfoResponseDto> getValidateItemData() {
    return adminService.getValidateItemData();
  }
}
