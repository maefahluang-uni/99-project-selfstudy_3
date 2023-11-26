package th.mfu.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.transaction.Transactional;

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

import th.mfu.Repositories.TodoRepository;
import th.mfu.Repositories.UserRepository;
import th.mfu.domain.Todo;
import th.mfu.domain.User;

@Controller
public class TodoController {
    @Autowired
    TodoRepository TodoRepo;

    @Autowired
    UserRepository UserRepo;

    @InitBinder
    public final void initBinderUsuariosFormValidator(final WebDataBinder binder, final Locale locale) {
        final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd", locale);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    /// Listing ///
    @GetMapping("/todolists")
    public String listTodo(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        model.addAttribute("todolists", TodoRepo.findAllByEmail(email));
        return "listTodo";
    }

    /// End-Listing ///

    /// View each element via Ids ///

    @GetMapping("/todolists/{id}")
    public String listTodo(Model model, @PathVariable long id) {
        Todo todo = TodoRepo.findById(id).orElse(null);
        model.addAttribute("todo_view", todo);
        return "view-todo";
    }

    /// end-view by ids ///

    /// Add ///

    @GetMapping("/todolists/add")
    public String addATodoForm(Model model) {
        model.addAttribute("todo", new Todo());
        return "add-todo";
    }

    /// End-Add ///

    @PostMapping("/todolists")
    public String saveOrUpdateTask(@ModelAttribute Todo todo) {
        // Authentication authentication =
        // SecurityContextHolder.getContext().getAuthentication();
        // User currentUser = (User) authentication.getPrincipal();
        // User user = UserRepo.findByEmail(currentUser.getEmail());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        User user = UserRepo.findByEmail(email);
        todo.setUser(user);
        TodoRepo.save(todo);
        return "redirect:/todolists";
    }

    /// Edit ///

    @GetMapping("/todolists/{id}/edit")
    public String editTodoForm(@PathVariable long id, Model model) {
        Todo existingTodo = TodoRepo.findById(id).orElse(null);

        if (existingTodo == null) {
            return "redirect:/todolists";
        }

        model.addAttribute("editTodo", existingTodo);
        return "edit-todo";
    }

    @PostMapping("/todolists/{id}/edit")
    public String editTodo(@PathVariable Long id, @ModelAttribute Todo todo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        User user = UserRepo.findByEmail(email);
        todo.setUser(user);
        todo.setTodo_ID(id);
        TodoRepo.save(todo);
        return "redirect:/todolists";
    }

    /// End-Edit ///

    /// Delete///

    @Transactional
    @GetMapping("/todolists/delete/{id}")
    public String deleteTodo(@PathVariable long id) {
        TodoRepo.deleteById(id);
        return "redirect:/todolists";
    }

    /// End_Delete ///
}