package shop.duction.be.domain.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.admin.dto.CreateCommunityResponseDto;
import shop.duction.be.domain.admin.dto.DeleteItemResponseDto;
import shop.duction.be.domain.admin.dto.ReportInfoResponseDto;
import shop.duction.be.domain.admin.dto.ValidateItemInfoResponseDto;
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
  public ResponseEntity<String> postCreateCommunity(
          @PathVariable("communityName") String communityName,
          @PathVariable("requestId") Integer requestId) {
    return adminService.postCreateCommunity(communityName, requestId);
  }

  @GetMapping("/request/delete/item")
  public List<DeleteItemResponseDto> getDeleteItemData() {
    return adminService.getDeleteItemData();
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
