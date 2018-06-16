import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDtComponent } from './typewriter-dt.component';

describe('TypewriterDtComponent', () => {
  let component: TypewriterDtComponent;
  let fixture: ComponentFixture<TypewriterDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
