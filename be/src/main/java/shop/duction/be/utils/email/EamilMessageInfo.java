package shop.duction.be.utils.email;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EamilMessageInfo {
    private String to;
    private String subject;
    private String body;
}
