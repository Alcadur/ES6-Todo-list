jQuery(document).ready(function () {
  tasks.list = new tasks.TaskList($("#todos ul"));

  jQuery("textarea[name='description']").on("keydown", (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      var title = $("#taskCreator input[name='title']").val(),
          description = $("#taskCreator textarea[name='description']").val(),
          task = new tasks.Task({title: title, description: description});

      if (event.keyCode === 13 && tasks.list.push(task)) {
        clearInputs();
      }
    }
  });

  function clearInputs() {
    $("#taskCreator input[name='title']").val("");
    $("#taskCreator textarea[name='description']").val("");
  }

  tasks.list.push(new tasks.Task({title: "Zakupy", description: "- ziemniaki<br>-pomidor<br>-ogórek"}))
  tasks.list.push(new tasks.Task({title: "Uczelnia", description: "Zdobyć wpis"}))
  tasks.list.push(new tasks.Task({title: "Level Up", description: "Zabić potwora z 98 poziomu"}))

});