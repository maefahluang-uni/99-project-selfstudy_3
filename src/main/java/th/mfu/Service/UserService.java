package th.mfu.Service;

import org.springframework.security.core.userdetails.UserDetailsService;

import th.mfu.domain.User;
import th.mfu.webDto.UserRegistrationDto;

public interface UserService extends UserDetailsService{
	User save(UserRegistrationDto registrationDto);
}