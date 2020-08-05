import { Component, OnInit } from '@angular/core';
import { Task, ImportanceClass } from '../entities/task';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

  tasks: Task[] = [];
  ImportanceClass = ImportanceClass;
  nameFilter: string = '';
  descriptionFilter: string = '';
  sortField: string = 'id';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.tasks = this.todoService.getAll();
  }

  canShow(task: Task): boolean {
    return task.name.toLocaleUpperCase().includes(this.nameFilter.toLocaleUpperCase()) &&
      task.description.toLocaleUpperCase().includes(this.descriptionFilter.toLocaleUpperCase());
  }

  isDueDatePassed(dueDate: Date): boolean {
    let currentTime = new Date();
    return dueDate < currentTime;
  }

  deleteTask(task: Task) {
    this.todoService.deleteTask(task.id);
  }

}
