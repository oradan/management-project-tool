# Project Management tool

Scope:
-------------
App is used by any team who wants to organize issues during project lifecycle.

First step:
-------------
User (in our case will be the Project Manager) should fill out the Project. The name is added by the Project Manager and the ID is automatically created by app. 
Data is saved in browser Local Storage as no Backend requested. Next step, components are saved in local storage. The components are: Project, User, Users, Sprint, Sprints, Issue, Issues, Task, Tasks, Comment and Comments. 
With the Project, all the components’ fields are created and saved however with no data. Everything is saved in Local Storage. Data to components are to be added, editing them by user, once the project had been created. 

Second Step:
-------------
New user is added or exiting user logs in. at this stage the user can add data, create new sprint or new issues.

Third Step:
-------------
User create new component called Sprint. Once the component date is filed out, Sprints’ ID are saved by code in Project component at Sprint field. 

Forth Step:
-------------
The user can add any kind of issue: Feature, Bug or Task. For issues type Feature or Bug – user can add Task as well, that are saved automatically in Issues component, the field – Tasks. 
User also can add comments to any type of Issues. 
All the saved issues are editable. 
For each component, next fields are added automatically – ID, createdAt and updatedAt.

The application is still in development.