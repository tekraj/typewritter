import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterSmTwoComponent } from './typewriter-sm-two.component';

describe('TypewriterSmTwoComponent', () => {
  let component: TypewriterSmTwoComponent;
  let fixture: ComponentFixture<TypewriterSmTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterSmTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterSmTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
