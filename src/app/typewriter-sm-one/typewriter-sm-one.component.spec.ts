import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterSmOneComponent } from './typewriter-sm-one.component';

describe('TypewriterSmOneComponent', () => {
  let component: TypewriterSmOneComponent;
  let fixture: ComponentFixture<TypewriterSmOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterSmOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterSmOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
