import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterBsThreeComponent } from './typewriter-bs-three.component';

describe('TypewriterBsThreeComponent', () => {
  let component: TypewriterBsThreeComponent;
  let fixture: ComponentFixture<TypewriterBsThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterBsThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterBsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
