import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDtThreeComponent } from './typewriter-dt-three.component';

describe('TypewriterDtThreeComponent', () => {
  let component: TypewriterDtThreeComponent;
  let fixture: ComponentFixture<TypewriterDtThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDtThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDtThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
