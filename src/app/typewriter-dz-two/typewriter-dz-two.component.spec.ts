import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDzTwoComponent } from './typewriter-dz-two.component';

describe('TypewriterDzTwoComponent', () => {
  let component: TypewriterDzTwoComponent;
  let fixture: ComponentFixture<TypewriterDzTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDzTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDzTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
