import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterSmThreeComponent } from './typewriter-sm-three.component';

describe('TypewriterSmThreeComponent', () => {
  let component: TypewriterSmThreeComponent;
  let fixture: ComponentFixture<TypewriterSmThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterSmThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterSmThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
