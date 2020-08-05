import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPrintableComponent } from './task-printable.component';

describe('TaskPrintableComponent', () => {
  let component: TaskPrintableComponent;
  let fixture: ComponentFixture<TaskPrintableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPrintableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPrintableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
