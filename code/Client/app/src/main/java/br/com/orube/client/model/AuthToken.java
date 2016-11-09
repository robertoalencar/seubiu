package br.com.orube.client.model;

/**
 * Created by arthur on 08/11/16.
 */

public class AuthToken {

    private Long userId;
    private String token;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
