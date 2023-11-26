package th.mfu.Quiz.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import th.mfu.Quiz.Model.Question;
import th.mfu.Quiz.Model.QuestionForm;
import th.mfu.Quiz.Model.Result;
import th.mfu.Quiz.Repository.QuestionRepository;
import th.mfu.Quiz.Repository.ResultRepository;
import th.mfu.Repositories.TopicRepository;
import th.mfu.Repositories.UserRepository;
import th.mfu.domain.User;

@Service
public class QuizService {

	@Autowired
	QuestionRepository qRepo;
	@Autowired
	ResultRepository rRepo;
	@Autowired
	TopicRepository tRepo;
	@Autowired
	UserRepository uRepo;

	public QuestionForm getQuestions(Long topic_id) {
		List<Question> allQues = qRepo.findAllByTopic(topic_id);
		QuestionForm qForm1 = new QuestionForm();
		qForm1.setQuestions(allQues);

		return qForm1;
	}

	public int getResult(QuestionForm qForm, Long topic_id) {
		int correct = 0;

		// Get all correct answers for the given topic
		List<Question> allCorrectAnswers = qRepo.findAllByTopic(topic_id);

		// List to store corrected questions (user's input with correct answers)
		List<Question> correctedQuestions = new ArrayList<>();

		// Iterate through the user answers and replace the correct answer
		for (int i = 0; i < qForm.getQuestions().size(); i++) {
			Question userAnswer = qForm.getQuestions().get(i);
			Question correctAnswer = allCorrectAnswers.get(i);

			// Create a copy of the user's answer with the correct answer replaced
			Question correctedQuestion = new Question();
			correctedQuestion.setQuestionTitle(userAnswer.getQuestionTitle());
			correctedQuestion.setChoice1(userAnswer.getChoice1());
			correctedQuestion.setChoice2(userAnswer.getChoice2());
			correctedQuestion.setChoice3(userAnswer.getChoice3());
			correctedQuestion.setChoice4(userAnswer.getChoice4());
			correctedQuestion.setCorrectAnswer(correctAnswer.getCorrectAnswer());
			correctedQuestion.setInput(userAnswer.getInput());
			correctedQuestion.setTopic(userAnswer.getTopic());

			correctedQuestions.add(correctedQuestion);

			// Check if the user's input matches the corrected answer
			if (correctedQuestion.getInput() == correctedQuestion.getCorrectAnswer()) {
				correct++;
				System.out.println("Question: " + userAnswer.getQuestionTitle());
				System.out.println("User's Input: " + correctedQuestion.getInput());
				System.out.println("Correct Answer: " + correctedQuestion.getCorrectAnswer());
				System.out.println("Result: Correct\n");
			} else {
				System.out.println("Question: " + userAnswer.getQuestionTitle());
				System.out.println("User's Input: " + correctedQuestion.getInput());
				System.out.println("Correct Answer: " + correctedQuestion.getCorrectAnswer());
				System.out.println("Result: Incorrect\n");
			}
		}

		return correct;
	}

	public void saveScore(Result result) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object principal = authentication.getPrincipal();
		String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
		User user = uRepo.findByEmail(email);
		Result saveResult = new Result();
		saveResult.setUser(user);
		saveResult.setScore(result.getScore());
		saveResult.setDate(result.getDate());
		saveResult.setTopic_name(result.getTopic_name());
		rRepo.save(saveResult);
	}
}