function Users(){
       this.allUsers=[]
}


Users.prototype.addUsersToLocalStorage=function(users){
      const user=JSON.parse(localStorage.getItem("user"))
      this.allUsers=JSON.parse(localStorage.getItem("users")).allUsers
      this.allUsers.push(user);
      localStorage.setItem("users",JSON.stringify(users));
   
}

Users.prototype.getUsers=function(){
      allUsers=JSON.parse(localStorage.getItem("users"))
      return allUsers
}