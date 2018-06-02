import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterBsFourComponent } from './typewriter-bs-four.component';

describe('TypewriterBsFourComponent', () => {
  let component: TypewriterBsFourComponent;
  let fixture: ComponentFixture<TypewriterBsFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterBsFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterBsFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
