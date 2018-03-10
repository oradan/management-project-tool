function Task(data){
    this.id=null;
    this.type=""
    this.issueId=null;
    this.name="";
    this.description="";
    this.status="";
    this.createdAt="";
    this.updatedAt="";

}
Task.prototype.addTaskToLocalStorage=function(data,task){
    this.id=new Date().getTime().toString();
    this.type=data.type;
    this.issueId=data.issueId;
    this.name=data.name;
    this.description=data.description;
    this.status=data.status;
    this.createdAt=data.createdAt;
    this.updatedAt=data.updatedAt;
    localStorage.setItem("task",JSON.stringify(task));
}
Task.prototype.getTask=function(){
   return JSON.parse(localStorage.getItem("task"))
}


