import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterSmFiveComponent } from './typewriter-sm-five.component';

describe('TypewriterSmFiveComponent', () => {
  let component: TypewriterSmFiveComponent;
  let fixture: ComponentFixture<TypewriterSmFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterSmFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterSmFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
