'use strict';

describe("Task", ()=>{
  var task;

  describe("creating", ()=>{
    it("should create task with default params", ()=>{
      //given
      //when
      task = new tasks.Task();

      //then
      expect(task.title).toBeDefined();
      expect(task.description).toBeDefined();
      expect(task.isDone).toBeFalsy();
    });

    it("should create task with custom params", ()=>{
      //given
      const TITLE = "Kill hamster",
          DESCRIPTION = "Kill hamster named Boberek";

      //when
      task = new tasks.Task({title: TITLE, description: DESCRIPTION});

      //then
      expect(task.title).toEqual(TITLE);
      expect(task.description).toEqual(DESCRIPTION);
    });
  });

  describe("node", ()=>{
    var list;

    beforeEach(()=>{
      list = $("<ul></ul>");
      task = new tasks.Task();
    });

    it("should update node after change property", ()=>{
      //given
      const SOME_NEW_TITLE = "new task title",
          SOME_NEW_DESCRIPTION = "some new description";

      task = new tasks.Task();
      list.append(task.$node);

      //when
      task.title = SOME_NEW_TITLE;
      task.description = SOME_NEW_DESCRIPTION;
      task.updateNode();

      //then
      expect(list.html()).toContain(SOME_NEW_TITLE);
      expect(list.html()).toContain(SOME_NEW_DESCRIPTION);
    });

    it("should remove existing node", ()=>{
      //given
      list.append(task.$node);

      //when
      task.removeNode();

      //then
      expect(list.html()).not.toContain("<li>");
    });

    it("should add class 'editable' when set to edit mode", ()=>{
      //given
      //when
      task.editMode();

      //then
      expect($("<p>").append(task.$node.clone()).html()).toContain("editable");
    });

    it("should remove class 'editable', update model and view after save changes", ()=>{
      //given
      const NEW_TITLE = "new task title",
          NEW_DESCRIPTION = "some new extra description with ( . )( . )";

      //when
      task.editMode();
      task.$node.find("[name='title']").val(NEW_TITLE);
      task.$node.find("[name='description']").val(NEW_DESCRIPTION);
      task.saveChanges();

      //then
      expect(task.title).toEqual(NEW_TITLE);
      expect(task.description).toEqual(NEW_DESCRIPTION);
      expect(task.$node.find("h1").text()).toEqual(NEW_TITLE);
      expect(task.$node.find(".description").text()).toEqual(NEW_DESCRIPTION);
      expect($("<p>").append(task.$node.clone()).html()).not.toContain("editable");

    });
  });

  it("should mark task as done and add class `done`", ()=>{
    //given
    task = new tasks.Task();

    //when
    task.markAsDone();

    //then
    expect(task.isDone).toBeTruthy();
    expect($("<p>").append(task.$node.clone()).html()).toContain('class="done"');
  });
});