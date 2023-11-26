package th.mfu.Controller;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import th.mfu.Quiz.Repository.QuestionRepository;
import th.mfu.Repositories.TopicRepository;
import th.mfu.Repositories.UserRepository;
import th.mfu.domain.Topic;
import th.mfu.domain.User;

@Controller
public class TopicController {
    @Autowired
    TopicRepository TopicRepo;

    @Autowired
    UserRepository UserRepo;

    @Autowired
    QuestionRepository questionRepo;

    @GetMapping("/topics")
    public String listConcerts(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        model.addAttribute("topics", TopicRepo.findAllByEmail(email));
        return "listTopic";
    }

    // @GetMapping("/topics/{id}")
    // public String listConcerts(Model model, @PathVariable long id) {
    // Topic topic = TopicRepo.findById(id).orElse(null);
    // model.addAttribute("topic_view", topic);
    // return "view-topic";
    // }

    @GetMapping("/topics/add")
    public String addAConcertForm(Model model) {
        model.addAttribute("topicform", new Topic());
        return "add-topic";
    }

    @PostMapping("/topics")
    public String saveOrUpdateTask(@ModelAttribute Topic topic) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        User user = UserRepo.findByEmail(email);
        topic.setUser(user);
        TopicRepo.save(topic);
        return "redirect:/topics";
    }

    @GetMapping("/topics/{id}/edit")
    public String editTodoForm(@PathVariable long id, Model model) {
        Topic existingTopic = TopicRepo.findById(id).orElse(null);

        if (existingTopic == null) {
            return "redirect:/topics";
        }

        model.addAttribute("editTopic", existingTopic);
        return "edit-topic";
    }

    @PostMapping("/topics/{id}/edit")
    public String editTodo(@PathVariable Long id, @ModelAttribute Topic topic) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        User user = UserRepo.findByEmail(email);
        topic.setUser(user);
        topic.setId(id);
        TopicRepo.save(topic);
        return "redirect:/topics";
    }

    @Transactional
    @GetMapping("/topics/delete/{id}")
    public String deleteConcert(@PathVariable long id) {
        questionRepo.deleteAllByTopicid(id);
        TopicRepo.deleteById(id);
        return "redirect:/topics";
    }
}