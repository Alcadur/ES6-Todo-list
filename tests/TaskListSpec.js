'use strict';

describe("TaskList", ()=>{
  var taskList,
      LIST_TEMPLATE_HTML = "<ul></ul>";

  beforeEach(function(){
    taskList = new tasks.TaskList();
  });

  it("should return `false` after add wrong type of object", ()=>{
    expect(taskList.push()).toBeFalsy();
    expect(taskList.push("test")).toBeFalsy();
    expect(taskList.push(function(){})).toBeFalsy();
    expect(taskList.size).toEqual(0);
  });

  it("should return `true` after add new Task to list", ()=>{
    spyOn(taskList, "addToView");
    expect(taskList.push(new tasks.Task())).toBeTruthy();
    expect(taskList.size).toEqual(1);
  });

  describe("after add element to list", ()=>{
    var listTemplate = "",
        TASK_NAME = "Task name no. 1",
        TASK_DESCRIPTION = "Task description no. 1",
        task;

    beforeEach(function(){
      listTemplate = $(LIST_TEMPLATE_HTML);
      taskList = new tasks.TaskList(listTemplate);
    });

    it("should add task to view", ()=>{
      //given
      task = new tasks.Task({title: TASK_NAME, description: TASK_DESCRIPTION});

      //when
      taskList.push(task);

      //then
      expect(listTemplate.html()).toContain(TASK_NAME);
      expect(listTemplate.html()).toContain(TASK_DESCRIPTION);
    });
  });

  it("should remove task from list", ()=>{
    //given
    spyOn(taskList, "addToView");
    var REMOVE_TASK_NAME = "task to remove",
        task = new tasks.Task({name: REMOVE_TASK_NAME}),
        setArray;
    taskList.push(task);
    taskList.push(new tasks.Task());
    taskList.push(new tasks.Task());

    expect(taskList.size).toEqual(3);
    //when
    taskList.remove(task);

    //then
    expect(taskList.size).toEqual(2);

    setArray = [...taskList];
    expect(setArray[0].name != REMOVE_TASK_NAME);
    expect(setArray[1].name != REMOVE_TASK_NAME);
  });
});