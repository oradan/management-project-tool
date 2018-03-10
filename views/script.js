document.addEventListener("DOMContentLoaded",onHtmlLoadet);
function onHtmlLoadet(){
   //COMPONENTS
   const project=new Project();
   const user=new User();
   const users=new Users();
   const sprint=new Sprint();
   const sprints=new Sprints();
   const issue=new Issue();
   const issues=new Issues();
   const task=new Task();
   const tasks=new Tasks();
   const comment=new Comment();
   const comments=new Comments();
   //FORMS
   const addUserForm=document.getElementById("adduserform");
   const addSprintForm=document.getElementById("addsprintform");
   const createIssueForm=document.getElementById("createissueform");
   const addTasksForm=document.getElementById("addtaskform");
   const addComentForm=document.getElementById("addcommentform");
   //BUTTONS
   const initButton=document.getElementById("init");
   const addUserButton=document.getElementById("adduser");
   const logInButton=document.getElementById("login");
   const addSprintButton=document.getElementById("addsprint");
   const createIssueButton=document.getElementById("createissue");
   const addTaskButton=document.getElementById("addtask");
   const addComentButton=document.getElementById("addcomment");
  
   //DATE
   const date=new Date();
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' };
   const currentDate=date.toLocaleDateString('en-GB',options);
   //GLOBAL VARIABLES
   const currentIssue=issue.getIssue();
   const allIssues=issues.getIssues();
 
   initButton.addEventListener("click",function(e){
       e.preventDefault()
       LocalStorage.project(project);
       LocalStorage.user(user);
       LocalStorage.users(users);
       LocalStorage.sprint(sprint);
       LocalStorage.sprints(sprints);
       LocalStorage.issue(issue);
       LocalStorage.issues(issues);
       LocalStorage.task(task);
       LocalStorage.tasks(tasks);
       LocalStorage.comment(comment)
       LocalStorage.comments(comments)
   });
   //ADD USER 
   addUserButton.addEventListener("click",function(e){
       const userName=document.getElementById("username");
       e.preventDefault();
       user.addUserToLocalStorage(userName.value,user);
       users.addUsersToLocalStorage(users);
       addUserForm.reset()
    
   });
  //VERIFYING IF THE USER WAS ALREADY ADDED
   logInButton.addEventListener("click",function(e){
      e.preventDefault();
      const allUsers=users.getUsers()
      for(let i=0;i<allUsers.allUsers.length;i++){
          if(userName.value===allUsers.allUsers[i].name){
             LocalStorage.addLogedUserToLocaleStorage(allUsers.allUsers[i].id,userName.value)
            }else{console.log("nothing mach")}
         
      }
      addUserForm.reset()
   });
  //ADD SPRINT
   addSprintButton.addEventListener("click",function(e){
       const sprintName=document.getElementById("sprintname");
       e.preventDefault();
       sprint.addSprintToLocalStorage(sprintName.value,sprint)
       sprints.addSprintsToLocalStorage(sprints);
       project.addSprintIdToProject(project)
       addSprintForm.reset()
       
       
   });
   //CREATE AND ADD ISSUE
   createIssueButton.addEventListener("click",function(e){
       e.preventDefault()
       
        
       const issueType=document.getElementById("issuetype"),
             issueName=document.getElementById("issuename"),
             issueSprintId=sprint.getCurrentSprint(),
             issueCurrentUser=user.getCurrentUser(),
             issueDescription=document.getElementById("issuedescription")
    
       const issueData={
        type:issueType.value,
        name:issueName.value,
        sprint:issueSprintId.id,
        createdBy:issueCurrentUser.id,
        assignee:issueCurrentUser.id,
        description:issueDescription.value,
        status:document.getElementById("newid").value,
        tasks:[],
        comments:[],
        updateAt:null,
        createdAt:currentDate,
       }
       issue.addIssueToLocalStorage(issueData,issue)
       issues.addIssuesToLocalStorage(issues)
       createIssueForm.reset()
       
   });
   //ADD TASKS
   addTaskButton.addEventListener("click",function(e){ 
        e.preventDefault()
        const issueId=issue.getIssue(),
                taskType=document.getElementById("tasktype"),
                taskName=document.getElementById("taskname"),
                taskDescription=document.getElementById("taskdescription"),
                newStatusId=document.getElementById("tasknewid")
        
        const taskData={
            type:taskType.value,
            issueId:issueId.id,
            name:taskName.value,
            description:taskDescription.value,
            status:newStatusId.value,
            createdAt:currentDate,
            updatedAt:null
            }
     
         task.addTaskToLocalStorage(taskData,task)
         tasks.addTasksToLocalStorage(tasks)
         addTaskIdToIssue(currentIssue,issue,task)
         addEditedIssueToIssues(allIssues,issues,issue)
         addTasksForm.reset();
   });
   //ADD COMMENTS
   addComentButton.addEventListener("click",function(e){
       e.preventDefault();
       const commentName=document.getElementById("commentname");
       comment.addCommentToLocalStorage(commentName.value,comment);
       comments.addCommentsToLocalStorage(comments);
       addCommentIdToIssue(currentIssue,issue,comment);
       addEditedIssueToIssues(allIssues,issues,issue)
       addComentForm.reset();
   });

   // displayIssues(allIssues,sprint,user,currentDate,issue,issues);
}
function addTaskIdToIssue(currentIssue,issue,task){
    currentIssue=issue.getIssue()
    const currentTaskId=task.getTask().id
    currentIssue.tasks.push(currentTaskId)
    issue.saveEditedIssue(currentIssue)
}
function addEditedIssueToIssues(allIssues,issues,issue){
     allIssues=issues.getIssues()
     const currentIssueId=issue.getIssue().id
  
     for(let i=0;i<allIssues.allIssues.length;i++){
        if(currentIssueId===allIssues.allIssues[i].id){
            allIssues.allIssues[i]=issue.getIssue()
   
        }
    issues.saveEditedIssues(allIssues)
 }
    
}

