package th.mfu.webDto;

public class UserRegistrationDto {
    private String userName;
    private String email;
    private String Password;

    public UserRegistrationDto(String userName, String email, String Password) {
        this.userName = userName;
        this.email = email;
        this.Password = Password;
    }

    public UserRegistrationDto() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

}