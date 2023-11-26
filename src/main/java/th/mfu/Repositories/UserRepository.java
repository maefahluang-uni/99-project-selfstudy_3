package th.mfu.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import th.mfu.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String username);

}