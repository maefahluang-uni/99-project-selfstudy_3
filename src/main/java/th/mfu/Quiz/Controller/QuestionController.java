package th.mfu.Quiz.Controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import th.mfu.Quiz.Model.Question;
import th.mfu.Quiz.Repository.QuestionRepository;
import th.mfu.Repositories.TopicRepository;
import th.mfu.domain.Topic;

@Controller
public class QuestionController {

    @Autowired
    QuestionRepository questionRepo;

    @Autowired
    TopicRepository TopicRepo;

    @GetMapping("/topics/{topic_id}")
    public String returnAllQuestion(Model model, @PathVariable("topic_id") Long topic_id) {
        // Topic topic = TopicRepo.findById(topic_id).get();
        // Long id = topic.getId();
        // model.addAttribute("Questions", questionRepo.findAllByTopic(id));
        // return "listQuestion";

        Topic topic = TopicRepo.findById(topic_id).orElse(null);

        if (topic != null) {
            Long id = topic.getId();
            model.addAttribute("Questions", questionRepo.findAllByTopic(id));
            model.addAttribute("topic_id", topic_id);
            return "listQuestion";
        } else {
            // Handle the case when no topic is found
            return "topicNotFound"; // Replace with an appropriate view name or redirect
        }

    }

    @GetMapping("/topics/{topic_id}/getQuestion")
    public List<Question> getAllQuestion(@PathVariable Long topic_id) {
        return questionRepo.findAllByTopic(topic_id);
    }

    @GetMapping("/topics/{topic_id}/add")
    public String addATodoForm(Model model, @PathVariable Long topic_id) {
        Topic topic = TopicRepo.findById(topic_id).orElse(null);

        model.addAttribute("question", new Question());
        model.addAttribute("topic_id", topic_id);

        model.addAttribute("topicName", topic.getTopic_Name());
        return "add-question";
    }

    @PostMapping("/topics/{topic_id}")
    public String saveOrUpdateTask(@ModelAttribute Question question, @PathVariable Long topic_id) {
        Topic topic = TopicRepo.findById(topic_id).get();
        question.setTopic(topic);
        questionRepo.save(question);
        return "redirect:/topics/{topic_id}";
    }

    /// Edit ///

    @GetMapping("/topics/{topic_id}/{id}/edit")
    public String editTodoForm(Model model, @PathVariable long topic_id, @PathVariable long id) {
        Question existingQuestion = questionRepo.findById(id).orElse(null);

        if (existingQuestion == null) {
            return "/topics/{topic_id}/";
        }

        model.addAttribute("editQuestion", existingQuestion);
        model.addAttribute("topicName", existingQuestion.getTopic().getTopic_Name());
        model.addAttribute("topic_id", topic_id);
        return "edit-question";
    }

    @PostMapping("/topics/{topic_id}/{id}/edit")
    public String editTodo(@PathVariable Long topic_id, @PathVariable Long id, @ModelAttribute Question question) {
        Topic topic = TopicRepo.findById(topic_id).get();
        question.setTopic(topic);
        question.setId(id);
        questionRepo.save(question);
        return "redirect:/topics/{topic_id}";
    }

    /// End-Edit ///

    /// Delete///

    @Transactional
    @GetMapping("/topics/{topic_id}/delete/{id}")
    public String deleteTodo(Model model, @PathVariable long topic_id, @PathVariable long id) {
        questionRepo.deleteById(id);
        return "redirect:/topics/{topic_id}";
    }
    
    @Transactional
    @GetMapping("/topics/{topic_id}/delete/all")
    public String deleteAll(Model model, @PathVariable long topic_id, @PathVariable long id) {
        questionRepo.deleteAllByTopicid(topic_id);
        return "redirect:/topics/{topic_id}";
    }

    /// End_Delete ///

}
