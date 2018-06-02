import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterSmFourComponent } from './typewriter-sm-four.component';

describe('TypewriterSmFourComponent', () => {
  let component: TypewriterSmFourComponent;
  let fixture: ComponentFixture<TypewriterSmFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterSmFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterSmFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
