function Comments(){
    this.allComments=[]
}
Comments.prototype.addCommentsToLocalStorage=function(comments){
    const comment=JSON.parse(localStorage.getItem("comment"));
    this.allComments=JSON.parse(localStorage.getItem("comments")).allComments;
    this.allComments.push(comment);
    localStorage.setItem("comments",JSON.stringify(comments));

}

Comments.prototype.getComments=function(){
    return   JSON.parse(localStorage.getItem("comments"))
   
}