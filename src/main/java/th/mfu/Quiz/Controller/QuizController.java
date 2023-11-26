package th.mfu.Quiz.Controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import th.mfu.Quiz.Model.QuestionForm;
import th.mfu.Quiz.Model.Result;
import th.mfu.Quiz.Repository.ResultRepository;
import th.mfu.Quiz.Service.QuizService;
import th.mfu.Repositories.TopicRepository;
import th.mfu.Repositories.UserRepository;
import th.mfu.domain.Topic;
import th.mfu.domain.User;

@Controller
public class QuizController {
	
	@Autowired
	QuizService qService;
    @Autowired
	UserRepository uRepo;
    @Autowired
    ResultRepository rRepo;
    @Autowired
    TopicRepository topicRepo;

    @InitBinder
    public final void initBinderUsuariosFormValidator(final WebDataBinder binder, final Locale locale) {
        final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd", locale);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }


    @GetMapping("/topics/{id}/quiz")
    public String getQuizPage(Model model, @PathVariable Long id) {
    Topic topic = topicRepo.findById(id).get();
    // Handle GET request
    QuestionForm qForm = qService.getQuestions(id);
	model.addAttribute("qForm", qForm);
    model.addAttribute("topic_id", id);
    model.addAttribute("topicName",topic.getTopic_Name());
    return "quiz";
}
		
	@PostMapping("/topics/{id}/quiz")
	public String quiz(Model model, @PathVariable Long id, @ModelAttribute Result result) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        User user = uRepo.findByEmail(email);

		result = new Result();
		result.setUser(user);

		QuestionForm qForm = qService.getQuestions(id);
		model.addAttribute("qForm", qForm);
		
		return "quiz";
	}
	
	@PostMapping("/topics/{id}/submit")
	public String submit(@ModelAttribute QuestionForm qForm, Model model, @ModelAttribute Result result, @PathVariable long id) {
        Topic topic = topicRepo.findById(id).get();
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

		result.setScore(qService.getResult(qForm,id));
        result.setDate(timestamp);
        result.setTopic_name(topic.getTopic_Name());
        System.out.println(topic.getTopic_Name());
		qService.saveScore(result);


        model.addAttribute("result", result);
        model.addAttribute("topic_id", id);
		
		return "show-score";
	}

    @GetMapping("/history")
	public String score(Model m) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
		List<Result> result = rRepo.findAllByEmail(email);
		m.addAttribute("resultlists", result);
		
		return "history";
	}

}