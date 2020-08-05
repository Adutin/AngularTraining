import { Injectable } from '@angular/core';
import { Task, ImportanceClass } from '../entities/task';
import { HttpClient } from '@angular/common/http';

import { concatAll, map, distinct, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TodoHttpService {
  private tasks: Task[]= []

  constructor(private http: HttpClient) { }

  private verify(task: Task){
    if (task == null) {
      console.log("Null returned");
      return;
    }
    let existingTask = this.tasks.find(b => b.id == task.id);
    task.dueDate = new Date(task.dueDate);
    if (existingTask) Object.assign(existingTask, task);
    else this.tasks.push(task);
  }

  getAll(): Task[]{
    this.http.get<Task[]>("http://localhost:9000/api/tasks")
      .pipe(concatAll())
      .subscribe(b => this.verify(b));
    return this.tasks;
  }

  deleteTask(id: number){
    this.http.delete("http://localhost:9000/api/tasks/"+id, {responseType:'text', observe: 'response'}) // observe option specifies how much of the response to return. (body, events, response)
      .subscribe(r => {
        console.log(r);
        let index = this.tasks.findIndex(b => b.id === id);
        if (index <0 ) return;
        this.tasks.splice(index, 1);
      },
      err => {
        console.log("ERROR",err);
        // TODO: Check status, 404:llä --> Must be removed from the array
        //                     Access Denied --> It is left to array
      },
      () => console.log("Delete completed"));
  }

  get(id: number, cb:(b: Task) => void = null): Task {
    let task = this.tasks.find(b => b.id==id) || null;
    if (id && id > 0) this.http.get<Task>("http://localhost:9000/api/tasks/"+id).pipe(shareReplay()).subscribe(b => {
      this.verify(b);
      Object.assign(task, b);
      console.log('answer from server');
      if (cb) cb(b);
    });

    console.log('return default'); // Just to clarify Rx.js observable
    return task;
  }

  save(task: Task): Observable<Task>{
    let ret = this.http.put<Task>("http://localhost:9000/api/tasks/"+task.id, task).pipe(shareReplay()); // shareReplay prevents multiple http requests
    ret.subscribe(b => this.verify(b));
    return ret;
  }

  create(task: Task): Observable<Task> {
    let newTask = new Task(task.name, task.description, task.importance, new Date(task.dueDate));
    console.log("Creating task", newTask);
    let ret = this.http.post<Task>("http://localhost:9000/api/tasks", newTask).pipe(shareReplay());
    ret.subscribe(b => this.verify(b));
    return ret;
  }
}
