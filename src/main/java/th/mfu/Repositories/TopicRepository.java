package th.mfu.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import th.mfu.domain.Topic;


public interface TopicRepository extends JpaRepository<Topic, Long> {
    
    @Query("SELECT t FROM Topic t WHERE t.user.email = :email")
    List<Topic> findAllByEmail(@Param("email") String email);
            
}