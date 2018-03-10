function Sprints(){
 this.allSprints=[]
}
Sprints.prototype.addSprintsToLocalStorage=function(sprints){
    const sprint=JSON.parse(localStorage.getItem("sprint"));
    this.allSprints=JSON.parse(localStorage.getItem("sprints")).allSprints;
    this.allSprints.push(sprint);
    localStorage.setItem("sprints",JSON.stringify(sprints));

}


Sprints.prototype.getSprints=function(){
    this.allSprints=JSON.parse(localStorage.getItem("sprints"))
    return this.allSprints
}