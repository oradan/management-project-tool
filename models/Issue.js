function Issue(){
    this.id=null;
    this.type="";
    this.name="";
    this.sprint=null;
    this.createdBy=null;
    this.assignee=null;
    this.description="";
    this.status="";
    this.tasks=null;
    this.comments=null;
    this.updateAt="";
    this.createdAt="";
}
//datele puteau sa fie luate direct din local storage dar m-am gandit ca pe viitor datele vor fi 
//salvate pe un server si atunci ar  trebui de modificat mai mult
Issue.prototype.addIssueToLocalStorage=function(data,issue){
    this.id=new Date().getTime().toString();
    this.type=data.type;
    this.name=data.name;
    this.sprint=data.sprint;
    this.createdBy=data.createdBy;
    this.assignee=data.assignee;
    this.description=data.description;
    this.status=data.status;
    this.tasks=data.tasks;
    this.comments=data.comments;
    this.updateAt=data.updateAt;
    this.createdAt=data.createdAt;
localStorage.setItem("issue",JSON.stringify(issue));
}
Issue.prototype.getIssue=function(){
   const currentIssue= JSON.parse(localStorage.getItem("issue"));
   return currentIssue;
}
Issue.prototype.saveEditedIssue=function(data){
    localStorage.setItem("issue",JSON.stringify(data))
}