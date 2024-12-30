package shop.duction.be.domain.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.user.dto.EditUserInfoRequestDto;
import shop.duction.be.domain.user.dto.ExhibitorRatingRequestDto;
import shop.duction.be.domain.user.dto.MyInfoResponseDto;
import shop.duction.be.domain.user.dto.ProfileImageEditRequestDTO;
import shop.duction.be.domain.user.service.UserService;
import shop.duction.be.exception.ItemNotFoundException;
import shop.duction.be.utils.HttpStatusConstants;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
@Tag(name = "사용자")
public class UserController {
  private final UserService userService;

  // 일단 하드 코딩
  public Integer userId = 1;

  @GetMapping("/info")
  @Operation(summary = "내 정보 불러오기")
  public MyInfoResponseDto getMyInfo() {
    return userService.getMyInfo(userId);
  }

  @PostMapping("/info/edit")
  @Operation(summary = "내 정보 수정하기")
  public  ResponseEntity<String> editMyInfo(@RequestBody EditUserInfoRequestDto dto) {
    return userService.editMyInfo(dto, userId);
  }

  @GetMapping("/info/delete")
  @Operation(summary = "회원 탈퇴하기")
  public  ResponseEntity<String> deleteUser() {
    return userService.deleteUser(userId);
  }

  @PostMapping("/rating")
  @Operation(summary = "출품자 평가하기")
  public ResponseEntity<String> postRatingExhibitor(@RequestBody ExhibitorRatingRequestDto dto) {
    userService.postRatingExhibitor(dto, userId);
    return ResponseEntity.ok("출품자 평가 완료했습니다");
  }

  @PutMapping("/info/image")
  @Operation(summary = "프로필 사진 변경하기")
  public  ResponseEntity<String> putUserProfileImage(@RequestBody ProfileImageEditRequestDTO dto) {
    try {
      String result = userService.updateUserProfileImage(userId, dto);
      return ResponseEntity.status(HttpStatusConstants.OK).body(result); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  }

  @DeleteMapping("/info/image")
  @Operation(summary = "프로필 사진 삭제하기")
  public  ResponseEntity<String> deleteUserProfileImage() {
    try {
      String result = userService.deleteUserProfileImage(userId);
      return ResponseEntity.status(HttpStatusConstants.OK).body(result); // 200 OK 사용
    } catch (ItemNotFoundException e) {
      return ResponseEntity.status(HttpStatusConstants.NOT_FOUND).body("Item not found"); // 404 NOT FOUND
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatusConstants.BAD_REQUEST).body("Invalid input"); // 400 BAD REQUEST
    }
  }
}
