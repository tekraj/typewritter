import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDzFiveComponent } from './typewriter-dz-five.component';

describe('TypewriterDzFiveComponent', () => {
  let component: TypewriterDzFiveComponent;
  let fixture: ComponentFixture<TypewriterDzFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDzFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDzFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
