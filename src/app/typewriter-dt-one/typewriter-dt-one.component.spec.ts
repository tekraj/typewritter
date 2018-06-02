import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDtOneComponent } from './typewriter-dt-one.component';

describe('TypewriterDtOneComponent', () => {
  let component: TypewriterDtOneComponent;
  let fixture: ComponentFixture<TypewriterDtOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDtOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDtOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
