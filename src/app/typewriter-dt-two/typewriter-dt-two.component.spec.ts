import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDtTwoComponent } from './typewriter-dt-two.component';

describe('TypewriterDtTwoComponent', () => {
  let component: TypewriterDtTwoComponent;
  let fixture: ComponentFixture<TypewriterDtTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDtTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDtTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
