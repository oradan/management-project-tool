function User(){
    this.id= null
    this.name=""
}

User.prototype.addUserToLocalStorage=function(name,user){
    this.id=new Date().getTime().toString()
    this.name=name
    localStorage.setItem("user",JSON.stringify(user))
}
User.prototype.getCurrentUser=function(){
    currentUser=JSON.parse(localStorage.getItem("user"))
    return currentUser
}

  