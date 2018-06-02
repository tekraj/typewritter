import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDzThreeComponent } from './typewriter-dz-three.component';

describe('TypewriterDzThreeComponent', () => {
  let component: TypewriterDzThreeComponent;
  let fixture: ComponentFixture<TypewriterDzThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDzThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDzThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
