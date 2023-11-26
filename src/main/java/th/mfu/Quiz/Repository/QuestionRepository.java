package th.mfu.Quiz.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import th.mfu.Quiz.Model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT q FROM Question q WHERE q.topic.id = :topic_id")
    List<Question> findAllByTopic(@Param("topic_id") Long topicId);

    @Query("DELETE FROM Question q WHERE q.topic.id = :topic_id")
    void deleteAllByTopicid(@Param("topic_id") Long topicId);
}
