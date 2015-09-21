class TaskList extends Set {
  constructor($list) {
    super();
    this.$list = $list;
  }

  push(task) {
    if (!task) {
      console.warn("No task");
      return false;
    }
    if (!task.constructor || task.constructor.name !== "Task") {
      console.warn("Incorrect type");
      return false;
    }

    super.add(task);
    this.addToView(task);
    return true;
  }

  remove(task) {
    super.delete(task);
    task.removeNode();
  }

  addToView(task) {
    this.$list.append(task.$node);
  }

}

tasks.TaskList = TaskList;