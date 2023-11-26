package th.mfu.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Todo {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long Todo_ID;
    private String Topic;
    private Date Start_Date;
    private String Start_Time;
    private Date Due_Date;
    private String Due_Time;
    private String Description;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.PERSIST })
    private User user;

    public Date getStart_Date() {
        return Start_Date;
    }

    public void setStart_Date(Date start_Date) {
        Start_Date = start_Date;
    }

    public String getStart_Time() {
        return Start_Time;
    }

    public void setStart_Time(String start_Time) {
        Start_Time = start_Time;
    }

    public Date getDue_Date() {
        return Due_Date;
    }

    public void setDue_Date(Date due_Date) {
        Due_Date = due_Date;
    }

    public String getDue_Time() {
        return Due_Time;
    }

    public void setDue_Time(String due_Time) {
        Due_Time = due_Time;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getTopic() {
        return Topic;
    }

    public void setTopic(String topic) {
        Topic = topic;
    }

    public Long getTodo_ID() {
        return Todo_ID;
    }

    public void setTodo_ID(Long todo_ID) {
        Todo_ID = todo_ID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
    
}