function addCommentIdToIssue(currentIssue,issue,comment){
    currentIssue=issue.getIssue()
    const currentCommentId=comment.getCurrentComment().id
    currentIssue.comments.push(currentCommentId)
    issue.saveEditedIssue(currentIssue)
}
function displayIssues(allIssues,sprint,user,currentDate,issue,issues){
  
    const issuesContent=document.getElementById("issues")
        for(let i=0;i<allIssues.allIssues.length;i++){
        const issueItem=document.createElement("div");
              issueItem.id=i+"issueItem"
        const issueName=document.createElement("div");
              issueName.className="issuename";
              issueName.innerHTML=allIssues.allIssues[i].name
              issueItem.appendChild(issueName);
        const issueType=document.createElement("div")
              issueType.className="issuetype";
              issueType.innerHTML="Type of: "+allIssues.allIssues[i].type;
              issueItem.appendChild(issueType)
        const issueItemStatus=document.createElement("div");
              issueItemStatus.className="issuestatus";
              issueItemStatus.innerHTML="Staus: "+allIssues.allIssues[i].status
              issueItem.appendChild(issueItemStatus)
        const editButton=document.createElement("button")
              editButton.id=allIssues.allIssues[i].id
              editButton.innerHTML="Edit"
              issueItem.appendChild(editButton)

              editButton.addEventListener("click",function(e){
                  e.preventDefault()
                  console.log(e.path["0"].id)
                  editIssue(allIssues,e.path["0"].id,issueItem,sprint,user,currentDate,issue,issues)
              })
        issuesContent.appendChild(issueItem)
        }
}
function setStatusId(statusList){
    let statusId=""
    if(statusList.value==="new"){
        statusId="New"
    }else if(statusList.value==="inprogress"){
        statusId="In progress"
    }else if(statusList.value==="feedback"){
        statusId="Feedback"
    }else if(statusList.value==="resolved"){
        statusId="Resolved"
    }else if(statusList.value==="readyfortesting"){
        statusId="Ready for testing"
    }
    console.log(statusId)
    return statusId
}
function editIssue(allIssues,issueToEditId,issueItem,sprint,user,currentDate,issue,issues){
    for(let i=0;i<allIssues.allIssues.length;i++){
       if(issueToEditId===allIssues.allIssues[i].id){
        const issueToEditItem=allIssues.allIssues[i]
        const editContent=document.createElement("div")
              editContent.id="editcontent";
        const editItem=document.createElement("div")
              editItem.id="editItem"
              editItem.innerHTML= "<div class='editItemName'>"+issueToEditItem.name+"</div>"+
                                  "<div class='editItemStatus'> Status: "+issueToEditItem.status+"</div>"+
                                  "<form id='"+i+"editIssueForm' >Type of: "+
                                  "<select  name='edittypelist' id='"+i+"editissuetype'>"+
                                  "<option id='"+i+"editfetureop' value='features'selected='selected'>Features</option>"+
                                  "<option id='"+i+"editbugsop' value='bugs'>Bugs</option>"+
                                  "<option id='"+i+"edittaskspo' value='tasks'>Tasks</option>"+
                                  " </select><br><br>"+
                                  "</form>"+
                                  "Name :<input type='text' name='issue' id='"+i+"editissuename' value='"+issueToEditItem.name+"'><br><br>"+
                                  "Description : <textarea cols='30' rows='3' id='"+i+"editissuedescription'>"+issueToEditItem.description+"</textarea><br><br>"+
                                  "Status :<select  name='statuslist' id='"+i+"editissuestatus'>"+
                                  "<option id='"+i+"editnewid' value='new' selected='selected'>New</option>"+
                                  "<option id='"+i+"editinprogressid' value='inprogress'>In progress</option>"+
                                  "<option id='"+i+"editfeedbackid' value='feedback'>Feedback</option>"+
                                  "<option id='"+i+"editresolvedid' value='resolved'>Resolved</option>"+
                                  "<option id='"+i+"editreadyfortestingid' value='readyfortesting'>Ready for Testing</option></select><br><br>"+
                                  "<input type='button' id='"+i+"addeditedissue' value='Add Edited Issue'>"
                                
                                 
               editContent.appendChild(editItem);

               issueItem.appendChild(editContent)
  //Taking data from imputs to be edited
         const   editedissueType=document.getElementById(i+"editissuetype"),
                 editedissueName=document.getElementById(i+"editissuename"),
                 editedissueDescription=document.getElementById(i+"editissuedescription"),
                 editedissueStatus=document.getElementById(i+"editissuestatus")
 //Edit Button
        const addEditedIssueButton=document.getElementById(i+"addeditedissue")
              addEditedIssueButton.addEventListener("click",function(e){
  //saving edited data in a variable
            const editedIssueItem={
            
                                id:issueToEditItem.id, 
                                type:editedissueType.value,
                                name:editedissueName.value,
                                sprint:issueToEditItem.sprint,
                                createdBy:issueToEditItem.createdBy,
                                assignee:issueToEditItem.assignee,
                                description:editedissueDescription.value,
                                status:setStatusId(editedissueStatus),
                                tasks:issueToEditItem.tasks,
                                comments:issueToEditItem.comments,
                                updateAt:currentDate,
                                createdAt:issueToEditItem.createdAt,
                   }
            e.preventDefault()
            issue.saveEditedIssue(editedIssueItem)
            addEditedIssueToIssues(allIssues,issues,issue)
            console.log(editedIssueItem,"editeddd")
        })
          
          
        
        
       }
    }
    
}