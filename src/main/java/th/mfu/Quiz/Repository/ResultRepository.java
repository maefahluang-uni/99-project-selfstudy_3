package th.mfu.Quiz.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import th.mfu.Quiz.Model.Result;

public interface ResultRepository extends JpaRepository<Result, Long> {

    @Query("SELECT r FROM Result r WHERE r.user.email = :email ORDER BY r.date DESC")
    List<Result> findAllByEmail(@Param("email") String email);
}
