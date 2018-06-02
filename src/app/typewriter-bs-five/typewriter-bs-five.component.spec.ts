import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterBsFiveComponent } from './typewriter-bs-five.component';

describe('TypewriterBsFiveComponent', () => {
  let component: TypewriterBsFiveComponent;
  let fixture: ComponentFixture<TypewriterBsFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterBsFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterBsFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
