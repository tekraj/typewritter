import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDtFourComponent } from './typewriter-dt-four.component';

describe('TypewriterDtFourComponent', () => {
  let component: TypewriterDtFourComponent;
  let fixture: ComponentFixture<TypewriterDtFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDtFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDtFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
