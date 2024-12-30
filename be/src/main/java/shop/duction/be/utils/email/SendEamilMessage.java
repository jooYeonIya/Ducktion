package shop.duction.be.utils.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SendEamilMessage {
  private final JavaMailSender javaMailSender;

  public void sendMail(EmailMessageInfo emailMessage) {
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();

    try {
      MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
      mimeMessageHelper.setTo("conn0204@naver.com");
      mimeMessageHelper.setSubject(emailMessage.getSubject());
      mimeMessageHelper.setText(emailMessage.getBody(), true);
      javaMailSender.send(mimeMessage);

    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
  }

  public static String createRejectSubject(String title) {
    return String.format("%s 반려 안내", title);
  }

  public static String createCancelSubject(String title) {
    return String.format("%s 취소 안내", title);
  }

  public static String createRejectBody(String communityName, String rejectReason) {
    return String.format( """
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2>안녕하세요,</h2>
                <p>요청하신 <strong>%s</strong> 커뮤니티 개설이 다음과 같은 사유로 거절되었습니다:</p>
                <blockquote style="color: red;">%s</blockquote>
                <p>감사합니다.</p>
            </div>
            """, communityName,rejectReason);
  }

  public static String createRejectBodyForDeleteItem(String itemName, String rejectReason) {
    return String.format( """
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2>안녕하세요,</h2>
                <p>요청하신 <strong>%s</strong> 삭제 요청이 다음과 같은 사유로 거절되었습니다:</p>
                <blockquote style="color: red;">%s</blockquote>
                <p>감사합니다.</p>
            </div>
            """, itemName,rejectReason);
  }

  public static String createSubmitReportBody(String itemName, String rejectReason) {
    return String.format( """
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2>안녕하세요,</h2>
                <p> <strong>%s</strong> 상품이 다음과 같은 사유로 신고를 받아 취소되었습니다:</p>
                <blockquote style="color: red;">%s</blockquote>
                <p>감사합니다.</p>
            </div>
            """, itemName,rejectReason);
  }
}
