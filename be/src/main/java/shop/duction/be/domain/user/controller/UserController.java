package shop.duction.be.domain.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.duction.be.domain.user.dto.ExhibitorRatingRequestDto;
import shop.duction.be.domain.user.service.UserService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
@Tag(name = "사용자")
public class UserController {
  private final UserService userService;

  // 일단 하드 코딩
  public Integer userId = 1;

  @PostMapping("/rating")
  @Operation(summary = "출품자 평가하기")
  public void postRatingExhibitor(@RequestBody ExhibitorRatingRequestDto exhibitorRatingRequestDto) {
    userService.postRatingExhibitor(exhibitorRatingRequestDto, userId);
  }
}
