function Issues(){
    this.allIssues=[]
}

Issues.prototype.addIssuesToLocalStorage=function(issues){
     const issue=JSON.parse(localStorage.getItem("issue"));
     this.allIssues=JSON.parse(localStorage.getItem("issues")).allIssues;
     this.allIssues.push(issue);
     localStorage.setItem("issues",JSON.stringify(issues));

}

Issues.prototype.getIssues=function(){
    allIssues=JSON.parse(localStorage.getItem("issues"))
    return allIssues
}
Issues.prototype.saveEditedIssues=function(data){
    localStorage.setItem("issues",JSON.stringify(data))
}