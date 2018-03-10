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
   const addProjectForm= document.getElementById("addprojectform");
   const addUserForm=document.getElementById("adduserform");
   const addSprintForm=document.getElementById("addsprintform");
   const createIssueForm=document.getElementById("createissueform");

   //BUTTONS
   const initButton=document.getElementById("init");
   const addUserButton=document.getElementById("adduser");
   const logInButton=document.getElementById("login");
   const addSprintButton=document.getElementById("addsprint");
   const createIssueButton=document.getElementById("createissue");
   const addTaskButton=document.getElementById("addtask");
   const addComentButton=document.getElementById("addcomment");
   const closeIssueForm=document.getElementById("closeissueform")
   
  
   //DATE
   const date=new Date();
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' };
   const currentDate=date.toLocaleDateString('en-GB',options);
   //GLOBAL VARIABLES
   const currentIssue=issue.getIssue();
   const allIssues=issues.getIssues();
   const allSprints= sprints.getSprints()
   const allAddItems=document.getElementsByTagName("h4")
   const projectContent=document.getElementById("displaycontent");
   //DISPLAING THE ADD FORM
   for(let i=0;i<allAddItems.length;i++){
       allAddItems[i].addEventListener("click",function(e){
           e.preventDefault()
           const addForm= e.path[1].children[1]
           addForm.style.display="block"
           
       })
   }
   //ADD PROJECT 
   initButton.addEventListener("click",function(e){
       e.preventDefault()
       const projectName=document.getElementById("projectname")
       project.name=projectName.value
       addProjectForm.reset()
       e.path[1].style.display="none"
       
       //ADING COMPONENTS TO LOCAL STORAGE
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
    //DISPLAING PROJECT NAME 
   const projectTitle=document.getElementById("pname")
   projectTitle.innerHTML=project.getProgject().name
   //ADD USER 
   addUserButton.addEventListener("click",function(e){
      
       const userName=document.getElementById("username");
       e.preventDefault();
       user.addUserToLocalStorage(userName.value,user);
       users.addUsersToLocalStorage(users);
       addUserForm.reset()
       e.path[1].style.display="none"
    
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
      e.path[1].style.display="none"
   });
  //ADD SPRINT
   addSprintButton.addEventListener("click",function(e){
       const sprintName=document.getElementById("sprintname");
       e.preventDefault();
       sprint.addSprintToLocalStorage(sprintName.value,sprint)
       sprints.addSprintsToLocalStorage(sprints);
       project.addSprintIdToProject(project)
       addSprintForm.reset()
       e.path[1].style.display="none"
       
       
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
         createIssueForm.reset()
        
   });
   //ADD COMMENTS
   addComentButton.addEventListener("click",function(e){
       e.preventDefault();
       const commentName=document.getElementById("commentname");
       comment.addCommentToLocalStorage(commentName.value,comment);
       comments.addCommentsToLocalStorage(comments);
       addCommentIdToIssue(currentIssue,issue,comment);
       addEditedIssueToIssues(allIssues,issues,issue)
       createIssueForm.reset()
   
   });
   closeIssueForm.addEventListener("click",function(e){
    e.path[1].style.display="none"
   })
   //DISPLAY ALL SPRINTS
   const displaySprints=document.getElementById("sprintprojectcontent")
   displaySprints.addEventListener("click",function(e){
    displayProjectSprints(allSprints,allIssues,projectContent)
   })
   //DISPLAY ISSUES
   const displayIssuesonPage=document.getElementById("allissuescontent")
   displayIssuesonPage.addEventListener("click",function(e){
    e.preventDefault()
    displayIssues(allIssues,sprint,user,currentDate,issue,issues,projectContent,users) 
   })
   const displayIssuesStatus=document.getElementById("issuestatuscontent")
   displayIssuesStatus.addEventListener("click",function(e){
       e.preventDefault()
       displayIssueStatus(projectContent,allIssues)
   })
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
function displayIssues(allIssues,sprint,user,currentDate,issue,issues,projectContent,users){
        projectContent.innerHTML="<div></div>"
   // const issuesContent=document.getElementById("issues")
        for(let i=0;i<allIssues.allIssues.length;i++){ 
        const issueItem=document.createElement("div");
              issueItem.id=i+"issueItem"
              issueItem.className="issuedisplayed"
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
        const issueItemCreatedBy=document.createElement("div");
              issueItemCreatedBy.innerHTML="Created by: "+getUserName(users,allIssues.allIssues[i].createdBy)
              issueItem.appendChild(issueItemCreatedBy)
        const issueItemCreadetAt=document.createElement("div");
              issueItemCreadetAt.innerHTML="Created at:  "+allIssues.allIssues[i].createdAt
              issueItem.appendChild(issueItemCreadetAt)
        const issueItemUpdatedAt=document.createElement("div");
              issueItemUpdatedAt.innerHTML="Updated at:  "+allIssues.allIssues[i].updateAt
              issueItem.appendChild(issueItemUpdatedAt)
        const issueItemDescription=document.createElement("div");
              issueItemDescription.innerHTML="Description: "+allIssues.allIssues[i].description
              issueItem.appendChild(issueItemDescription)
        const editButton=document.createElement("button")
              editButton.id=allIssues.allIssues[i].id
              editButton.innerHTML="Edit"
              issueItem.appendChild(editButton)

              editButton.addEventListener("click",function(e){
                  e.preventDefault()
                 
                  editIssue(allIssues,e.path["0"].id,issueItem,sprint,user,currentDate,issue,issues)
              })
        projectContent.appendChild(issueItem)
      
        
        }
}
function setStatusId(statusList){
    let statusId=""
    if(statusList.value==="new"){
        statusId="new"
    }else if(statusList.value==="inprogress"){
        statusId="In progress"
    }else if(statusList.value==="feedback"){
        statusId="Feedback"
    }else if(statusList.value==="resolved"){
        statusId="Resolved"
    }else if(statusList.value==="readyfortesting"){
        statusId="Ready for testing"
    }
    
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
              editItem.innerHTML= "<form id='"+i+"editIssueForm' >Type of: "+
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
                                  "<input type='button' id='"+i+"addeditedissue' value='Save'>"
                                
                                 
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
            e.path[1].style.display="none"
            
        })
          
          
        
        
       }
    }
    
}
function displayProjectSprints(allSprints,allIssues,projectContent){
   
    projectContent.innerHTML="<div></div>"
    for(let i=0;i<allSprints.allSprints.length;i++){
        
        const sprintId=allSprints.allSprints[i].id
        const sprint=document.createElement("div")
              sprint.className="sprintItem"
              sprint.innerHTML="<div class='sprintname'>"+allSprints.allSprints[i].name+"</div>"
              projectContent.appendChild(sprint)
       
        for(let j=0;j<allIssues.allIssues.length;j++){
            if(sprintId===allIssues.allIssues[j].sprint){
               
                     const issueSprintItem=document.createElement("div")
                           issueSprintItem.innerHTML="<div class='sprintissue'>"+allIssues.allIssues[j].name+"</div"
                           sprint.appendChild(issueSprintItem)             
                      
            }
        }
    }
    
}
function getUserName(users,itemId){
    const allUsers =users.getUsers()
    for(let i=0;i<allUsers.allUsers.length;i++){

        if(allUsers.allUsers[i].id===itemId)
        return allUsers.allUsers[i].name
    }
   

}
function displayIssueStatus(projectContent,allIssues){
    projectContent.innerHTML="<div class='issuesstatus'>"+
                             "<div>New</div>"+
                             "<div id='issuesnewstatus'></div>"+
                             "</div>"+
                             "<div class='issuesstatus'>"+
                             "<div>In Progres</div>"+
                             "<div id='issuesinprogress'></div>"+
                             "</div>"+
                             "<div class='issuesstatus'>"+
                             "<div>Feedback</div>"+
                             "<div  id='issuesfeedback'></div>"+
                             "</div>"+
                             "<div class='issuesstatus'>"+
                             "<div>Resolved</div>"+
                             "<div id='issuesresolved'></div>"+
                             "</div>"+
                             "<div class='issuesstatus'>"+
                             "<div>Ready for testing</div>"+
                             "<div id='issuesreadyfortesting'></div>"+
                             "</div>"
                            
    for(let i=0;i<allIssues.allIssues.length;i++){
        if(allIssues.allIssues[i].status==="new"){
           const newStatusItem=document.createElement("div")
                 newStatusItem.className="itemstatus"
                 newStatusItem.innerHTML= "<div>"+allIssues.allIssues[i].name+"</div>"+
                                          "<div> Type of issue: "+allIssues.allIssues[i].type+"</div>"
                document.getElementById("issuesnewstatus").appendChild(newStatusItem)                     
        }else if(allIssues.allIssues[i].status==="In progress"){
            const inprogressStatusItem=document.createElement("div")
                  inprogressStatusItem.className="itemstatus"
                  inprogressStatusItem.innerHTML="<div>"+allIssues.allIssues[i].name+"</div>"+
                                                 "<div> Type of issue: "+allIssues.allIssues[i].type+"</div>"
                  document.getElementById("issuesinprogress").appendChild(inprogressStatusItem)
            
        }else if(allIssues.allIssues[i].status==="Feedback"){
            const feedbackStatusItem=document.createElement("div")
                  feedbackStatusItem.className="itemstatus"
                  feedbackStatusItem.innerHTML="<div>"+allIssues.allIssues[i].name+"</div>"+
                                               "<div> Type of issue: "+allIssues.allIssues[i].type+"</div>"
                  document.getElementById("issuesfeedback").appendChild(feedbackStatusItem)

        }else if(allIssues.allIssues[i].status==="Resolved"){
            const resolvedStatusItem=document.createElement("div")
                  resolvedStatusItem.className="itemstatus"
                  resolvedStatusItem.innerHTML="<div>"+allIssues.allIssues[i].name+"</div>"+
                                         "<div> Type of issue: "+allIssues.allIssues[i].type+"</div>"
                  document.getElementById("issuesresolved").appendChild(resolvedStatusItem)

           
        }else if(allIssues.allIssues[i].status==="Ready for testing"){
            const readyStatusItem=document.createElement("div")
            readyStatusItem.className="itemstatus"
            readyStatusItem.innerHTML="<div>"+allIssues.allIssues[i].name+"</div>"+
                                   "<div> Type of issue: "+allIssues.allIssues[i].type+"</div>"
            document.getElementById("issuesreadyfortesting").appendChild(readyStatusItem)

           
        }
       
    }                   

}