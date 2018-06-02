import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterBsOneComponent } from './typewriter-bs-one.component';

describe('TypewriterBsOneComponent', () => {
  let component: TypewriterBsOneComponent;
  let fixture: ComponentFixture<TypewriterBsOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterBsOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterBsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
