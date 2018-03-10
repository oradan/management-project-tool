function Project(){
    this.id=1;
    this.name="Project 1"
    this.sprintsid=[]
}

Project.prototype.addSprintIdToProject=function(project){
    const sprints=JSON.parse(localStorage.getItem("sprint")).id
    this.sprintsid=JSON.parse(localStorage.getItem("project")).sprintsid
    this.sprintsid.push(sprints);
    localStorage.setItem("project",JSON.stringify(project));
}