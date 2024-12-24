package shop.duction.be.community.entity;

import java.io.Serializable;
import java.util.Objects;

public class FavoriteCommunityId implements Serializable {
    private int userId;
    private int communityId;

    public FavoriteCommunityId() {}

    public FavoriteCommunityId(int userId, int communityId) {
        this.userId = userId;
        this.communityId = communityId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FavoriteCommunityId that = (FavoriteCommunityId) o;
        return userId == that.userId && communityId == that.communityId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, communityId);
    }
}

