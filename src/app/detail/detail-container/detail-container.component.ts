import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/entities/task';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'detail-container',
  templateUrl: './detail-container.component.html',
  styleUrls: ['./detail-container.component.css'],
  providers: [
    {provide: 'taskData', useValue: {task: new Task("", "", null, null, true)}}
  ]
})
export class DetailContainerComponent implements OnInit {

  taskId: number = -1;
  task: Task = null;

  constructor(private todoService: TodoService, private route: ActivatedRoute, @Inject('taskData') private taskData) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.taskId = +p.get('id');
      this.task = this.todoService.get(this.taskId);
      this.taskData.task = this.task;
    });
  }

}
