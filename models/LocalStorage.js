class LocalStorage{
    static project(project){
        localStorage.setItem("project",JSON.stringify(project))
    }
    static user(user){
        localStorage.setItem("user",JSON.stringify(user))
    }
    static users(users){
        localStorage.setItem("users",JSON.stringify(users))
    }
    static sprint(sprint){
        localStorage.setItem("sprint",JSON.stringify(sprint))
    }
  
    static sprints(sprints){
        localStorage.setItem("sprints",JSON.stringify(sprints))
    }
    static issue(issue){
        localStorage.setItem("issue",JSON.stringify(issue))
    }
    static issues(issues){
        localStorage.setItem("issues",JSON.stringify(issues))
    }
    static task(task){
        localStorage.setItem("task",JSON.stringify(task))
    }
    static tasks(tasks){
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }
    static comment(comment){
        localStorage.setItem("comment",JSON.stringify(comment))
    }
    static comments(comments){
        localStorage.setItem("comments",JSON.stringify(comments))
    }
    static addLogedUserToLocaleStorage(id,name){
            const user=new User(id,name)
            user.id=id
            user.name=name
            localStorage.setItem("user",JSON.stringify(user))
        }

    
}