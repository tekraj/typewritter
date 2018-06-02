import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDtFiveComponent } from './typewriter-dt-five.component';

describe('TypewriterDtFiveComponent', () => {
  let component: TypewriterDtFiveComponent;
  let fixture: ComponentFixture<TypewriterDtFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDtFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDtFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
