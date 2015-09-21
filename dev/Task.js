class Task {
  constructor({title= "New Task", description= "Some description"} = {}) {
    this.title = title;
    this.description = description;
    this.isDone = false;
    this.$node = $("<li></li>");
    this.updateNode();
  }

  markAsDone() {
    this.isDone = true;

    this.$node.addClass("done");
  }

  updateNode() {
    var nodeTemplate = `
      <div class="content">
        <p>
          <h1 class="normal-mode">${this.title}</h1>
          <input class="edit-mode" type="text" name="title" value="${this.title}">
        </p>
        <p>
          <div class="description normal-mode">${this.description}</div>
          <textarea class="edit-mode" name="description">${this.description}</textarea>
        </p>
      </div>
      <div class="actions">
        <button class="cancel-button edit-mode">Anuluj</button>
        <button class="save-button edit-mode">Save</button>
        <button class="edit-button normal-mode">Edit</button>
        <button class="done-button normal-mode">Done</button>
        <button class="remove-button normal-mode after-done">Delete</button>
      </div>`;

    this.$node.empty();
    this.$node.html(nodeTemplate);
    this.bindActions();
  }

  bindActions() {
    this.$node.on("click", ".cancel-button", ()=>this.normalMode.apply(this));
    this.$node.on("click", ".edit-button", ()=>this.editMode.apply(this));
    this.$node.on("click", ".save-button", ()=>this.saveChanges.apply(this));
    this.$node.on("click", ".remove-button", ()=>this.removeNode.apply(this));
    this.$node.on("click", ".done-button", ()=>this.markAsDone.apply(this));
  }

  saveChanges() {
    this.title = this.$node.find('[name="title"]').val();
    this.description = this.$node.find('[name="description"]').val();
    this.updateNode();
    this.normalMode();
  }

  editMode() {
    this.$node.addClass("editable");
  }

  normalMode() {
    this.$node.removeClass("editable");
  }

  removeNode() {
    if (this.$node) {
      this.$node.addClass("to-remove");
      setTimeout(()=>{this.$node.remove();}, 1500);
    }
  }
}

tasks.Task = Task;