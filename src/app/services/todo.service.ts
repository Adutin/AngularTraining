import { Injectable } from '@angular/core';
import { Task, ImportanceClass } from '../entities/task';

@Injectable()
export class TodoService {

  private tasks = [
    new Task('Keep training', 'Angular training', ImportanceClass.High, new Date('2020-08-04, 09:00')),
    new Task('Pay bills', 'Rent and electricity', ImportanceClass.Med, new Date('2020-08-20, 11:00')),
    new Task('Buy bread', 'From Prisma Linnainmaa', ImportanceClass.Low, new Date('2020-10-04, 16:00'))
  ]

  constructor() { }

  get(id: number): Task {
    return this.tasks.find(t => t.id === id);
  }

  getAll(): Task[] {
    return this.tasks;
  }

  deleteTask(id: number) {
    let index = this.tasks.findIndex(t => t.id === id);
    if (index < 0) return;
    this.tasks.splice(index, 1);
  }

  save(task: Task) {
    let index = this.tasks.findIndex(t => t.id === task.id);

    if (index < 0) {
      console.log('Cannot find task to update');
      return;
    }

    Object.assign(this.tasks[index], task);
  }

  create(task: Task) {
    let newTask = new Task(task.name, task.description, task.importance, task.dueDate);

    this.tasks.push(newTask);
  }
}
