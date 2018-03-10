function Tasks(){
    this.allTasks=[]
}

Tasks.prototype.addTasksToLocalStorage=function(tasks){
    const task=JSON.parse(localStorage.getItem("task"))
    this.allTasks=JSON.parse(localStorage.getItem("tasks")).allTasks
    this.allTasks.push(task)
    localStorage.setItem("tasks",JSON.stringify(tasks))

}
Tasks.prototype.getTasks=function(){
  return  JSON.parse(localStorage.getItem("tasks"))
}
