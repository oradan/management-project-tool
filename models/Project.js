function Project(){
    this.id=new Date().getTime().toString()
    this.name=""
    this.sprintsid=[]
}

Project.prototype.addSprintIdToProject=function(project){
    
    const sprints=JSON.parse(localStorage.getItem("sprint")).id
    this.sprintsid=JSON.parse(localStorage.getItem("project")).sprintsid
    this.sprintsid.push(sprints);
    localStorage.setItem("project",JSON.stringify(project));
}

Project.prototype.getProgject=function(){
    return JSON.parse(localStorage.getItem("project"))
}