# 092 Edit Task

``` 
Given a task exists
When the edit options is clicked
Then the task's description will be populated in the form
And the task's status will be selected in the form
And the button will display Update
```

```
Given that a task is selected for editing
And the task description and status are populated in the form
When you modify the description
And click the Update button
Then the task is updated with the correct description
```

```
Given that a task is selected for editing
And the task description and status are populated in the form
When you modify the status
And click the Update button
Then the task is displayed in the correct column
```

the task board
- should populate the description and the status fields when edit is selected on a task
- should populate a new, hidden form field that has the id task-id with the task id
- should change the display text on the add-task button from Add to Update
- should update the task by id when the Update button is pressed
- should reset all of the form fields after the Update button is pressed
- should reset the add-task button text after the Update button is pressed back to Add

resources:
- https://www.w3schools.com/tags/att_input_type_hidden.asp

Building toward CSTA Standards:
- Develop programs for multiple computing platforms. (3B-AP-19) https://www.csteachers.org/page/standards
- Use lists to simplify solutions, generalizing computational problems instead of repeatedly using simple variables. (3A-AP-14) https://www.csteachers.org/page/standards

Copyright &copy; 2023 Knight Moves. All Rights Reserved.
