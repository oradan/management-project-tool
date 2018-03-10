function Sprint(){
    this.id = null
    this.name=""
}


Sprint.prototype.addSprintToLocalStorage=function(name,sprint){
    this.id = new Date().getTime().toString()
    this.name=name
    localStorage.setItem("sprint",JSON.stringify(sprint))
}
Sprint.prototype.getCurrentSprint=function(){
    currentSprint=JSON.parse(localStorage.getItem("sprint"))
    return currentSprint
}