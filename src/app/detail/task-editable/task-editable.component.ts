import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Task, ImportanceClass } from 'src/app/entities/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
import MyValidators from '../../utils/validators';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'task-editable',
  templateUrl: './task-editable.component.html',
  styleUrls: ['./task-editable.component.css']
})
export class TaskEditableComponent implements OnInit {

  task: Task;
  taskForm: FormGroup;
  importanceKeys: string[];
  ImportanceClass = ImportanceClass;

  constructor(private location: Location,
    private router: Router,
    @Inject('taskData') private taskData,
    private fb: FormBuilder, private todoService: TodoService) {
      this.importanceKeys = Object.keys(this.ImportanceClass).filter(k => !isNaN(Number(k)));
     }

  ngOnInit() {

    this.task = this.taskData.task;

    this.taskForm = this.fb.group({
      name: [this.task && !this.task.isDummy ? this.task.name : '', Validators.required],
      description: [this.task && !this.task.isDummy ? this.task.description : '', Validators.compose([
        Validators.required, Validators.maxLength(50)])],
      importance: [this.task && !this.task.isDummy ? this.task.importance : ImportanceClass.Low],
      dueDate: [moment(this.task && !this.task.isDummy ? this.task.dueDate : Date.now()).format('YYYY-MM-DD, HH:mm'), MyValidators.dueDateValidator()]
    })
  }

  back() {
    let prevRoute = localStorage['previousRoute'] || '/';
    this.router.navigateByUrl(prevRoute);
  }

  save() {
    if (!this.taskForm.valid) return;

    if (this.task == null) this.task = new Task("", "", ImportanceClass.Low, null, true);

    console.log(this.task);
    console.log(this.taskForm.value);
    Object.assign(this.task, this.taskForm.value);

    this.task.dueDate = new Date(this.task.dueDate); // string --> Date
    this.task.isDummy = false;

    if (this.task.id > 0) this.todoService.save(this.task);
    else this.todoService.create(this.task);

    this.router.navigate(['/']);
  }
}
