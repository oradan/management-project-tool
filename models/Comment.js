function Comment(){
    this.id = null
    this.name=""
}
Comment.prototype.addCommentToLocalStorage=function(name,comment){
    this.id = new Date().getTime().toString()
    this.name=name
    localStorage.setItem("comment",JSON.stringify(comment))
}
Comment.prototype.getCurrentComment=function(){
    return  JSON.parse(localStorage.getItem("comment"))
   
}
