import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditableComponent } from './task-editable.component';

describe('TaskEditableComponent', () => {
  let component: TaskEditableComponent;
  let fixture: ComponentFixture<TaskEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
