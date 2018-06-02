import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterBsTwoComponent } from './typewriter-bs-two.component';

describe('TypewriterBsTwoComponent', () => {
  let component: TypewriterBsTwoComponent;
  let fixture: ComponentFixture<TypewriterBsTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterBsTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterBsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
