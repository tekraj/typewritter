import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDzOneComponent } from './typewriter-dz-one.component';

describe('TypewriterDzOneComponent', () => {
  let component: TypewriterDzOneComponent;
  let fixture: ComponentFixture<TypewriterDzOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDzOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDzOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
