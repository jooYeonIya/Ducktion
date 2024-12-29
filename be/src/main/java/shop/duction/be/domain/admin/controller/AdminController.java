package shop.duction.be.domain.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.duction.be.domain.admin.dto.CreateCommunityResponseDto;
import shop.duction.be.domain.admin.dto.DeleteItemResponseDto;
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

  @GetMapping("/request/delete/item")
  public List<DeleteItemResponseDto> getDeleteItemData() {
    return adminService.getDeleteItemData();
  }
}
