package pi.tn.esprit.payload.response;

import java.util.List;

public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private String jwtToken;

    public UserInfoResponse(Long id, String username, String email, List<String> roles,String jwtToken) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.jwtToken = jwtToken;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}