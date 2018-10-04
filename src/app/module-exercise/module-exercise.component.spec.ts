import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleExerciseComponent } from './module-exercise.component';

describe('ModuleExerciseComponent', () => {
  let component: ModuleExerciseComponent;
  let fixture: ComponentFixture<ModuleExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
