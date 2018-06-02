import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDzFourComponent } from './typewriter-dz-four.component';

describe('TypewriterDzFourComponent', () => {
  let component: TypewriterDzFourComponent;
  let fixture: ComponentFixture<TypewriterDzFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDzFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDzFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
